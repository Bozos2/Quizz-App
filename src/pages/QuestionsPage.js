import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { shuffle } from "../utils/shuffle";

import QuestionsProgressBar from "../utils/QuestionsProgressBar";
import CircleProgressBar from "../utils/CircleProgressBar";

function QuestionsPage() {
  const { questionsId } = useParams();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [result, setResult] = useState(0);
  const items = useSelector((state) => state.questions.items);
  const Loading = useSelector((state) => state.ui.isLoading);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const percentage = result * 10;

  const filteredQuestions = items.find(
    (questionGroup) => questionGroup.id === +questionsId
  );
  console.log(filteredQuestions);

  const currentQuestion = filteredQuestions.questions[activeQuestionIndex];

  const correctAnswers = filteredQuestions.questions.map(
    (question) => question.correct_answer
  );

  const handleNextQuestion = useCallback(() => {
    if (activeQuestionIndex + 1 === filteredQuestions.questions.length) {
      setIsQuizCompleted(true);
      return;
    }
    setActiveQuestionIndex((prevIndex) => prevIndex + 1);
  }, [activeQuestionIndex, filteredQuestions.questions.length]);

  useEffect(() => {
    const answers = shuffle([
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ]);
    setShuffledAnswers(answers);
  }, [currentQuestion]);

  useEffect(() => {
    if (isQuizCompleted) {
      console.log("Quiz completed!");
      console.log("Result:", result);
      handleNextQuestion();
    }
  }, [isQuizCompleted, result, handleNextQuestion]);

  const handleAnswerClick = (answer) => {
    if (activeQuestionIndex < filteredQuestions.questions.length) {
      if (answer === currentQuestion.correct_answer) {
        setResult((prevResult) => prevResult + 1);
      }
    }
    handleNextQuestion();
    console.log("correct:", correctAnswers);
  };

  if (!filteredQuestions) {
    return <div>Invalid questions ID or questions not found.</div>;
  }

  return (
    <>
      {Loading ? (
        <div className="font-bold text-4xl text-center text-purple-700 mt-48">
          Loading <span className="text-orange-400">...</span>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-[900px] flex flex-col text-center mt-20">
            {!isQuizCompleted && (
              <>
                <div className="flex justify-center items-center">
                  <h1 className="border border-2 border-purple-700 rounded-full text-3xl text-purple-700 font-bold p-4">
                    {activeQuestionIndex + 1} / 10
                  </h1>
                </div>
                <div className="flex justify-center items-center h-[280px] border rounded-2xl border-2 border-purple-700 mt-6">
                  <h4 className="p-4 text-center text-3xl text-purple-700 font-bold">
                    {currentQuestion.question}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-8">
                  {shuffledAnswers.map((answer, index) => (
                    <Link
                      className="border rounded-2xl p-6 border-purple-700 font-semibold text-purple-700"
                      key={index}
                      onClick={() => handleAnswerClick(answer)}
                    >
                      {answer}
                    </Link>
                  ))}
                </div>
                <QuestionsProgressBar currentIndex={activeQuestionIndex} />
              </>
            )}
            {isQuizCompleted && (
              <CircleProgressBar
                percentage={percentage}
                text={percentage}
                isQuizCompleted={isQuizCompleted}
                correctAnswers={correctAnswers}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionsPage;
