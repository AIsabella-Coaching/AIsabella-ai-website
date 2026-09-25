// Keine einzelnen Wörter allein in der letzten Zeile (Typografie-Regel, ADR-055).
//
// Nach dem Build wird in jedem Textblock (Absatz, Überschrift, Listenpunkt …)
// das letzte Leerzeichen durch ein geschütztes Leerzeichen (&nbsp;) ersetzt.
// Die letzten zwei Wörter brechen dann nur noch gemeinsam um – in jedem
// Browser und bei jeder Bildschirmbreite. `text-wrap: pretty` allein reicht
// dafür nicht (Chromium lässt längere Einzelwörter stehen, Firefox kennt es nicht).
//
// Geändert werden nur genau diese Leerzeichen; der Rest des HTML bleibt
// Byte für Byte gleich (Positionen aus parse5, keine Neu-Ausgabe des HTML).
// Wirkt nur im Build (live), nicht im Dev-Server.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const TARGETS = new Set(['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'figcaption', 'dd', 'dt']);
const SKIP = new Set(['script', 'style', 'svg', 'template', 'code', 'pre', 'textarea']);
// Obergrenzen, damit zwei verbundene Wörter auch auf schmalen Handys in
// eine Zeile passen (Überschriften sind groß → strengere Grenze).
const MAX_JOINED = { heading: 20, text: 30 };
const MAX_LAST_WORD = 22;
const WS = /[ \t\n\r\f]/;

// Dekodierte Zeichenposition → Rohposition im HTML (Entities zählen als 1 Zeichen).
function rawOffsets(raw) {
  const map = [];
  for (let i = 0; i < raw.length; ) {
    map.push(i);
    if (raw[i] === '&') {
      const end = raw.indexOf(';', i);
      if (end !== -1 && end - i <= 10) { i = end + 1; continue; }
    }
    const cp = raw.codePointAt(i);
    i += cp > 0xffff ? 2 : 1;
  }
  return map;
}

function collectText(node, html, out) {
  for (const child of node.childNodes || []) {
    if (child.nodeName === '#text') {
      const loc = child.sourceCodeLocation;
      if (!loc) continue;
      const raw = html.slice(loc.startOffset, loc.endOffset);
      const offs = rawOffsets(raw);
      // Zeichen einzeln, mit Rohposition und Rohlänge
      const chars = [];
      for (let k = 0; k < offs.length; k++) {
        const start = offs[k];
        const end = k + 1 < offs.length ? offs[k + 1] : raw.length;
        const text = raw.slice(start, end);
        const ch = text === '&nbsp;' || text === '&#160;' ? ' ' : text.startsWith('&') ? '·' : text;
        chars.push({ ch, at: loc.startOffset + start, len: end - start });
      }
      out.push(...chars);
    } else if (child.nodeName === 'br') {
      out.push({ ch: '\n', at: -1, len: 0, br: true });
    } else if (!SKIP.has(child.nodeName)) {
      collectText(child, html, out);
    }
  }
}

function findEdits(node, html, edits) {
  for (const child of node.childNodes || []) {
    if (SKIP.has(child.nodeName)) continue;
    if (TARGETS.has(child.nodeName) && !child.childNodes?.some((c) => TARGETS.has(c.nodeName))) {
      const chars = [];
      collectText(child, html, chars);
      // Ende ohne Leerraum
      let end = chars.length - 1;
      while (end >= 0 && WS.test(chars[end].ch)) end--;
      // letztes Wort
      let i = end;
      while (i >= 0 && !WS.test(chars[i].ch) && !chars[i].br) i--;
      if (i < 0 || chars[i].br) continue; // nur ein Wort oder direkt nach <br>
      const lastWord = chars.slice(i + 1, end + 1).map((c) => c.ch).join('');
      // Leerraum-Lauf vor dem letzten Wort
      let j = i;
      while (j >= 0 && WS.test(chars[j].ch)) j--;
      if (j < 0 || chars[j].br) continue;
      let k = j;
      while (k >= 0 && !WS.test(chars[k].ch) && !chars[k].br) k--;
      const prevWord = chars.slice(k + 1, j + 1).map((c) => c.ch).join('');
      const isHeading = /^h[1-6]$/.test(child.nodeName);
      const limit = isHeading ? MAX_JOINED.heading : MAX_JOINED.text;
      if (lastWord.length > MAX_LAST_WORD || prevWord.length + 1 + lastWord.length > limit) continue;
      // ersten Leerraum → &nbsp;, weitere im selben Lauf entfernen
      const run = chars.slice(j + 1, i + 1).filter((c) => c.at >= 0);
      run.forEach((c, n) => edits.push({ at: c.at, len: c.len, text: n === 0 ? '&nbsp;' : '' }));
    } else {
      findEdits(child, html, edits);
    }
  }
}

export function transformHtml(html) {
  const doc = parse(html, { sourceCodeLocationInfo: true });
  const body = doc.childNodes.find((n) => n.nodeName === 'html')?.childNodes.find((n) => n.nodeName === 'body');
  if (!body) return { html, count: 0 };
  const edits = [];
  findEdits(body, html, edits);
  edits.sort((a, b) => b.at - a.at);
  let out = html;
  for (const e of edits) out = out.slice(0, e.at) + e.text + out.slice(e.at + e.len);
  return { html: out, count: edits.filter((e) => e.text).length };
}

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

export default function noOrphans() {
  return {
    name: 'no-orphans',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        let total = 0;
        for await (const file of htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8');
          const { html: out, count } = transformHtml(html);
          if (count) await writeFile(file, out);
          total += count;
        }
        logger.info(`${total} Textblöcke gegen einzelne Wörter in der letzten Zeile geschützt`);
      },
    },
  };
}
