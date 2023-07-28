import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Card from "../utils/Card";
import CategoriesBar from "../components/CategoriesBar";
import RegisterMessage from "../utils/RegisterMessage";
import { fetchQuestionData } from "../store/question-actions";

import "../input.css";

function QuizPage() {
  const dispatch = useDispatch();
  const [filteredCategory, setFilteredCategory] = useState([]);
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.ui.isLoading);
  const items = useSelector((state) => state.questions.items);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchQuestionData());
  }, [dispatch]);

  console.log(items);
  useEffect(() => {
    if (categoryId) {
      const filtered = items.filter((questionGroup) =>
        questionGroup.questions.some(
          (question) => question.category === categoryId
        )
      );
      setFilteredCategory(filtered);
    } else {
      setFilteredCategory(items);
    }
  }, [categoryId, items]);

  const handleCategoryClick = (category) => {
    navigate(`/quizpage/${category}`);
  };

  const questionsHandler = (questionsId) => {
    navigate(`/quizpage/${categoryId}/${questionsId}`);
  };

  return (
    <>
      {isAuth && (
        <div>
          <CategoriesBar
            categoryId={categoryId}
            onCategoryClick={handleCategoryClick}
          />
          {Loading ? (
            <div className="font-bold text-4xl text-center text-purple-700 mt-48">
              Loading <span className="text-orange-400">...</span>
            </div>
          ) : (
            <ul className="flex justify-evenly flex-wrap">
              {filteredCategory.map((questionGroup) => (
                <Card
                  category={questionGroup.questions[0].category}
                  key={questionGroup.id}
                >
                  <li className="flex flex-col items-center justify-evenly h-72">
                    <h2 className="text-3xl font-medium text-center font-mono text-white tracking-wide">
                      {questionGroup.questions[0].category}
                    </h2>
                    <h3 className="font-semibold text-white font-mono text-lg font-mono">
                      Difficulty:{" "}
                      <span className="text-bold text-yellow-500">
                        {questionGroup.questions[0].difficulty}
                      </span>
                    </h3>
                    <Link
                      to={{
                        pathname: `/quizpage/${questionGroup.questions[0].category}/${questionGroup.id}`,
                      }}
                      onClick={() => questionsHandler(questionGroup.id)}
                      className="border border-blue-700 rounded-2xl py-1 px-12  bg-blue-600 text-white font-semibold hover:bg-blue-900 hover:border-blue-900 "
                    >
                      Start
                    </Link>
                  </li>
                </Card>
              ))}
            </ul>
          )}
        </div>
      )}
      {!isAuth && <RegisterMessage />}
    </>
  );
}

export default QuizPage;
