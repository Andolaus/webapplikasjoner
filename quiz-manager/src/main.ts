/**
 * Vi definerer en typealias "Category" som er en såkalt "union type".
 * Det betyr at en Category kun kan være en av de tre oppgitte strengene.
 * Dette gir typesikkerhet når vi filtrerer eller oppretter quizer.
 */
type Category = "sport" | "music" | "movies";

/**
 * "Answer" beskriver ett enkelt svaralternativ (eller et registrert svar),
 * med en numerisk id og selve svaret som tekst.
 */
interface Answer {
  id: number;     // Unik identifikator for svaret (kan være løpenummer)
  answer: string; // Selve svaret/teksten
}

/**
 * "Quiz" beskriver strukturen for en quiz.
 * - id: unik identifikator (string for fleksibilitet, f.eks. UUID)
 * - title: visningsnavn på quizen
 * - questions: liste med spørsmålstekster
 * - answers: liste med Answer-objekter (f.eks. innsendte svar)
 * - category: hvilken kategori quizen tilhører (må være av typen Category)
 * - createdAt: valgfelt (kan være undefined) for opprettelsestidspunkt
 */
interface Quiz {
  id: string;
  title: string;
  questions: string[];
  answers: Answer[];
  category: Category;
  createdAt?: Date; // "?" gjør feltet valgfritt
}

/**
 * Her har vi en enkel in-memory "database": et array som lagrer alle quizer.
 * Merk: siden dette bare er i minnet, forsvinner data når prosessen stopper.
 */
const quizzes: Quiz[] = [];

/**
 * addQuiz
 * Legger til en ny quiz i lagringen.
 * @param data Hele Quiz-objektet som skal legges inn.
 * Sideeffekt: muterer (pusher til) det globale quizzes-arrayet.
 */
const addQuiz = (data: Quiz) => {
  quizzes.push(data);
};

/**
 * getQuizById
 * Slår opp en quiz basert på id.
 * @param id Id-en vi vil finne.
 * @returns Enten Quiz-objektet hvis funnet, ellers undefined.
 *
 * Implementasjon:
 * - Array.prototype.find returnerer første element som matcher predikatet,
 *   eller undefined hvis ingen match finnes.
 */
const getQuizById = (id: string): Quiz | undefined => {
  return quizzes.find((quiz) => quiz.id === id);
};

/**
 * filterQuizByCategory
 * Filtrerer alle quizer som tilhører en bestemt kategori.
 * @param category Kategori å filtrere på ("sport" | "music" | "movies").
 * @returns En ny liste med quizer som matcher kategorien (kan være tom).
 *
 * Implementasjon:
 * - Array.prototype.filter returnerer alle elementer som matcher predikatet.
 * - Vi sammenligner quiz.category med innsendt kategori.
 */
const filterQuizByCategory = (category: Category): Quiz[] => {
  return quizzes.filter((quiz) => quiz.category === category);
};

/**
 * getQuizAnswers
 * Henter alle svar knyttet til en gitt quiz-id.
 * @param quizId Id til quizen vi vil hente svar for.
 * @returns
 *  - Answer[] hvis quizen finnes,
 *  - ellers undefined (dersom getQuizById ikke finner noe).
 *
 * Merk:
 * - Ved å returnere undefined kan kallende kode skille mellom
 *   "quizen finnes ikke" (undefined) og "quizen finnes men har 0 svar" ([]).
 */
const getQuizAnswers = (quizId: string): Answer[] | undefined => {
  const quiz = getQuizById(quizId);
  return quiz ? quiz.answers : undefined;
};

/**
 * printQuizAnswersCount
 * Lager en menneskelesbar tekstoversikt over hvor mange svar hver quiz har.
 * @returns En enkelt streng der hver quiz vises på sin egen linje,
 *   i formatet:
 *   "Quiz ID: <id>, Answers Count: <antall>"
 *
 * Implementasjon:
 * - Vi mapper over alle quizer.
 * - For hver quiz henter vi svarene via getQuizAnswers(quiz.id).
 * - Hvis getQuizAnswers returnerer undefined betyr det at quizen ikke finnes
 *   (teoretisk sett skal det ikke skje når vi henter id fra det samme arrayet),
 *   og vi viser da 0 som antall for å være robust.
 * - Til slutt slår vi sammen linjene med "\n".
 */
const printQuizAnswersCount = () => {
  return quizzes
    .map((quiz) => {
      const answers = getQuizAnswers(quiz.id);
      return `Quiz ID: ${quiz.id}, Answers Count: ${
        answers ? answers.length : 0
      }`;
    })
    .join("\n");
};

/* -----------------------------------------------------------
 * EKSEMPEL PÅ BRUK (kan fjernes i produksjon):
 *
 * addQuiz({
 *   id: "q1",
 *   title: "Fotball-quiz",
 *   questions: ["Hvem vant VM 2018?"],
 *   answers: [{ id: 1, answer: "Frankrike" }],
 *   category: "sport",
 *   createdAt: new Date(),
 * });
 *
 * console.log(getQuizById("q1"));                 // -> Quiz-objekt eller undefined
 * console.log(filterQuizByCategory("sport"));     // -> [Quiz, ...]
 * console.log(getQuizAnswers("q1"));              // -> Answer[] eller undefined
 * console.log(printQuizAnswersCount());           // -> "Quiz ID: q1, Answers Count: 1"
 * ----------------------------------------------------------- */
