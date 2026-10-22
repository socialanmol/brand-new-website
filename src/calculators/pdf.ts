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
  drawAdvisory(pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]), fonts, logo, report, name, date);
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
  paintHeader(page, fonts, logo, "");
  let y = PAGE_HEIGHT - 92;
  page.drawText(fit(report.heading, fonts.bold, 20, 340), { x: MARGIN, y: y + 4, size: 20, font: fonts.bold, color: NAVY });
  const dateLine = `Date: ${date}`;
  page.drawText(dateLine, {
    x: PAGE_WIDTH - MARGIN - fonts.regular.widthOfTextAtSize(dateLine, 8),
    y: y + 8,
    size: 8,
    font: fonts.regular,
    color: MUTED,
  });
  const frequencyLine = `Frequency: ${report.frequency}`;
  page.drawText(fit(frequencyLine, fonts.regular, 8, 210), {
    x: PAGE_WIDTH - MARGIN - Math.min(210, fonts.regular.widthOfTextAtSize(frequencyLine, 8)),
    y: y - 6,
    size: 8,
    font: fonts.regular,
    color: MUTED,
  });
  y -= 22;
  page.drawText(report.eyebrow.toUpperCase(), { x: MARGIN, y, size: 8, font: fonts.bold, color: LIME_INK });

  y -= 28;
  const meta = [
    ["Client name", name],
    ["Target objective", report.objective],
    ["Risk profile", report.risk],
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
  const multiple = report.showMultiplier && report.primaryValue > 0 ? `${(report.heroValue / report.primaryValue).toFixed(2)}x` : "";
  page.drawText(fit(inr(report.heroValue), fonts.bold, 22, contentWidth() - (multiple ? 130 : 40)), {
    x: MARGIN + 16,
    y: y - 32,
    size: 22,
    font: fonts.bold,
    color: WHITE,
  });
  if (multiple) {
    const multipleWidth = fonts.bold.widthOfTextAtSize(multiple, 16);
    page.drawText(multiple, { x: PAGE_WIDTH - MARGIN - 16 - multipleWidth, y: y - 24, size: 16, font: fonts.bold, color: LIME });
    const badge = "GROWTH MULTIPLIER";
    page.drawText(badge, {
      x: PAGE_WIDTH - MARGIN - 16 - fonts.bold.widthOfTextAtSize(badge, 6),
      y: y - 38,
      size: 6,
      font: fonts.bold,
      color: WHITE,
    });
  }

  y -= 78;
  const total = Math.abs(report.primaryValue) + Math.abs(report.secondaryValue);
  const primaryShare = total > 0 ? Math.abs(report.primaryValue) / total : 0;
  const primaryLine = `${report.primaryLabel}: ${inr(report.primaryValue)} (${(primaryShare * 100).toFixed(1)}%)`;
  const secondaryLine = `${report.secondaryLabel}: ${inr(report.secondaryValue)} (${((1 - primaryShare) * 100).toFixed(1)}%)`;
  page.drawText(fit(primaryLine, fonts.bold, 9, 280), { x: MARGIN, y, size: 9, font: fonts.bold, color: NAVY });
  page.drawText(fit(secondaryLine, fonts.bold, 9, 250), {
    x: PAGE_WIDTH - MARGIN - Math.min(250, fonts.bold.widthOfTextAtSize(secondaryLine, 9)),
    y,
    size: 9,
    font: fonts.bold,
    color: LIME_INK,
  });
  y -= 14;
  page.drawRectangle({ x: MARGIN, y, width: contentWidth(), height: 8, color: LIME });
  page.drawRectangle({ x: MARGIN, y, width: contentWidth() * primaryShare, height: 8, color: BLUE });

  y -= 24;
  page.drawText(report.chartTitle, { x: MARGIN, y, size: 11, font: fonts.bold, color: NAVY });
  y -= 8;
  const shown = displayRows(report.rows);
  y = drawBars(page, fonts, shown, report.bar, y);
  y -= 8;
  drawTable(page, fonts, report, shown, y);
  paintFooter(page, fonts, name, 1);
}

function drawAdvisory(page: PDFPage, fonts: Fonts, logo: PDFImage | undefined, report: CalculatorReport, name: string, date: string) {
  paintHeader(page, fonts, logo, date);
  let y = PAGE_HEIGHT - 86;
  page.drawText(fit("Strategic Advisory & Optimization", fonts.bold, 15, 300), { x: MARGIN, y, size: 15, font: fonts.bold, color: NAVY });
  const investor = `Investor: ${name}`;
  page.drawText(fit(investor, fonts.regular, 8, 200), {
    x: PAGE_WIDTH - MARGIN - Math.min(200, fonts.regular.widthOfTextAtSize(investor, 8)),
    y: y + 2,
    size: 8,
    font: fonts.regular,
    color: MUTED,
  });
  const status = "Status: Ready to review";
  page.drawText(status, {
    x: PAGE_WIDTH - MARGIN - fonts.bold.widthOfTextAtSize(status, 8),
    y: y - 12,
    size: 8,
    font: fonts.bold,
    color: LIME_INK,
  });
  y -= 32;
  page.drawText("COMPARATIVE BENCHMARKS & EXECUTION ROADMAP", { x: MARGIN, y, size: 8, font: fonts.bold, color: LIME_INK });
  y -= 14;
  wrap(report.narrative, fonts.regular, 8, contentWidth()).slice(0, 2).forEach((line) => {
    page.drawText(line, { x: MARGIN, y, size: 8, font: fonts.regular, color: MUTED });
    y -= 11;
  });
  y -= 8;

  const benchmarks = report.benchmarks.slice(0, 3);
  if (benchmarks.length) {
    page.drawText(fit(report.benchmarkHeading, fonts.bold, 9, contentWidth()), { x: MARGIN, y, size: 9, font: fonts.bold, color: NAVY });
    y -= 14;
    const tableHeight = 16 + benchmarks.length * 16;
    const blockHeight = report.highlight ? Math.max(tableHeight, 104) : tableHeight;
    const tableWidth = report.highlight ? 318 : contentWidth();
    drawBenchmarkTable(page, fonts, benchmarks, report, MARGIN, y, tableWidth);
    if (report.highlight) {
      drawHighlightCard(page, fonts, report.highlight, MARGIN + tableWidth + 12, y, contentWidth() - tableWidth - 12, blockHeight);
    }
    y -= blockHeight + 16;
  } else if (report.comparisons.length) {
    report.comparisons.slice(0, 3).forEach((item, index) => {
      page.drawText(fit(`${item.title}  ${inr(item.value)}`, fonts.regular, 8, contentWidth()), { x: MARGIN, y: y - index * 12, size: 8, font: fonts.regular, color: INK });
    });
    y -= report.comparisons.slice(0, 3).length * 12 + 10;
  }

  if (report.delays.length) {
    page.drawText(fit(report.delayHeading, fonts.bold, 10, contentWidth()), { x: MARGIN, y, size: 10, font: fonts.bold, color: NAVY });
    y -= 12;
    const count = Math.min(report.delays.length, 3);
    const width = (contentWidth() - 8 * (count - 1)) / count;
    const cardHeight = 70;
    report.delays.slice(0, 3).forEach((delay, index) => {
      const x = MARGIN + index * (width + 8);
      page.drawRectangle({ x, y: y - cardHeight, width, height: cardHeight, color: WHITE, borderColor: LINE, borderWidth: 1 });
      page.drawText(fit(delay.label.toUpperCase(), fonts.bold, 7, width - 16), { x: x + 8, y: y - 14, size: 7, font: fonts.bold, color: MUTED });
      page.drawText(fit(`−${inr(Math.abs(delay.loss))}`, fonts.bold, 11, width - 16), { x: x + 8, y: y - 32, size: 11, font: fonts.bold, color: NAVY });
      wrap(delay.note, fonts.regular, 7, width - 16).slice(0, 2).forEach((line, lineIndex) => {
        page.drawText(line, { x: x + 8, y: y - 48 - lineIndex * 9, size: 7, font: fonts.regular, color: MUTED });
      });
    });
    y -= cardHeight + 16;
  }

  if (report.realValue > 0 && report.inflationNote) {
    const bandHeight = 54;
    page.drawRectangle({ x: MARGIN, y: y - bandHeight, width: contentWidth(), height: bandHeight, color: SOFT });
    page.drawText("INFLATION-ADJUSTED PURCHASING POWER", { x: MARGIN + 12, y: y - 14, size: 7, font: fonts.bold, color: LIME_INK });
    wrap(report.inflationNote, fonts.regular, 8, contentWidth() - 160).slice(0, 2).forEach((line, index) => {
      page.drawText(line, { x: MARGIN + 12, y: y - 28 - index * 11, size: 8, font: fonts.regular, color: NAVY });
    });
    const real = inr(report.realValue);
    page.drawText(real, {
      x: PAGE_WIDTH - MARGIN - 12 - fonts.bold.widthOfTextAtSize(real, 12),
      y: y - 24,
      size: 12,
      font: fonts.bold,
      color: NAVY,
    });
    page.drawText("In today's rupees", {
      x: PAGE_WIDTH - MARGIN - 12 - fonts.regular.widthOfTextAtSize("In today's rupees", 7),
      y: y - 38,
      size: 7,
      font: fonts.regular,
      color: MUTED,
    });
    y -= bandHeight + 14;
  }

  if (y > 150) {
    page.drawText("How to act on this plan", { x: MARGIN, y, size: 10, font: fonts.bold, color: NAVY });
    y -= 16;
    report.steps.slice(0, 3).forEach((step, index) => {
      page.drawText(`${index + 1}.  ${fit(step.title, fonts.bold, 9, 136)}`, { x: MARGIN, y, size: 9, font: fonts.bold, color: NAVY });
      page.drawText(fit(step.body, fonts.regular, 8, contentWidth() - 164), { x: MARGIN + 156, y, size: 8, font: fonts.regular, color: MUTED });
      y -= 14;
    });
    y -= 6;
  }

  const legal = wrap(`Regulatory notice: ${report.disclaimer}`, fonts.regular, 7, contentWidth() - 16).slice(0, 4);
  const legalHeight = legal.length * 9 + 12;
  const floor = 40;
  if (y - legalHeight < floor) y = floor + legalHeight;
  page.drawRectangle({ x: MARGIN, y: y - legalHeight, width: contentWidth(), height: legalHeight, color: PAPER });
  legal.forEach((line, index) => {
    page.drawText(line, { x: MARGIN + 8, y: y - legalHeight + 8 + (legal.length - 1 - index) * 9, size: 7, font: fonts.regular, color: MUTED });
  });
  paintFooter(page, fonts, name, 2);
}

function drawBenchmarkTable(page: PDFPage, fonts: Fonts, rows: CalculatorReport["benchmarks"], report: CalculatorReport, x: number, top: number, width: number) {
  const nameWidth = Math.min(132, width * 0.46);
  const rateWidth = 52;
  const columns = [nameWidth, rateWidth, Math.max(40, width - nameWidth - rateWidth)];
  const headerHeight = 16;
  page.drawRectangle({ x, y: top - headerHeight, width, height: headerHeight, color: NAVY });
  [report.benchmarkRateLabel === "Rate" ? "Asset" : "Item", report.benchmarkRateLabel, report.benchmarkValueLabel].forEach((label, index) => {
    const cellX = x + 6 + columns.slice(0, index).reduce((sum, size) => sum + size, 0);
    page.drawText(fit(label, fonts.bold, 7, columns[index] - 8), { x: cellX, y: top - 11, size: 7, font: fonts.bold, color: WHITE });
  });
  rows.forEach((row, index) => {
    const rowTop = top - headerHeight - index * 16;
    if (index === rows.length - 1) page.drawRectangle({ x, y: rowTop - 16, width, height: 16, color: SOFT });
    const cells = [row.name, row.rate, inr(row.corpus)];
    cells.forEach((cell, cellIndex) => {
      const cellX = x + 6 + columns.slice(0, cellIndex).reduce((sum, size) => sum + size, 0);
      page.drawText(fit(cell, cellIndex === 0 ? fonts.bold : fonts.regular, 7, columns[cellIndex] - 8), {
        x: cellX,
        y: rowTop - 11,
        size: 7,
        font: cellIndex === 0 ? fonts.bold : fonts.regular,
        color: NAVY,
      });
    });
  });
}

function drawHighlightCard(page: PDFPage, fonts: Fonts, highlight: NonNullable<CalculatorReport["highlight"]>, x: number, top: number, width: number, height: number) {
  page.drawRectangle({ x, y: top - height, width, height, color: NAVY });
  let textY = top - 16;
  page.drawText(fit(highlight.kicker.toUpperCase(), fonts.bold, 7, width - 16), { x: x + 8, y: textY, size: 7, font: fonts.bold, color: LIME });
  textY -= 14;
  wrap(highlight.title, fonts.bold, 8, width - 16).slice(0, 2).forEach((line) => {
    page.drawText(line, { x: x + 8, y: textY, size: 8, font: fonts.bold, color: WHITE });
    textY -= 11;
  });
  textY -= 4;
  page.drawText(fit(inr(highlight.value), fonts.bold, 12, width - 16), { x: x + 8, y: textY, size: 12, font: fonts.bold, color: LIME });
  textY -= 16;
  wrap(highlight.body, fonts.regular, 7, width - 16).slice(0, 2).forEach((line) => {
    page.drawText(line, { x: x + 8, y: textY, size: 7, font: fonts.regular, color: WHITE });
    textY -= 9;
  });
  page.drawText(fit(highlight.foot, fonts.bold, 6, width - 16), { x: x + 8, y: top - height + 8, size: 6, font: fonts.bold, color: LIME });
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
  const last = report.rows[report.rows.length - 1];
  if (last) {
    page.drawRectangle({ x: MARGIN, y: y - 12, width: contentWidth(), height: 16, color: SOFT });
    const summary = ["Summary", "—", inr(last.invested), inr(last.gain), inr(last.closing)];
    let summaryX = MARGIN + 6;
    summary.forEach((cell, index) => {
      page.drawText(fit(cell, fonts.bold, 7, widths[index] - 8), {
        x: summaryX,
        y: y - 8,
        size: 7,
        font: fonts.bold,
        color: NAVY,
      });
      summaryX += widths[index];
    });
    y -= 16;
  }
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
