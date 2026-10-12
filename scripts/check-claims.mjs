import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Banned-claims gate.
 * Lines 1-4 are case-insensitive, except the MD alternative, which is case-sensitive.
 * Line 5 (spelling) and line 6 are case-sensitive so ".md" and "MaQkrs" do not match.
 */

const patterns = [
  {
    label: "line-1",
    regex: /Doctor of Medicine|\bM\.D\.|M\.D\. Candidate|four years of medical school|medical school graduate/gi,
  },
  {
    label: "line-1-md",
    regex: /\bMD\b/g,
  },
  {
    label: "line-2",
    regex: /federal licensing|two MSDH-licensed businesses|stood up two licensed|hired after licensing|required full FDA/gi,
  },
  {
    label: "line-3",
    regex: /Georgia[^.]{0,40}standards|aligned with [^.]{0,30}standards|\bGSE\b|Milestones aligned|30-day (free )?trial/gi,
  },
  {
    label: "line-4",
    regex: /God Mode|Cybersecurity Systems Engineer|Clearable|\bFellow\b|Pre-Vetted|Tier 5|His Name|seeking internships?/gi,
  },
  {
    label: "line-5",
    regex: /Information Security Systems Engineer|Secure Systems Architect|Tier 3|background investigations?|Operational Director|Laboratory Specialist|Montevallo[^.]{0,80}3\.75|regulatory licensure|Master Prosector/g,
  },
  {
    label: "line-6",
    regex: /Apple ID|\bGBA\b|Game ?Boy|Nintendo|\bMaqkrs\b(?![-/._a-zA-Z0-9])|MaQkRs/g,
  },
];

// Exact URL, path, repo slug, or ID strings that are addresses, not claims.
const allowExact = [
  "https://github.com/astrachan163/MaqkrsTutor-public",
];

const roots = ["README.md", "docs", "site", "data", "package.json", "firebase.json", ".firebaserc"];
const skipDir = new Set(["node_modules", "dist", "brand", "vendor"]);

function filesIn(entry, out) {
  if (!statSafe(entry)) {
    return;
  }
  const stat = statSync(entry);
  if (stat.isDirectory()) {
    if (skipDir.has(path.basename(entry))) {
      return;
    }
    for (const name of readdirSync(entry)) {
      filesIn(path.join(entry, name), out);
    }
    return;
  }
  if (/\.(png|jpe?g|webp|gif|ico|woff2?|mp4|webm|svg|pdf)$/i.test(entry)) {
    return;
  }
  out.push(entry);
}

function statSafe(entry) {
  try {
    statSync(entry);
    return true;
  } catch {
    return false;
  }
}

function lineOf(text, index) {
  return text.slice(0, index).split("\n").length;
}

function allowed(text, match) {
  for (const item of allowExact) {
    const at = text.indexOf(item);
    if (at !== -1 && match.index >= at && match.index < at + item.length) {
      return true;
    }
  }
  return false;
}

const files = [];
for (const root of roots) {
  filesIn(root, files);
}

const hits = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const pattern of patterns) {
    pattern.regex.lastIndex = 0;
    let match = pattern.regex.exec(text);
    while (match) {
      if (!allowed(text, match)) {
        hits.push(`${file}:${lineOf(text, match.index)} [${pattern.label}] ${match[0]}`);
      }
      if (match[0].length === 0) {
        pattern.regex.lastIndex += 1;
      }
      match = pattern.regex.exec(text);
    }
  }
}

if (hits.length > 0) {
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log(`claims ok (${files.length} files)`);
