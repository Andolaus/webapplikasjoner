type Category = "sport" | "music" | "movies";

interface Quiz {
  id: string;
  title: string;
  questions: string[];
  answers: Answer[];
  category: Category;
  createdAt?: Date;
}

interface Answer {
  id: number;
  answer: string;
}

const quizzes: Quiz[] = [];

const addQuiz = (data: Quiz) => {
  quizzes.push(data);
};

const getQuizById = (id: string): Quiz | undefined => {
  return quizzes.find((quiz) => quiz.id === id);
};

const filterQuizByCategory = (category: Category): Quiz[] => {
  return quizzes.filter((quiz) => quiz.category === category);
};

const getQuizAnswers = (quizId: string): Answer[] | undefined => {
  const quiz = getQuizById(quizId);
  return quiz ? quiz.answers : undefined;
};

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