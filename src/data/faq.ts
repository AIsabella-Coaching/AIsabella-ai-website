// Einzige Quelle für die FAQ: FAQ.astro rendert sie sichtbar, BaseLayout erzeugt
// daraus das FAQPage-JSON-LD. So können sichtbarer Text und strukturierte Daten
// nicht mehr auseinanderlaufen.
export interface Faq {
  question: string;
  answer: string[];
}

export const faqs: Faq[] = [
  {
    question: "Für wen ist das Sparring gedacht?",
    answer: [
      "Für Geschäftsführer, Selbstständige und Führungskräfte, die mit KI ernsthaft arbeiten und damit weiterkommen wollen – vom täglichen Handgriff bis zur nächsten Entscheidung.",
      "Wer im Unternehmen bei KI die Richtung vorgeben soll, braucht dafür eigene Erfahrung. Was KI in deiner Rolle und in deinem Alltag leisten kann, findest du am besten heraus, indem du selbst damit arbeitest.",
      "In unserem Sparring bringst du deine Fragen und Themen ein, wir gehen in die Tiefe, wo du in die Tiefe willst und in die Breite, wo es nötig ist."
    ]
  },
  {
    question: "Wann passt das Sparring nicht?",
    answer: [
      "Wenn du dich nur berieseln lassen willst.",
      "Wenn du einen vorgefertigten Tool-Katalog erwartest.",
      "Wenn du erwartest, dass jemand anderer die Auseinandersetzung mit KI für dich übernimmt.",
      "Wenn du dir Automatisierungen bauen oder alles fertig aufsetzen lassen willst."
    ]
  },
  {
    question: "Wozu brauche ich das überhaupt – kann ich mit KI nicht einfach selbst experimentieren?",
    answer: [
      "Selbst auszuprobieren ist der richtige erste Schritt und viele kommen damit auch weit. Was dann kommt, passiert jedoch nicht an einem Wochenende oder nach einem Workshop. Dafür braucht es Übung und Überblick, auch weil laufend neue Funktionen dazukommen.",
      "Oft entscheiden Kleinigkeiten über das Ergebnis, etwa eine Einstellung oder Funktion, die leicht zu übersehen ist. Das kennst du aus deinem eigenen Fachgebiet: Dort erkennst du auch schneller, was andere lange suchen.",
      "Im Sparring wird dein Thema direkt in einen KI-Anwendungsfall übersetzt. Du gewinnst dadurch Zeit, weil du gleich am richtigen Punkt ansetzt."
    ]
  },
  {
    question: "Wie viel Zeit brauche ich dafür neben meiner Arbeit?",
    answer: [
      "Acht Sessions à 60 Minuten, dazu etwas Zeit zwischen den Terminen, um in die Umsetzung zu kommen. Wie viel davon, entscheidest du selbst.",
      "Dass neben der eigentlichen Arbeit kaum Zeit bleibt, sich tiefer mit KI zu beschäftigen und sie zu erkunden, begegnet mir in vielen Gesprächen. Deine Kernkompetenz liegt in deinem Fach und dort brauchst du deine Zeit am meisten. Deshalb bekommst du im Sparring das, was dich gerade weiterbringt, ohne lange selbst danach suchen zu müssen."
    ]
  },
  {
    question: "Was hast du nach dem Sparring, was du jetzt nicht hast?",
    answer: [
      "Vor allem einen praktischen Umgang mit KI in deinem Tagesgeschäft. Du kennst dich grundlegend aus und kannst in Gesprächen darüber mitreden und einordnen, was du hörst.",
      "Und von hier aus gehst du weiter – mit dem Reiz, noch mehr zu entdecken."
    ]
  },
  {
    question: "Wie steht es um Datenschutz und KI?",
    answer: [
      "Im Sparring arbeitest du in deinen eigenen Tools und mit deinen eigenen Konten – Daten aus deinem Unternehmen bleiben somit in deiner Verantwortung.",
      "KI lässt sich auch DSGVO-konform nutzen. Wie das bei dir konkret aussehen kann, ergründen wir gemeinsam."
    ]
  },
  {
    question: "Wie diskret ist das Sparring?",
    answer: [
      "Im 1:1-Sparring bist du mit den Themen, die du einbringst, nicht in einer Gruppe vor anderen und auch nicht in einem Webinar oder Workshop mit etlichen Teilnehmern.",
      "Das macht es möglich, geschäftsinterne Themen und Detailfragen zu besprechen, die in einem Gruppenformat weder zeitlich noch inhaltlich Platz hätten.",
      "Was zwischen uns besprochen wird, bleibt zwischen uns."
    ]
  }
];
