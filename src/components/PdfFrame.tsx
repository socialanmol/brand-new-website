import { useEffect, useRef, useState } from "react";
import { AnnotationMode, getDocument, GlobalWorkerOptions, type PDFDocumentProxy, type RenderTask } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerUrl;

type ViewState = "loading" | "ready" | "error";

export default function PdfFrame({ src, label, frameWidth, frameHeight }: { src: string; label: string; frameWidth: number; frameHeight: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ViewState>("loading");

  useEffect(() => {
    const frame = frameRef.current;
    const host = hostRef.current;
    if (!frame || !host) return;

    let cancelled = false;
    let doc: PDFDocumentProxy | null = null;
    let tasks: RenderTask[] = [];
    let lastWidth = 0;
    let painting = false;
    let again = false;

    const paint = async () => {
      if (!doc || cancelled) return;
      if (painting) {
        again = true;
        return;
      }
      const width = Math.floor(host.clientWidth);
      if (width < 40 || Math.abs(width - lastWidth) < 2) return;
      painting = true;
      lastWidth = width;
      tasks.forEach((task) => task.cancel());
      tasks = [];
      const staged: HTMLCanvasElement[] = [];
      let placed = false;
      try {
        for (let number = 1; number <= doc.numPages; number += 1) {
          if (cancelled) return;
          const page = await doc.getPage(number);
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: width / base.width });
          const canvas = document.createElement("canvas");
          const ratio = window.devicePixelRatio || 1;
          canvas.width = Math.floor(viewport.width * ratio);
          canvas.height = Math.floor(viewport.height * ratio);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          canvas.className = "block bg-white shadow-sm";
          canvas.setAttribute("aria-label", `${label}, page ${number} of ${doc.numPages}`);
          staged.push(canvas);
          const task = page.render({
            canvas,
            viewport,
            annotationMode: AnnotationMode.ENABLE,
            transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
          });
          tasks.push(task);
          await task.promise;
          if (cancelled) return;
          if (!placed) {
            host.replaceChildren(...staged);
            placed = true;
            setState("ready");
          } else {
            host.appendChild(canvas);
          }
        }
      } catch (error) {
        if (!cancelled && (error as { name?: string }).name !== "RenderingCancelledException") {
          setState("error");
        }
      } finally {
        painting = false;
        if (again && !cancelled) {
          again = false;
          lastWidth = 0;
          void paint();
        }
      }
    };

    const loadingTask = getDocument({ url: src });
    loadingTask.promise
      .then((loaded) => {
        doc = loaded;
        if (cancelled) return;
        return paint();
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    const observer = new ResizeObserver(() => {
      void paint();
    });
    observer.observe(frame);

    return () => {
      cancelled = true;
      observer.disconnect();
      tasks.forEach((task) => task.cancel());
      void loadingTask.destroy();
    };
  }, [label, src]);

  return (
    <div
      ref={frameRef}
      className="overflow-hidden rounded-2xl border border-[#d5deee] bg-[#e8eef6]"
      style={{ aspectRatio: `${frameWidth} / ${frameHeight}` }}
    >
      <div className="relative h-full overflow-y-auto">
        {state !== "ready" && (
          <p className="absolute inset-0 z-10 flex items-center justify-center bg-[#e8eef6] px-6 text-center text-sm text-[#4b5563]">
            {state === "error" ? "This edition could not be opened in the viewer." : "Opening the edition…"}
          </p>
        )}
        <div ref={hostRef} className="flex flex-col items-center" />
      </div>
    </div>
  );
}
