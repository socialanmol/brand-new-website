const FIRST_NAME_ALIASES: Record<string, string> = {
  adhitya: "adithya",
  aditya: "adithya",
  monica: "monika",
};

function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => FIRST_NAME_ALIASES[token] || token);
}

function editDistance(left: string, right: string): number {
  const rows = Array.from({ length: left.length + 1 }, (_, index) => [index]);
  for (let column = 1; column <= right.length; column += 1) rows[0][column] = column;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
    }
  }
  return rows[left.length][right.length];
}

export function matchPerson<T extends { name: string }>(query: string, people: T[]): T | null {
  const wanted = tokens(query);
  if (wanted.length === 0) return null;
  let best: { person: T; score: number } | null = null;
  for (const person of people) {
    const candidate = tokens(person.name);
    if (candidate.length === 0) continue;
    const same = wanted.join(" ") === candidate.join(" ");
    const contains = wanted.every((token) => candidate.includes(token));
    const first = editDistance(wanted[0], candidate[0]);
    const last = wanted.length > 1 && candidate.length > 1
      ? editDistance(wanted[wanted.length - 1], candidate[candidate.length - 1])
      : 0;
    const score = same ? 100 : contains ? 80 : first <= 2 && last === 0 ? 60 : 0;
    if (score > 0 && (!best || score > best.score)) best = { person, score };
  }
  return best?.person ?? null;
}
