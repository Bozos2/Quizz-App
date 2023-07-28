import React from "react";
import { NavLink } from "react-router-dom";

function CategoriesBar({ categoryId, onCategoryClick }) {
  function handleCategoryClick(category) {
    onCategoryClick(category);
  }

  return (
    <div className="max-w-3xl mx-auto my-20 flex flex-wrap justify-center">
      <div className="flex flex-wrap justify-center gap-2 w-full">
        <NavLink
          to="/quizpage/General Knowledge"
          isActive={() => categoryId === "General Knowledge"}
          onClick={() => handleCategoryClick("General Knowledge")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          General
        </NavLink>
        <NavLink
          to="/quizpage/Sports"
          onClick={() => handleCategoryClick("Sports")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Sports
        </NavLink>
        <NavLink
          to="/quizpage/Animals"
          isActive={() => categoryId === "Animals"}
          onClick={() => handleCategoryClick("Animals")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Animals
        </NavLink>
        <NavLink
          to="/quizpage/Mythology"
          isActive={() => categoryId === "Mythology"}
          onClick={() => handleCategoryClick("Mythology")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Mythology
        </NavLink>
        <NavLink
          to="/quizpage/Geography"
          isActive={() => categoryId === "Geography"}
          onClick={() => handleCategoryClick("Geography")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Geography
        </NavLink>
        <NavLink
          to="/quizpage/History"
          isActive={() => categoryId === "History"}
          onClick={() => handleCategoryClick("History")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          History
        </NavLink>
        <NavLink
          to="/quizpage/Politics"
          isActive={() => categoryId === "Politics"}
          onClick={() => handleCategoryClick("Politics")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Politics
        </NavLink>
        <NavLink
          to="/quizpage/Science Nature"
          isActive={() => categoryId === "Science Nature"}
          onClick={() => handleCategoryClick("Science Nature")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Science & Nature
        </NavLink>
        <NavLink
          to="/quizpage/Film"
          isActive={() => categoryId === "Film"}
          onClick={() => handleCategoryClick("Film")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Film
        </NavLink>
        <NavLink
          to="/quizpage/Music"
          isActive={() => categoryId === "Music"}
          onClick={() => handleCategoryClick("Music")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Music
        </NavLink>
        <NavLink
          to="/quizpage/Books"
          isActive={() => categoryId === "Books"}
          onClick={() => handleCategoryClick("Books")}
          className={({ isActive }) =>
            isActive
              ? "text-base font-bold underline text-purple-800 rounded-2xl border-2  border-purple-800 py-2 px-6  dark:text-purple-300 dark:border-purple-300"
              : "no-underline text-base font-semibold text-purple-700 border-purple-700 border py-2 px-6 rounded-2xl dark:text-purple-400 dark:border-purple-400"
          }
        >
          Books
        </NavLink>
      </div>
    </div>
  );
}

export default CategoriesBar;
