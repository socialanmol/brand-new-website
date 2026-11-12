import assert from "node:assert/strict";
import test from "node:test";
import { labelsFromRow, parseSlotWindow, seminarsFromCsv } from "./seminar-sheet.mjs";

const csv = [
  "title,next-batch-date,time-slot-availability,format,instructor",
  "\"How to manage your salary better: Save, Spend & Invest\",\"November 12, 2026\",4 PM to 5 PM,Masterclass,Monika Gupta",
  "\"How to manage your salary better: Save, Spend & Invest\",\"November 15, 2026\",6 PM to 7 PM,Masterclass,Monika Gupta",
].join("\n");

test("combines a date column and a time column into one slot", () => {
  const labels = labelsFromRow({
    "next-batch-date": "November 18, 2026",
    "time-slot-availability": "6 PM to 7 PM",
  });
  assert.deepEqual(labels, ["November 18, 2026 | 6 PM to 7 PM"]);
});

test("keeps a full slot written in the time column", () => {
  const labels = labelsFromRow({
    "next-batch-date": "",
    "time-slot-availability": "november 12 | 4 pm to 5 pm\nnovember 15 | 6 pm to 7 pm",
  });
  assert.deepEqual(labels, ["november 12 | 4 pm to 5 pm", "november 15 | 6 pm to 7 pm"]);
});

test("drops a slot after its end and keeps the later one as next", () => {
  const duringFirst = new Date("2026-11-12T10:00:00.000Z");
  const afterFirst = new Date("2026-11-12T11:31:00.000Z");
  const open = seminarsFromCsv(csv, duringFirst);
  const closed = seminarsFromCsv(csv, afterFirst);
  assert.equal(open[0].slots[0].label, "November 12, 2026 | 4 PM to 5 PM");
  assert.equal(open[0].slots.length, 2);
  assert.deepEqual(closed[0].slots.map((slot) => slot.label), ["November 15, 2026 | 6 PM to 7 PM"]);
});

test("keeps different page ids apart and merges rows of the same page", () => {
  const sheet = [
    "page-id,title,next-batch-date,time-slot-availability,format,instructor",
    "manage-your-salary,\"How to manage your salary better: Save, Spend & Invest\",\"November 17, 2026\",6 PM to 7 PM,Masterclass,Monica Gupta",
    "manage-your-salary,\"How to manage your salary better: Save, Spend & Invest\",\"November 20, 2026\",5 AM to 6 AM,Masterclass,Monica Gupta",
    "2-bank-approach,The 2-bank approach to better budgeting,\"December 2, 2026\",7 PM to 8 PM,Masterclass,Adithya Menon",
  ].join("\n");
  const seminars = seminarsFromCsv(sheet, new Date("2026-11-11T08:00:00.000Z"));
  assert.deepEqual(seminars.map((seminar) => seminar.pageId), ["manage-your-salary", "2-bank-approach"]);
  assert.equal(seminars[0].slots.length, 2);
  assert.equal(seminars[0].slots[0].label, "November 17, 2026 | 6 PM to 7 PM");
  assert.equal(seminars[1].instructor, "Adithya Menon");
});

test("uses the next upcoming row for instructor and format", () => {
  const sheet = [
    "page-id,title,next-batch-date,time-slot-availability,format,instructor",
    "manage-your-salary,Salary class,\"November 12, 2026\",4 PM to 5 PM,Masterclass,Monica Gupta",
    "manage-your-salary,Salary class,\"November 12, 2026\",6 PM to 7 PM,Masterclass,Adhitya Menon",
    "manage-your-salary,Salary class,\"November 11, 2026\",2 PM to 3 PM,Pre-Recorded Sessions,Silky Kedia",
  ].join("\n");
  const before = seminarsFromCsv(sheet, new Date("2026-11-12T07:00:00.000Z"));
  assert.equal(before[0].instructor, "Monica Gupta");
  assert.equal(before[0].format, "Masterclass");
  assert.deepEqual(before[0].slots.map((slot) => slot.label), [
    "November 12, 2026 | 4 PM to 5 PM",
    "November 12, 2026 | 6 PM to 7 PM",
  ]);
  const after = seminarsFromCsv(sheet, new Date("2026-11-12T11:31:00.000Z"));
  assert.equal(after[0].instructor, "Adhitya Menon");
  assert.equal(after[0].format, "Masterclass");
  assert.deepEqual(after[0].slots.map((slot) => slot.label), ["November 12, 2026 | 6 PM to 7 PM"]);
});

test("parses the end of a slot in India time", () => {
  const window = parseSlotWindow("November 18, 2026 | 6 PM to 7 PM", new Date("2026-11-11T00:00:00.000Z"));
  assert.equal(window.endsAt, "2026-11-18T13:30:00.000Z");
  assert.equal(window.startsAt, "2026-11-18T12:30:00.000Z");
});
