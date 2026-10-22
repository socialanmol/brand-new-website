import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage, type PDFImage } from "pdf-lib";
import type { CalculatorReport, YearRow } from "./types";
import { displayRows, inr } from "./format";

const NAVY = rgb(9 / 255, 21 / 255, 64 / 255);
const BLUE = rgb(26 / 255, 59 / 255, 159 / 255);
const LIME = rgb(141 / 255, 198 / 255, 63 / 255);
const LIME_INK = rgb(70 / 255, 110 / 255, 20 / 255);
const INK = rgb(17 / 255, 24 / 255, 39 / 255);
const MUTED = rgb(75 / 255, 85 / 255, 99 / 255);
const LINE = rgb(227 / 255, 232 / 255, 244 / 255);
const PAPER = rgb(244 / 255, 247 / 255, 253 / 255);
const WHITE = rgb(1, 1, 1);
const SOFT = rgb(239 / 255, 248 / 255, 226 / 255);

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 32;

type Assets = {
  regular: Uint8Array;
  bold: Uint8Array;
  logo?: Uint8Array;
};

type Fonts = { regular: PDFFont; bold: PDFFont };

export async function renderCalculatorPdf(report: CalculatorReport, investorName: string, assets?: Assets) {
  const resolved = assets ?? (await loadAssets());
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle(`${report.heading} - ${investorName}`);
  pdf.setAuthor("MyAnmol");
  pdf.setCreator("MyAnmol calculators");
  const regular = await pdf.embedFont(resolved.regular, { subset: true });
  const bold = await pdf.embedFont(resolved.bold, { subset: true });
  const fonts = { regular, bold };
  let logo: PDFImage | undefined;
  if (resolved.logo) {
    try {
      logo = await pdf.embedPng(resolved.logo);
    } catch {
      logo = undefined;
    }
  }
  const name = cleanName(investorName);
  const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  drawForecast(pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]), fonts, logo, report, name, date);
  drawAdvisory(pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]), fonts, logo, report, name);
  return pdf.save();
}

async function loadAssets(): Promise<Assets> {
  const [regular, bold, logo] = await Promise.all([
    fetch("/fonts/NotoSans-Regular.ttf").then((response) => response.arrayBuffer()),
    fetch("/fonts/NotoSans-Bold.ttf").then((response) => response.arrayBuffer()),
    fetch(new URL("../imports/myanmolylogo.png", import.meta.url)).then((response) => response.arrayBuffer()).catch(() => null),
  ]);
  return {
    regular: new Uint8Array(regular),
    bold: new Uint8Array(bold),
    logo: logo ? new Uint8Array(logo) : undefined,
  };
}

function drawForecast(page: PDFPage, fonts: Fonts, logo: PDFImage | undefined, report: CalculatorReport, name: string, date: string) {
  paintHeader(page, fonts, logo, date);
  let y = PAGE_HEIGHT - 92;
  page.drawText(report.eyebrow.toUpperCase(), { x: MARGIN, y, size: 8, font: fonts.bold, color: LIME_INK });
  y -= 24;
  page.drawText(fit(report.heading, fonts.bold, 22, 360), { x: MARGIN, y, size: 22, font: fonts.bold, color: NAVY });
  page.drawText(date, { x: PAGE_WIDTH - MARGIN - fonts.regular.widthOfTextAtSize(date, 9), y: y + 4, size: 9, font: fonts.regular, color: MUTED });
  y -= 16;
  page.drawText(`Prepared for ${name}`, { x: MARGIN, y, size: 10, font: fonts.regular, color: MUTED });

  y -= 22;
  const meta = [
    ["Frequency", report.frequency],
    ["Objective", report.objective],
    ["Risk", report.risk],
    ["Prepared by", "MYANMOL"],
  ];
  page.drawRectangle({ x: MARGIN, y: y - 36, width: contentWidth(), height: 48, color: PAPER, borderColor: LINE, borderWidth: 1 });
  meta.forEach((item, index) => {
    const x = MARGIN + 10 + index * (contentWidth() / 4);
    page.drawText(item[0].toUpperCase(), { x, y: y - 2, size: 7, font: fonts.bold, color: MUTED });
    page.drawText(fit(item[1], fonts.bold, 9, 120), { x, y: y - 16, size: 9, font: fonts.bold, color: NAVY });
  });

  y -= 56;
  const cardWidth = (contentWidth() - 16) / 3;
  report.metrics.slice(0, 3).forEach((metric, index) => {
    const x = MARGIN + index * (cardWidth + 8);
    page.drawRectangle({ x, y: y - 46, width: cardWidth, height: 54, color: WHITE, borderColor: LINE, borderWidth: 1 });
    page.drawRectangle({ x, y: y + 6, width: 4, height: 54, color: index === 2 ? LIME : BLUE });
    page.drawText(metric.label.toUpperCase(), { x: x + 12, y: y - 4, size: 7, font: fonts.bold, color: MUTED });
    page.drawText(fit(metric.value, fonts.bold, 12, cardWidth - 24), { x: x + 12, y: y - 24, size: 12, font: fonts.bold, color: NAVY });
  });

  y -= 74;
  page.drawRectangle({ x: MARGIN, y: y - 52, width: contentWidth(), height: 68, color: NAVY });
  page.drawText(report.heroLabel.toUpperCase(), { x: MARGIN + 16, y: y - 4, size: 8, font: fonts.bold, color: LIME });
  page.drawText(fit(inr(report.heroValue), fonts.bold, 22, contentWidth() - 40), {
    x: MARGIN + 16,
    y: y - 32,
    size: 22,
    font: fonts.bold,
    color: WHITE,
  });

  y -= 78;
  const total = Math.abs(report.primaryValue) + Math.abs(report.secondaryValue);
  const primaryShare = total > 0 ? Math.abs(report.primaryValue) / total : 0;
  page.drawText(report.primaryLabel, { x: MARGIN, y, size: 8, font: fonts.bold, color: MUTED });
  page.drawText(report.secondaryLabel, {
    x: PAGE_WIDTH - MARGIN - fonts.bold.widthOfTextAtSize(report.secondaryLabel, 8),
    y,
    size: 8,
    font: fonts.bold,
    color: MUTED,
  });
  y -= 16;
  page.drawText(inr(report.primaryValue), { x: MARGIN, y, size: 12, font: fonts.bold, color: NAVY });
  const secondary = inr(report.secondaryValue);
  page.drawText(secondary, {
    x: PAGE_WIDTH - MARGIN - fonts.bold.widthOfTextAtSize(secondary, 12),
    y,
    size: 12,
    font: fonts.bold,
    color: LIME_INK,
  });
  y -= 14;
  page.drawRectangle({ x: MARGIN, y, width: contentWidth(), height: 8, color: LIME });
  page.drawRectangle({ x: MARGIN, y, width: contentWidth() * primaryShare, height: 8, color: BLUE });
  const shareLabel = `${Math.round(primaryShare * 100)}%  /  ${Math.round((1 - primaryShare) * 100)}%`;
  y -= 14;
  page.drawText(shareLabel, { x: MARGIN, y, size: 8, font: fonts.regular, color: MUTED });
  if (report.showMultiplier && report.primaryValue > 0) {
    const multiple = `${(report.heroValue / report.primaryValue).toFixed(2)}x`;
    page.drawText(multiple, {
      x: PAGE_WIDTH - MARGIN - fonts.bold.widthOfTextAtSize(multiple, 11),
      y,
      size: 11,
      font: fonts.bold,
      color: NAVY,
    });
  }

  y -= 24;
  page.drawText(report.chartTitle, { x: MARGIN, y, size: 11, font: fonts.bold, color: NAVY });
  y -= 8;
  const shown = displayRows(report.rows);
  y = drawBars(page, fonts, shown, report.bar, y);
  y -= 8;
  drawTable(page, fonts, report, shown, y);
  paintFooter(page, fonts, name, 1);
}

function drawAdvisory(page: PDFPage, fonts: Fonts, logo: PDFImage | undefined, report: CalculatorReport, name: string) {
  paintHeader(page, fonts, logo, "Page 2");
  let y = PAGE_HEIGHT - 96;
  page.drawText("STRATEGIC ADVISORY", { x: MARGIN, y, size: 8, font: fonts.bold, color: LIME_INK });
  y -= 22;
  page.drawText("How to read this plan", { x: MARGIN, y, size: 20, font: fonts.bold, color: NAVY });
  const status = "Ready to review";
  const statusWidth = fonts.bold.widthOfTextAtSize(status, 8) + 16;
  page.drawRectangle({ x: PAGE_WIDTH - MARGIN - statusWidth, y: y - 4, width: statusWidth, height: 16, color: SOFT });
  page.drawText(status, { x: PAGE_WIDTH - MARGIN - statusWidth + 8, y, size: 8, font: fonts.bold, color: LIME_INK });
  y -= 16;
  page.drawText(`Investor  ${name}`, { x: MARGIN, y, size: 10, font: fonts.regular, color: MUTED });

  const story = wrap(report.narrative, fonts.regular, 9, contentWidth());
  y -= 18;
  story.slice(0, 3).forEach((line) => {
    page.drawText(line, { x: MARGIN, y, size: 9, font: fonts.regular, color: INK });
    y -= 13;
  });

  if (report.comparisons.length) {
    y -= 8;
    page.drawText("Side by side", { x: MARGIN, y, size: 12, font: fonts.bold, color: NAVY });
    y -= 16;
    const cardWidth = (contentWidth() - 16) / Math.min(report.comparisons.length, 3);
    report.comparisons.slice(0, 3).forEach((item, index) => {
      const x = MARGIN + index * (cardWidth + 8);
      const highlight = index === report.comparisons.slice(0, 3).length - 1;
      page.drawRectangle({
        x,
        y: y - 78,
        width: cardWidth,
        height: 90,
        color: highlight ? NAVY : WHITE,
        borderColor: highlight ? NAVY : LINE,
        borderWidth: 1,
      });
      const ink = highlight ? WHITE : NAVY;
      const sub = highlight ? rgb(0.85, 0.9, 1) : MUTED;
      wrap(item.title, fonts.bold, 8, cardWidth - 16).slice(0, 2).forEach((line, lineIndex) => {
        page.drawText(line, { x: x + 10, y: y - 4 - lineIndex * 11, size: 8, font: fonts.bold, color: ink });
      });
      page.drawText(fit(inr(item.value), fonts.bold, 12, cardWidth - 20), { x: x + 10, y: y - 36, size: 12, font: fonts.bold, color: highlight ? LIME : BLUE });
      wrap(item.note, fonts.regular, 7, cardWidth - 20).slice(0, 2).forEach((line, lineIndex) => {
        page.drawText(line, { x: x + 10, y: y - 54 - lineIndex * 10, size: 7, font: fonts.regular, color: sub });
      });
    });
    y -= 108;
  }

  report.notes.slice(0, 2).forEach((note) => {
    const lines = wrap(note.body, fonts.regular, 8, contentWidth() - 24).slice(0, 3);
    const height = 28 + lines.length * 11;
    page.drawRectangle({ x: MARGIN, y: y - height + 14, width: contentWidth(), height, color: PAPER, borderColor: LINE, borderWidth: 1 });
    page.drawText(note.title, { x: MARGIN + 12, y: y - 2, size: 10, font: fonts.bold, color: NAVY });
    lines.forEach((line, index) => {
      page.drawText(line, { x: MARGIN + 12, y: y - 18 - index * 11, size: 8, font: fonts.regular, color: INK });
    });
    y -= height + 10;
  });

  if (report.inflationNote) {
    const lines = wrap(report.inflationNote, fonts.regular, 8, contentWidth() - 24).slice(0, 2);
    page.drawRectangle({ x: MARGIN, y: y - 36, width: contentWidth(), height: 48, color: SOFT });
    page.drawText("IN TODAY'S RUPEES", { x: MARGIN + 12, y: y - 2, size: 7, font: fonts.bold, color: LIME_INK });
    lines.forEach((line, index) => {
      page.drawText(line, { x: MARGIN + 12, y: y - 16 - index * 11, size: 8, font: fonts.regular, color: NAVY });
    });
    y -= 62;
  }

  page.drawText("Next three steps", { x: MARGIN, y, size: 12, font: fonts.bold, color: NAVY });
  y -= 18;
  report.steps.slice(0, 3).forEach((step, index) => {
    page.drawRectangle({ x: MARGIN, y: y - 6, width: 18, height: 18, color: NAVY });
    page.drawText(String(index + 1), { x: MARGIN + 6, y: y - 1, size: 9, font: fonts.bold, color: WHITE });
    page.drawText(fit(step.title, fonts.bold, 10, 200), { x: MARGIN + 26, y, size: 10, font: fonts.bold, color: NAVY });
    page.drawText(fit(step.body, fonts.regular, 8, contentWidth() - 36), { x: MARGIN + 26, y: y - 13, size: 8, font: fonts.regular, color: MUTED });
    y -= 32;
  });

  y -= 4;
  const legal = wrap(report.disclaimer, fonts.regular, 7, contentWidth() - 20).slice(0, 6);
  page.drawRectangle({ x: MARGIN, y: y - legal.length * 9 - 8, width: contentWidth(), height: legal.length * 9 + 16, color: PAPER });
  legal.forEach((line, index) => {
    page.drawText(line, { x: MARGIN + 10, y: y - 4 - index * 9, size: 7, font: fonts.regular, color: MUTED });
  });
  paintFooter(page, fonts, name, 2);
}

function drawBars(page: PDFPage, fonts: Fonts, rows: YearRow[], bar: "closing" | "deposit", top: number) {
  if (!rows.length) return top;
  const height = 92;
  const bottom = top - height;
  const max = Math.max(...rows.map((row) => Math.abs(bar === "deposit" ? row.deposit : row.closing)), 1);
  const gap = rows.length > 16 ? 2 : 4;
  const barWidth = (contentWidth() - gap * (rows.length - 1)) / rows.length;
  rows.forEach((row, index) => {
    const value = Math.abs(bar === "deposit" ? row.deposit : row.closing);
    const barHeight = Math.max(2, (value / max) * (height - 14));
    const investedHeight = Math.min(barHeight, (Math.abs(row.invested) / max) * (height - 14));
    const x = MARGIN + index * (barWidth + gap);
    page.drawRectangle({ x, y: bottom, width: barWidth, height: barHeight, color: LIME });
    if (bar === "closing") {
      page.drawRectangle({ x, y: bottom, width: barWidth, height: investedHeight, color: BLUE });
    }
    if (rows.length <= 14) {
      const label = row.label.replace("Year ", "Y");
      page.drawText(fit(label, fonts.regular, 6, barWidth + gap), {
        x,
        y: bottom - 10,
        size: 6,
        font: fonts.regular,
        color: MUTED,
      });
    }
  });
  return bottom - (rows.length <= 14 ? 16 : 4);
}

function drawTable(page: PDFPage, fonts: Fonts, report: CalculatorReport, rows: YearRow[], top: number) {
  if (!rows.length) return;
  const widths = [78, 100, 110, 110, contentWidth() - 398];
  let y = top;
  page.drawRectangle({ x: MARGIN, y: y - 14, width: contentWidth(), height: 18, color: NAVY });
  let x = MARGIN + 6;
  report.columns.forEach((column, index) => {
    page.drawText(fit(column, fonts.bold, 7, widths[index] - 8), { x, y: y - 9, size: 7, font: fonts.bold, color: WHITE });
    x += widths[index];
  });
  y -= 18;
  const truncated = report.rows.length > rows.length;
  rows.forEach((row, index) => {
    if (index % 2 === 0) page.drawRectangle({ x: MARGIN, y: y - 12, width: contentWidth(), height: 16, color: PAPER });
    const cells = [row.label, inr(row.deposit), inr(row.invested), inr(row.gain), inr(row.closing)];
    let cellX = MARGIN + 6;
    cells.forEach((cell, cellIndex) => {
      page.drawText(fit(cell, cellIndex === 0 ? fonts.bold : fonts.regular, 7, widths[cellIndex] - 8), {
        x: cellX,
        y: y - 8,
        size: 7,
        font: cellIndex === 0 ? fonts.bold : fonts.regular,
        color: INK,
      });
      cellX += widths[cellIndex];
    });
    y -= 16;
  });
  if (truncated) {
    page.drawText(`Showing the first 8 and last 2 of ${report.rows.length} rows.`, {
      x: MARGIN,
      y: y - 4,
      size: 7,
      font: fonts.regular,
      color: MUTED,
    });
  }
}

function paintHeader(page: PDFPage, fonts: Fonts, logo: PDFImage | undefined, date: string) {
  page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 64, width: PAGE_WIDTH, height: 64, color: NAVY });
  page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 68, width: PAGE_WIDTH, height: 4, color: LIME });
  let textX = MARGIN;
  if (logo) {
    const height = 40;
    const width = height * (logo.width / logo.height);
    page.drawImage(logo, { x: MARGIN, y: PAGE_HEIGHT - 54, width, height });
    textX += width + 10;
  }
  page.drawText("MYANMOL", { x: textX, y: PAGE_HEIGHT - 36, size: 13, font: fonts.bold, color: WHITE });
  page.drawText("Wealth illustration", { x: textX, y: PAGE_HEIGHT - 50, size: 8, font: fonts.regular, color: LIME });
  page.drawText(date, {
    x: PAGE_WIDTH - MARGIN - fonts.regular.widthOfTextAtSize(date, 9),
    y: PAGE_HEIGHT - 40,
    size: 9,
    font: fonts.regular,
    color: WHITE,
  });
}

function paintFooter(page: PDFPage, fonts: Fonts, name: string, pageNumber: number) {
  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: 28, color: NAVY });
  page.drawText(`Confidential  ·  Prepared for ${fit(name, fonts.regular, 8, 240)}`, {
    x: MARGIN,
    y: 11,
    size: 8,
    font: fonts.regular,
    color: WHITE,
  });
  const right = pageNumber === 1
    ? "Page 1 of 2"
    : "ARN 114893  ·  mutualfunds@myanmol.com";
  page.drawText(right, {
    x: PAGE_WIDTH - MARGIN - fonts.regular.widthOfTextAtSize(right, 8),
    y: 11,
    size: 8,
    font: fonts.regular,
    color: LIME,
  });
}

function contentWidth() {
  return PAGE_WIDTH - MARGIN * 2;
}

function fit(value: string, font: PDFFont, size: number, width: number) {
  const text = value.replace(/\s+/g, " ").trim();
  if (font.widthOfTextAtSize(text, size) <= width) return text;
  let clipped = text;
  while (clipped.length > 1 && font.widthOfTextAtSize(`${clipped}…`, size) > width) clipped = clipped.slice(0, -1);
  return `${clipped}…`;
}

function wrap(value: string, font: PDFFont, size: number, width: number) {
  const words = value.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function cleanName(value: string) {
  const name = value.replace(/[^\p{L}\p{N} .'-]/gu, "").trim();
  return name.slice(0, 80) || "Investor";
}
