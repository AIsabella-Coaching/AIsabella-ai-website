// „Stand: Monat Jahr“ für Rechtstexte (ADR-009, Nachtrag 28.09.2026).
//
// Maßgeblich ist die letzte Änderung an der Datei, deren Commit-Titel mit
// „recht(“ beginnt – diese Kennung tragen nur inhaltliche Änderungen an
// Rechtstexten. Schreibweise, Satzzeichen, Layout und Formatierung
// (style/fix/typo …) verändern das Datum nicht.
// BASIS = letzter inhaltlicher Stand vor Einführung der Kennung; gilt auch,
// wenn Git nicht verfügbar ist.
import { execFileSync } from 'node:child_process';

const BASIS = { jahr: 2026, monat: 9 };
const MONATE = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

/** @param {string} datei Pfad relativ zum Projektordner, z. B. 'src/pages/privacy.astro' */
export function rechtstextStand(datei) {
  let { jahr, monat } = BASIS;
  let quelle = 'Basis';
  try {
    if (git(['rev-parse', '--is-shallow-repository']) === 'true') {
      console.warn(`[rechtstext-stand] Achtung: unvollständige Git-Historie – ${datei} fällt ggf. auf die Basis zurück`);
    }
    const iso = git(['log', '-1', '--format=%aI', '--grep=^recht(', '--', datei]);
    if (iso) {
      const teile = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vienna', year: 'numeric', month: 'numeric' }).formatToParts(new Date(iso));
      const j = Number(teile.find((t) => t.type === 'year').value);
      const m = Number(teile.find((t) => t.type === 'month').value);
      if (j * 12 + m > jahr * 12 + monat) {
        jahr = j;
        monat = m;
        quelle = 'recht-Commit';
      }
    }
  } catch {
    quelle = 'Basis (Git nicht verfügbar)';
  }
  const stand = `${MONATE[monat - 1]} ${jahr}`;
  console.log(`[rechtstext-stand] ${datei}: ${stand} (${quelle})`);
  return stand;
}
