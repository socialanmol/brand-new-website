const SHEET_ID = "1bTNyeFuB_4mLGphJE_kLHuYVlC_l-YO_mYntgpHPqh0";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const IST_OFFSET_MINUTES = 5 * 60 + 30;

const MONTHS = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11,
};

let cache = { at: 0, csv: "" };

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const source = String(text || "").replace(/^\uFEFF/, "");
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === "\"" && source[index + 1] === "\"") {
        cell += "\"";
        index += 1;
      } else if (char === "\"") {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }
    if (char === "\"") quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((entry) => entry.some((value) => value.trim()));
}

function clean(value) {
  return String(value ?? "").trim().replace(/^'+|'+$/g, "");
}

function splitList(value) {
  return clean(value)
    .split(/\s*(?:\r?\n|;|\|\|)\s*/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

function looksLikeTime(value) {
  return /\b(?:am|pm)\b/i.test(value) || /\b\d{1,2}:\d{2}\b/.test(value);
}

function joinSlot(dateText, timeText) {
  const date = clean(dateText);
  const time = clean(timeText);
  if (!date) return time;
  if (!time) return date;
  if (time.toLowerCase().includes(date.toLowerCase())) return time;
  return `${date} | ${time}`;
}

export function labelsFromRow(row) {
  const dates = splitList(row["next-batch-date"]);
  const times = splitList(row["time-slot-availability"]);
  if (times.length > 1 && times.every((time) => looksLikeTime(time) && /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(time))) {
    return times;
  }
  if (times.length === 1 && monthIn(times[0]) && looksLikeTime(times[0])) return times;
  if (times.length > 1 && dates.length === times.length) {
    return times.map((time, index) => joinSlot(dates[index], time));
  }
  if (dates.length > 1 && times.length <= 1) {
    return dates.map((date) => joinSlot(date, times[0] || ""));
  }
  if (times.length > 1) {
    return times.map((time) => (looksLikeTime(time) && !monthIn(time) ? joinSlot(dates[0] || "", time) : time));
  }
  const label = joinSlot(dates[0] || "", times[0] || "");
  return label ? [label] : [];
}

function monthIn(value) {
  return /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/i.test(value);
}

function dateParts(value, fallbackYear) {
  const iso = value.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (iso) return { year: Number(iso[1]), month: Number(iso[2]) - 1, day: Number(iso[3]) };
  const monthFirst = value.match(/\b([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,)?(?:\s+(\d{4}))?\b/);
  if (monthFirst && MONTHS[monthFirst[1].toLowerCase()] !== undefined) {
    return { year: Number(monthFirst[3] || fallbackYear), month: MONTHS[monthFirst[1].toLowerCase()], day: Number(monthFirst[2]) };
  }
  const dayFirst = value.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)(?:,)?(?:\s+(\d{4}))?\b/);
  if (dayFirst && MONTHS[dayFirst[2].toLowerCase()] !== undefined) {
    return { year: Number(dayFirst[3] || fallbackYear), month: MONTHS[dayFirst[2].toLowerCase()], day: Number(dayFirst[1]) };
  }
  return null;
}

function clockParts(value, inheritedMeridiem) {
  const match = value.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = (match[3] || inheritedMeridiem || "").toLowerCase();
  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;
  if (!meridiem && hour > 23) return null;
  if (minute > 59 || hour > 23) return null;
  return { hour, minute, meridiem };
}

function rangeClocks(timeText) {
  const parts = timeText.split(/\s+(?:to|until)\s+|\s*[–—-]\s*/i).map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  const ending = clockParts(parts[parts.length - 1], "");
  const starting = clockParts(parts[0], ending?.meridiem || "");
  if (!starting) return null;
  const end = parts.length === 1 ? starting : clockParts(parts[parts.length - 1], starting.meridiem);
  return { start: starting, end: end || starting };
}

function istInstant(parts, clock) {
  return new Date(Date.UTC(parts.year, parts.month, parts.day, clock.hour, clock.minute) - IST_OFFSET_MINUTES * 60 * 1000);
}

export function parseSlotWindow(label, now = new Date()) {
  const text = clean(label);
  const pipe = text.split("|").map((part) => part.trim());
  const timeText = pipe.length >= 2 && looksLikeTime(pipe[pipe.length - 1]) ? pipe[pipe.length - 1] : text;
  const dateText = pipe.length >= 2 && timeText === pipe[pipe.length - 1] ? pipe.slice(0, -1).join(" ") : text;
  const istNow = new Date(now.getTime() + IST_OFFSET_MINUTES * 60 * 1000);
  const parts = dateParts(dateText, istNow.getUTCFullYear());
  const clocks = rangeClocks(timeText);
  if (!parts || !clocks) return null;
  let startsAt = istInstant(parts, clocks.start);
  let endsAt = istInstant(parts, clocks.end);
  if (endsAt.getTime() <= startsAt.getTime()) endsAt = new Date(endsAt.getTime() + 24 * 60 * 60 * 1000);
  return { startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString() };
}

function normalTitle(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function seminarsFromCsv(csv, now = new Date()) {
  const rows = parseCsv(csv);
  const [header, ...body] = rows;
  if (!header) return [];
  const columns = header.map((name) => clean(name).toLowerCase());
  const grouped = new Map();
  for (const cells of body) {
    const record = Object.fromEntries(columns.map((column, index) => [column, clean(cells[index])]));
    const title = record.title;
    if (!title) continue;
    const key = normalTitle(title);
    const seminar = grouped.get(key) || { title, format: "", instructor: "", slots: [] };
    if (record.format) seminar.format = record.format;
    if (record.instructor) seminar.instructor = record.instructor;
    for (const label of labelsFromRow(record)) {
      const window = parseSlotWindow(label, now);
      if (seminar.slots.some((slot) => slot.label.toLowerCase() === label.toLowerCase())) continue;
      seminar.slots.push({
        label,
        startsAt: window?.startsAt || null,
        endsAt: window?.endsAt || null,
      });
    }
    grouped.set(key, seminar);
  }
  return [...grouped.values()].map((seminar) => ({
    ...seminar,
    slots: seminar.slots
      .filter((slot) => !slot.endsAt || Date.parse(slot.endsAt) > now.getTime())
      .sort((left, right) => Date.parse(left.startsAt || 0) - Date.parse(right.startsAt || 0)),
  }));
}

export async function loadSeminars(now = new Date()) {
  if (cache.csv && Date.now() - cache.at < 30_000) return seminarsFromCsv(cache.csv, now);
  const response = await fetch(SHEET_URL, { cache: "no-store", signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error("Seminar sheet could not be read");
  cache = { at: Date.now(), csv: await response.text() };
  return seminarsFromCsv(cache.csv, now);
}
