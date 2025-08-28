interface Quiz {
    id: number;
    question: string;
    options: string[] | number[];
    answer: string | number | (string | number)[];
}

const firstSampleQuiz: Quiz = {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
};

const secondSampleQuiz: Quiz = {
    id: 2,
    question: "What is the best food?",
    options: ["Spaghetti", "Pizza", "Taco", "Sushi"],
    answer: ["Pizza", "Sushi"]
};

console.log(firstSampleQuiz)
console.log(secondSampleQuiz)