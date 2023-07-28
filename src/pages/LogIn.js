import React, { useState } from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useFormInput from "../hooks/use-FormInput";
import { authActions } from "../store/auth";

const LogIn = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useFormInput((value) => value.length > 6);

  const [loginMessage, setLoginMessage] = useState("");

  let formIsValid = false;

  if (enteredNameIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredPasswordIsValid) {
      return;
    }

    const formData = {
      username: enteredName,
      password: enteredPassword,
    };

    try {
      const response = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      console.log("response:", responseData);

      console.log("id:", responseData.result._id);

      const { err, msg, result } = responseData;

      if (err) {
        setLoginMessage("Error:" + msg);
      } else {
        console.log("Uspješna prijava:", msg);
        console.log("Podaci korisnika:", result);
        dispatch(
          authActions.login({ user: enteredName, id: responseData.result._id })
        );
        navigate("/quizpage");
      }

      resetNameInput();
      resetPasswordInput();
    } catch (error) {
      console.log("Greška:", error);
    }
  };

  const nameInputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
    nameInputHasError ? "border-red-400 bg-red-200" : ""
  }`;

  const passwordInputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
    passwordInputHasError ? "border-red-400 bg-red-200" : ""
  }`;

  return (
    <div className="flex justify-center mt-48 h-full">
      <div className="w-full max-w-xs">
        <Form
          className="bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4"
          onSubmit={formSubmissionHandler}
        >
          <div className="mb-4">
            <h1 className="block text-purple-700 text-3xl text-center font-bold mb-10 dark:text-purple-600">
              Login
            </h1>
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-700 text-xl font-bold mb-2 dark:text-purple-600"
              htmlFor="name"
            >
              Your Username
            </label>
            <input
              className={nameInputClasses}
              type="text"
              id="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
            {nameInputHasError && (
              <p className="text-red-400 font-semibold italic">
                Username must not be empty.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-purple-700 text-xl font-bold mb-2 dark:text-purple-600"
              htmlFor="password"
            >
              Your Password
            </label>
            <input
              className={passwordInputClasses}
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
            />
            {passwordInputHasError && (
              <p className="text-red-400 font-semibold italic">
                Please enter a valid password.
              </p>
            )}
          </div>
          <div className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline">
            <button
              className="cursor-pointer"
              type="submit"
              disabled={!formIsValid}
            >
              Submit
            </button>
          </div>
          <div className="mt-4 text-sm text-center">
            <p className=" p-2 text-base text-red-400 font-semibold">
              {loginMessage}
            </p>
            <Link to="/resetpassword" className="text-blue-600 font-bold ">
              Forgot Password?
            </Link>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
