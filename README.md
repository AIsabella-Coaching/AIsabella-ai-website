# AIsabella Website Project

## Technische Übersicht
Dieses Projekt ist eine statische HTML-Webseite, die **Tailwind CSS** für das Styling verwendet.

### Wichtige Dateien
- `index.html`, `privacy.html`, etc.: Die eigentlichen Webseiten.
- `tailwind.css`: Die generierte CSS-Datei (bitte nicht manuell bearbeiten!).
- `input.css`: Die Quelle für Tailwind (hier können eigene CSS-Regeln rein).
- `tailwindcss.exe`: Das Programm, das aus `input.css` und den HTML-Dateien die fertige `tailwind.css` baut.
- `design-modus_starten.bat`: Ein Skript für den "Watch-Mode" (automatische Aktualisierung bei Änderungen).

### Anleitung für Änderungen
Siehe Datei `ANLEITUNG_DESIGN.txt`.

### Für Entwickler / KI-Assistenten
Das Projekt nutzt die Standalone CLI von Tailwind CSS, da keine Node.js Umgebung vorausgesetzt wird.
Build-Command: `.\tailwindcss.exe -i input.css -o tailwind.css --minify`
Watch-Command: `.\tailwindcss.exe -i input.css -o tailwind.css --watch`
