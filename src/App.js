import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import QuizPage from "./pages/QuizPage";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import QuestionsPage from "./pages/QuestionsPage";
import ResetPassword from "./pages/ResetPassword";
import MyProfile from "./pages/MyProfile";

import "./input.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <Signup /> },
      {
        path: "quizpage",
        element: <QuizPage />,
      },
      {
        path: "quizpage/:categoryId",
        element: <QuizPage />,
      },
      { path: "quizpage/:categoryId/:questionsId", element: <QuestionsPage /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "profile/:usernameId", element: <MyProfile /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
