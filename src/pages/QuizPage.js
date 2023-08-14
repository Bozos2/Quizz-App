import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Card from "../utils/Card";
import CategoriesBar from "../components/CategoriesBar";
import RegisterMessage from "../utils/RegisterMessage";
import { fetchQuestionData } from "../store/question-actions";
import DifficultyStars from "../assets/DifficultyStars";

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
            <div className="flex justify-center font-poppins">
              <ul className=" grid grid-cols-4 gap-4 mb-20">
                {filteredCategory.map((questionGroup) => (
                  <Card
                    category={questionGroup.questions[0].category}
                    key={questionGroup.id}
                  >
                    <li className="flex flex-col justify-between z-20 h-72 ">
                      <div className="flex flex-row justify-between">
                        <p className="text-white mt-2">Difficulty:</p>
                        <span className="mt-2 p-1">
                          <DifficultyStars
                            difficulty={questionGroup.questions[0].difficulty}
                          />
                        </span>
                      </div>
                      <h2 className="text-3xl font-semibold mt-20 px-2  text-white tracking-wide">
                        {questionGroup.questions[0].category}
                      </h2>

                      <Link
                        to={{
                          pathname: `/quizpage/${questionGroup.questions[0].category}/${questionGroup.id}`,
                        }}
                        onClick={() => questionsHandler(questionGroup.id)}
                        className="border  rounded-2xl py-1.5 px-12  mx-2 bg-white text-black  mb-2 text-center hover:bg-zinc-300 hover:border-zinc-300 "
                      >
                        Start
                      </Link>
                    </li>
                  </Card>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {!isAuth && <RegisterMessage />}
    </>
  );
}

export default QuizPage;
