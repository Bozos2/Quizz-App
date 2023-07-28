import React, { useState } from "react";
import { Link, Form } from "react-router-dom";

import NotificationModal from "../utils/NotificationModal";

import useFormInput from "../hooks/use-FormInput";

const Signup = () => {
  const [showModal, setShowModal] = useState();
  const [registrationMessage, setRegistrationMessage] = useState("");

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

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useFormInput((value) => value.includes("@"));

  const {
    value: selectedGender,
    isValid: selectedGenderIsValid,
    hasError: genderInputHasError,
    valueChangeHandler: genderChangeHandler,
    inputBlurHandler: genderBlurHandler,
    reset: resetGenderInput,
  } = useFormInput((value) => value !== "");

  const {
    value: selectedDate,
    isValid: selectedDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useFormInput((value) => value !== "");

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredPasswordIsValid &&
    enteredEmailIsValid &&
    selectedGenderIsValid &&
    selectedDateIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    const formData = {
      username: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      gender: selectedGender,
      date_of_birth: selectedDate,
    };
    try {
      const response = await fetch("http://localhost:3001/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      const { err, msg } = responseData;

      if (response.ok) {
        resetNameInput();
        resetPasswordInput();
        resetEmailInput();
        resetGenderInput();
        resetDateInput();
        setShowModal(true);
        setRegistrationMessage(msg);
      } else {
        console.log(err);
      }
    } catch (error) {
      console.log("error with submitting");
    }
  };

  const modalHandler = () => {
    setShowModal(false);
  };

  const nameInputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
    nameInputHasError ? "border-red-400 bg-red-200" : ""
  }`;

  const passwordInputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
    passwordInputHasError ? "border-red-400 bg-red-200" : ""
  }`;

  const emailInputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
    emailInputHasError ? "border-red-400 bg-red-200" : ""
  }`;

  const genderInputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
    genderInputHasError ? "border-red-400 bg-red-200" : ""
  }`;

  const dateInputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
    dateInputHasError ? "border-red-400 bg-red-200" : ""
  }`;

  return (
    <div className="flex justify-center mt-24 p-2">
      <div className="w-full max-w-md">
        <Form
          method="post"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formSubmissionHandler}
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-6 dark:text-purple-600">
            Register
          </h2>
          <div className="mb-4">
            <label
              className="block text-purple-700 text-sm font-semibold mb-2 dark:text-purple-600"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className={nameInputClasses}
              type="text"
              id="username"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
              title="username"
            />
            {nameInputHasError && (
              <p className="text-red-400 font-semibold italic">
                Username must not be empty.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-700 text-sm font-semibold mb-2 dark:text-purple-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={emailInputClasses}
              type="text"
              id="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              title="email"
            />
            {emailInputHasError && (
              <p className="text-red-400 font-semibold italic">
                Email must not be empty.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-700 text-sm font-semibold mb-2 dark:text-purple-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={passwordInputClasses}
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              title="password"
            />
            {passwordInputHasError && (
              <p className="text-red-400 font-semibold italic">
                Password must have more than 6 characters
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-700 text-sm font-semibold mb-2 dark:text-purple-600"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className={genderInputClasses}
              id="gender"
              value={selectedGender}
              onChange={genderChangeHandler}
              onBlur={genderBlurHandler}
              title="gender"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {genderInputHasError && (
              <p className="text-red-400 font-semibold italic">
                U should select one of these options
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-700 text-sm font-semibold mb-2 dark:text-purple-600"
              htmlFor="birthdate"
            >
              Date of Birth
            </label>
            <input
              className={dateInputClasses}
              type="date"
              id="birthdate"
              value={selectedDate}
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
              title="birthdate"
            />
            {dateInputHasError && (
              <p className="text-red-400 font-semibold italic">
                U should select one of these options
              </p>
            )}
          </div>
          <div className="bg-blue-500 hover:bg-blue-700 text-white text-center font-semibold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline">
            <button
              className="cursor-pointer"
              type="submit"
              disabled={!formIsValid}
            >
              Submit
            </button>
          </div>
          <div className="mt-5 text-sm text-center">
            <p>
              Have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold">
                Log in
              </Link>
            </p>
          </div>
        </Form>
        {showModal && (
          <NotificationModal
            title="Registration status"
            messages={registrationMessage}
            onConfirm={modalHandler}
            buttonTitle="Close"
          />
        )}
      </div>
    </div>
  );
};

export default Signup;
