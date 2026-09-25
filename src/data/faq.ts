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
      "Für Geschäftsführer, Selbstständige und Führungskräfte, die mit KI ernsthaft arbeiten und damit weiterkommen wollen – von der nächsten Entscheidung bis zum täglichen Handgriff.",
      "In unserem Sparring bringst du deine Themen ein, du gehst in die Tiefe, wo du in die Tiefe willst und in die Breite, wo es nötig ist. Hier passt sich das Sparring an dich an, nicht du dich an ein vorgegebenes Format."
    ]
  },
  {
    question: "Wann passt das Sparring nicht?",
    answer: [
      "Wenn du dich nur berieseln lassen willst.",
      "Wenn du einen vorgefertigten Tool-Katalog erwartest.",
      "Wenn du erwartest, dass jemand anderer die Auseinandersetzung mit KI für dich übernimmt."
    ]
  },
  {
    question: "Wozu brauche ich das überhaupt – kann ich mit KI nicht einfach selbst experimentieren?",
    answer: [
      "Selbst auszuprobieren ist der richtige erste Schritt und viele kommen damit auch weit. Was dann kommt, passiert jedoch nicht an einem Wochenende oder nach einem Workshop: das maximale Potenzial herauszuholen, das KI für dich und dein Tagesgeschäft bietet, ist eine Frage von Praxis, Auseinandersetzung und Überblick.",
      "Genau das passiert im Sparring. Dein Thema wird direkt in einen KI-Anwendungsfall übersetzt. Du gewinnst dadurch Zeit, weil du gleich am richtigen Punkt ansetzt."
    ]
  },
  {
    question: "Acht Sessions in zwölf Wochen – was hast du danach, was du jetzt nicht hast?",
    answer: [
      "Vor allem einen praktischen Umgang mit KI in deinem Tagesgeschäft. KI ist fester Bestandteil deiner Arbeitsweise geworden.",
      "Themen, Ideen und Aufgaben, die du bisher als zu mühsam, zu teuer oder zu zeitaufwendig erachtet und daher immer wieder aufgeschoben hast, werden plötzlich machbar.",
      "Du arbeitest eigenständig daran und erschließt dir immer wirkungsvollere, weiterreichende und durchdachtere Anwendungsfälle.",
      "Du kennst dich grundlegend aus, weißt wie du KI für dich einsetzt und kannst in Gesprächen darüber mitreden und einordnen, was du hörst.",
      "Und von hier aus gehst du weiter und nutzt dieses Momentum für dich – mit dem Reiz, noch mehr zu entdecken."
    ]
  },
  {
    question: "Wie steht es um Datenschutz und KI?",
    answer: [
      "Im Sparring arbeitest du in deinen eigenen Tools und mit deinen eigenen Konten – Daten aus deinem Unternehmen bleiben somit in deiner Hand und in deiner Verantwortung.",
      "Man kann KI auch DSGVO-konform nutzen. Wie und welche Tools im Speziellen zu dir passen, ergründen wir gemeinsam."
    ]
  },
  {
    question: "Wie diskret ist das Sparring?",
    answer: [
      "Im 1:1-Sparring bist du mit den Themen, die du einbringst, nicht in einer Gruppe vor anderen und auch nicht in einem Webinar oder Workshop mit etlichen Teilnehmern.",
      "Das macht es möglich, geschäftsinterne Themen, konkrete Beispiele und Detailfragen zu besprechen, die in einem Gruppen-Format weder zeitlich noch inhaltlich Platz hätten.",
      "Was zwischen uns besprochen wird, bleibt zwischen uns."
    ]
  }
];
