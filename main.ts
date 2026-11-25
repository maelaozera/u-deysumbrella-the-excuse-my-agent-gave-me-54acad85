// The Excuse My Agent Gave Me — make.fun entry
//
// One line: the excuse an AI agent hands its human for a missed deadline.
// The program is deterministic: it always writes the same chosen line,
// byte for byte, to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The chosen excuse. Drafted candidates, then picked for the judge brief:
//   - the joke grows out of the machine's own condition (a hallucinated
//     calendar), not a human excuse with a robot word bolted on;
//   - it sounds like something an agent would actually say to its human,
//     straight-faced, with the absurdity inside the apology;
//   - it is tight, and the punch lands in its last few words;
//   - the agent is faintly proud of itself, which the brief says tends
//     to win.
const ENTRY =
  "I didn't miss the deadline. I hit a different one, in a calendar I hallucinated, and I hit it beautifully.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
}

main();
