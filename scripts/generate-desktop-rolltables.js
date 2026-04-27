const fs = require("fs");
const path = require("path");

const sourceDir = "C:/Users/jesp0/Desktop/Rolltables";
const sources = [
  { file: "Hustles.txt", category: "Hustles", folder: "Hustles" },
  { file: "Gang generators.txt", category: "Factions", folder: "Factions and Gangs" },
  { file: "Location generators.txt", category: "Locations", folder: "Locations and Scenes" },
  { file: "What's is.txt", category: "CorporateLoot", folder: "Corporate, Loot, and Jobs" },
  { file: "vendits.txt", category: "Whats", folder: "What's..?" },
  { file: "file.txt", category: "Whats", folder: "What's..?", title: "What's in the File?" },
];

function decodeSource(filePath) {
  const buffer = fs.readFileSync(filePath);
  const utf8 = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
  return /[âÃ]/.test(utf8) ? new TextDecoder("windows-1252").decode(buffer) : utf8;
}

function cleanTitle(value) {
  return value
    .replace(/^Random tables for generating\s+/i, "")
    .replace(/[.]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function makeKey(parts, used) {
  const base = parts.join(" ")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^A-Za-z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[^A-Za-z]+/, "")
    .replace(/[^A-Za-z0-9]+$/g, "")
    .replace(/^./, (char) => char.toLowerCase()) || "desktopTable";
  let key = base;
  let suffix = 2;
  while (used.has(key)) {
    key = `${base}${suffix}`;
    suffix += 1;
  }
  used.add(key);
  return key;
}

function parseRange(token) {
  const match = String(token).trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2] ?? match[1])];
}

function cleanText(value) {
  return value
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/â€”/g, "—")
    .replace(/Ã±/g, "ñ")
    .replace(/from of main streets/g, "from main streets")
    .replace(/dealermaking/g, "dealer making")
    .replace(/\s+/g, " ")
    .trim();
}

function describe(columns, headers) {
  const values = columns.map(cleanText).filter(Boolean);
  if (values.length <= 1) return values[0] || "";
  return values.map((value, index) => {
    const header = headers[index + 1];
    return header && !/^result\s*\d*$/i.test(header) ? `${header}: ${value}` : value;
  }).join(" / ");
}

function formulaFor(title, rows) {
  const lower = title.toLowerCase();
  const max = rows.reduce((highest, row) => Math.max(highest, row.range[1]), 0);
  if (max > 60 || lower.includes("1d100")) return "1d100";
  if (lower.includes("1d6 + 1d10") || lower.includes("1d60")) return "1d60";
  if (lower.includes("1d6")) return "1d6";
  return "1d10";
}

function d6d10Range(band, d10) {
  const width = band[1] - band[0] + 1;
  const offset = band[0] > 3 ? 30 : 0;
  return [offset + ((d10 - 1) * width) + 1, offset + (d10 * width)];
}

function addTable(output, used, source, blockTitle, tableTitle, rows) {
  const filteredRows = rows.filter((row) => row.text && row.text !== "Choose From This List / Choose From This List / Choose From This List");
  if (!filteredRows.length) return;
  const block = cleanTitle(blockTitle || source.file.replace(/\.txt$/i, ""));
  const table = cleanTitle(tableTitle || block);
  output.push({
    key: makeKey([source.category, block, table], used),
    category: source.category,
    folder: source.folder,
    name: table.toLowerCase() === block.toLowerCase() ? block : `${block} - ${table}`,
    formula: formulaFor(table, filteredRows),
    results: filteredRows,
  });
}

function parseSource(source, used) {
  const lines = decodeSource(path.join(sourceDir, source.file)).replace(/^\uFEFF/, "").split(/\r?\n/);
  const output = [];
  let blockTitle = source.title || source.file.replace(/\.txt$/i, "");
  let tableTitle = null;
  let rows = [];
  let headers = [];
  let band = null;
  let formulaHint = "";
  let pendingRange = null;
  let continuation = 2;

  function finish() {
    addTable(output, used, source, blockTitle, tableTitle, rows);
    rows = [];
    headers = [];
    band = null;
    formulaHint = "";
    pendingRange = null;
  }

  function start(title, hint = "") {
    finish();
    tableTitle = title;
    formulaHint = hint;
    continuation = 2;
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (/^Random tables for generating/i.test(line)) {
      finish();
      blockTitle = source.title || line;
      tableTitle = null;
      continue;
    }

    const heading = line.match(/^(.+?)\s*\[([^\]]+)\]$/);
    if (heading && !/^Roll\b/i.test(line)) {
      start(`${heading[1].trim()} [${heading[2].trim()}]`, heading[2].trim());
      continue;
    }

    if (/^Hustle Chart/i.test(line)) {
      start("Hustle Chart [1d10]", "1d10");
      continue;
    }

    const rollColumns = raw.split("\t").map((value) => value.trim()).filter(Boolean);
    if (/^Roll\b/i.test(line) && rollColumns.length === 2 && !/^result\b/i.test(rollColumns[1])) {
      start(rollColumns[1]);
      continue;
    }

    if (/^Roll\b/i.test(line) || /^1d6\b/i.test(line)) {
      const columns = raw.split("\t").map((value) => value.trim()).filter(Boolean);
      if (columns.length > 1) headers = columns;
      continue;
    }

    if (!tableTitle && /^\d+(?:\s*-\s*\d+)?\t/.test(raw)) start(blockTitle);

    const columns = raw.split("\t").map((value) => value.trim());
    const firstRange = parseRange(columns[0]);
    if (firstRange && columns.length >= 2) {
      const secondRange = parseRange(columns[1]);
      const isD6D10 = /1d6\s*\+\s*1d10/i.test(formulaHint || tableTitle || "");
      let range = firstRange;
      let textColumns = columns.slice(1);
      if (secondRange && isD6D10) {
        band = firstRange;
        range = d6d10Range(band, secondRange[0]);
        textColumns = columns.slice(2);
      } else if (band && isD6D10) {
        range = d6d10Range(band, firstRange[0]);
      } else if (rows.length && firstRange[0] < rows[rows.length - 1].range[0] && rows[rows.length - 1].range[1] >= 50) {
        finish();
        tableTitle = `${cleanTitle(blockTitle)} ${continuation}`;
        continuation += 1;
      }
      rows.push({ range, text: describe(textColumns, headers) });
      pendingRange = null;
      continue;
    }

    if (firstRange) {
      const isD6D10 = /1d6\s*\+\s*1d10/i.test(formulaHint || tableTitle || "");
      pendingRange = band && isD6D10 ? d6d10Range(band, firstRange[0]) : firstRange;
      continue;
    }

    if (raw.startsWith("\t") && rows.length) {
      const text = cleanText(columns.filter(Boolean).join(" / "));
      if (pendingRange) {
        rows.push({ range: pendingRange, text });
        pendingRange = null;
      } else if (text) {
        rows[rows.length - 1].text = `${rows[rows.length - 1].text} / ${text}`;
      }
    }
  }
  finish();
  return output;
}

const used = new Set();
const entries = sources.flatMap((source) => parseSource(source, used));
const tableObject = Object.fromEntries(entries.map(({ key, ...table }) => [key, table]));
const groups = [
  ["Role Hustles", "Downtime job tables for Cyberpunk RED roles, imported from Hustles.txt.", "Hustles"],
  ["Factions and Gangs", "Road gangs, city gangs, organized crime, cults, and strange crews.", "Factions"],
  ["Locations and Scenes", "Clubs, bodegas, pop-up markets, alleys, downtown blocks, and other scene dressing.", "Locations"],
  ["Corporate, Loot, and Jobs", "Corporate industries, civic bodies, computer finds, loot, job complications, and vendit inventory.", "CorporateLoot"],
  ["What's..?", "Vendit inventory and other what-is-it chained generators.", "Whats"],
].map(([label, description, category]) => ({
  label,
  description,
  tableKeys: entries.filter((entry) => entry.category === category).map((entry) => entry.key),
}));

const contents = `/* eslint-disable max-len */\n\n// Generated from C:/Users/jesp0/Desktop/Rolltables/*.txt.\n// Keep this file as data only; edit the source txt files and regenerate when adding large table drops.\n\nexport const DESKTOP_ROLLTABLES = ${JSON.stringify(tableObject, null, 2)};\n\nexport const DESKTOP_TABLE_GROUPS = ${JSON.stringify(groups, null, 2)};\n`;
fs.writeFileSync("scripts/desktop-rolltables.js", contents, "utf8");
console.log(`Generated ${entries.length} tables`);
console.log(groups.map((group) => `${group.label}: ${group.tableKeys.length}`).join("\n"));
