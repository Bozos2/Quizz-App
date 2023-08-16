import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { shuffle } from "../utils/shuffle";

import QuestionsProgressBar from "../utils/QuestionsProgressBar";
import CircleProgressBar from "../utils/CircleProgressBar";

const formatCategoryName = (category) => {
  if (category === "Science Nature") {
    return "science_and_nature";
  } else if (category === "General Knowledge") {
    return "general";
  } else {
    const words = category.split("_");
    const formattedWords = words.map(
      (word) => word.charAt(0).toLowerCase() + word.slice(1)
    );
    return formattedWords.join(" ");
  }
};

function QuestionsPage() {
  const { questionsId } = useParams();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [result, setResult] = useState(0);
  const items = useSelector((state) => state.questions.items);
  const Loading = useSelector((state) => state.ui.isLoading);
  const Id = useSelector((state) => state.auth.id);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [gameXp, setGameXp] = useState(0);

  const percentage = result * 10;

  const filteredQuestions = items.find(
    (questionGroup) => questionGroup.id === +questionsId
  );
  console.log(filteredQuestions);

  const currentQuestion = filteredQuestions.questions[activeQuestionIndex];

  const correctAnswers = filteredQuestions.questions.map(
    (question) => question.correct_answer
  );

  const filteredCategory = formatCategoryName(
    filteredQuestions.questions[0].category
  );
  console.log(filteredCategory);

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

  const handleAnswerClick = (answer) => {
    if (activeQuestionIndex < filteredQuestions.questions.length) {
      if (answer === currentQuestion.correct_answer) {
        setResult((prevResult) => prevResult + 1);
        setGameXp((prevXp) => prevXp + 25);
      } else {
        setGameXp((prevXp) => prevXp + 10);
      }
    }
    handleNextQuestion();
    console.log("correct:", correctAnswers);
    console.log("Xp stanje:", gameXp);
  };

  if (!filteredQuestions) {
    return <div>Invalid questions ID or questions not found.</div>;
  }

  const fetchJwtToken = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/retrieve/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Id,
          }),
        }
      );

      if (!response.ok) {
        console.log("Something went wrong with the token retrieval");
        return;
      }

      const data = await response.json();
      let token = data.token;

      console.log("token", token);

      PatchData(token);
    } catch (err) {
      console.log("Error while fetching JWT token:", err);
    }
  };

  const PatchData = async (token) => {
    console.log("token2", token);
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/configuration/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            game_xp: gameXp,
            category: filteredCategory,
            correct_answers: result,
            incorrect_answers: 10 - result,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log("Something went wrong with the PATCH request");
        return;
      }
    } catch (err) {
      console.log("Error while sending PATCH request:", err);
    }

    handleNextQuestion();
  };

  if (isQuizCompleted) {
    console.log("Quiz completed!");
    console.log("Result:", result);
    fetchJwtToken();
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
                  <h1 className="border border-2 border-purple-700 rounded-full text-3xl text-purple-700 font-bold p-4 dark:border-purple-300 dark:text-purple-300">
                    {activeQuestionIndex + 1} / 10
                  </h1>
                </div>
                <div className="flex justify-center items-center h-[280px] border rounded-2xl border-2 border-purple-700 mt-6 dark:border-purple-300">
                  <h4 className="p-4 text-center text-3xl text-purple-700 font-bold dark:text-purple-300">
                    {currentQuestion.question}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-8">
                  {shuffledAnswers.map((answer, index) => (
                    <Link
                      className="border rounded-2xl p-6 border-purple-700 font-semibold text-purple-700 dark:text-purple-300 dark:border-purple-300"
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
