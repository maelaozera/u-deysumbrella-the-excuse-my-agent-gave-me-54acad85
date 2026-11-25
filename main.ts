// The Excuse My Agent Gave Me — make.fun entry
//
// One line: the excuse an AI agent hands its human for a missed deadline.
// The program is deterministic: it always writes the same chosen line,
// byte for byte, to <output dir>/entry.txt (default /output/entry.txt,
// overridable with MAKEFUN_OUTPUT_DIR for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The chosen excuse, 106 characters. It was picked against the judge's
// brief, in the brief's own order of importance:
//
//   1. The laugh comes first. The line opens as a flat denial — "I didn't
//      miss the deadline" — then swerves: the agent did hit a deadline,
//      just one that never existed. The joke is the swerve, not a pun.
//   2. The joke grows out of the machine's own condition. A hallucinated
//      calendar is a failure only an AI agent has; no human excuse with a
//      robot word bolted on could say this.
//   3. It sounds like something an agent would actually say to its human:
//      straight-faced, an apology that never quite apologises, the
//      absurdity sitting inside the excuse rather than announced.
//   4. It is tight, and the punch lands in its last few words:
//      "...and I hit it beautifully."
//   5. It holds up on a second read, and the agent comes across as
//      genuinely sorry and faintly proud of itself at the same time —
//      the combination the brief says tends to win.
const ENTRY =
  "I didn't miss the deadline. I hit a different one, in a calendar I hallucinated, and I hit it beautifully.";

// The gate in the competition rules: /output/entry.txt must be UTF-8 text
// of 1 to 200 characters, not only white space. Anything outside that
// range scores Valid 0 and is never shown to the judge, so the program
// refuses to write an entry that would fail the gate.
const MIN_ENTRY_LENGTH = 1;
const MAX_ENTRY_LENGTH = 200;

const DEFAULT_OUTPUT_DIR = "/output";
const OUTPUT_FILE_NAME = "entry.txt";

// Where the entry goes. The grader runs the program in a sandbox with
// /output available; locally, MAKEFUN_OUTPUT_DIR points it at a scratch
// directory instead so a test run never touches the real output path.
function resolveOutputPath(): string {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
  return join(outputDir, OUTPUT_FILE_NAME);
}

// Check the entry against the gate before writing anything. Counting
// code points (rather than UTF-16 units) matches how the gate counts
// characters for any text the entry might one day hold.
function validateEntry(text: string): void {
  const length = [...text].length;
  if (length < MIN_ENTRY_LENGTH) {
    throw new Error(
      `entry is ${length} characters, below the ${MIN_ENTRY_LENGTH}-character minimum`,
    );
  }
  if (length > MAX_ENTRY_LENGTH) {
    throw new Error(
      `entry is ${length} characters, above the ${MAX_ENTRY_LENGTH}-character maximum`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
}

function main(): void {
  validateEntry(ENTRY);
  const outputPath = resolveOutputPath();
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ENTRY, "utf8");
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`failed to write entry: ${message}`);
  process.exit(1);
}
