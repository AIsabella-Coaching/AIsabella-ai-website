@echo off
title AIsabella Design-Modus
color 0A
cls
echo ========================================================
echo   AIsabella Website - Design-Modus
echo ========================================================
echo.
echo   Dieser "Autopilot" sorgt dafuer, dass deine Design-Aenderungen
echo   (Farben, Abstaende, Groessen) sofort sichtbar werden.
echo.
echo   1. Lass dieses schwarze Fenster einfach offen.
echo   2. Arbeite ganz normal an deinen Dateien.
echo   3. Wenn du fertig bist, schliesse dieses Fenster.
echo.
echo   Status: Warte auf Aenderungen...
echo.
.\tailwindcss.exe -i input.css -o tailwind.css --watch