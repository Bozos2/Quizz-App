import React, { useState } from "react";
import { Form } from "react-router-dom";

import NotificationModal from "../utils/NotificationModal";

import useFormInput from "../hooks/use-FormInput";

function ResetPassword() {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useFormInput((value) => value.includes("@"));

  const [resetPasswordMessage, setResetPasswordMessage] = useState("");
  const [showModal, setShowModal] = useState();

  const emailInputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
    emailInputHasError ? "border-red-400 bg-red-200" : ""
  }`;

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    }

    const formData = {
      email: enteredEmail,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      const { err, msg } = responseData;

      if (err) {
        setResetPasswordMessage("Error:" + msg);
      } else {
        console.log("Uspješan reset:", msg);
        setResetPasswordMessage(msg);
        setShowModal(true);
      }

      resetEmailInput();
    } catch (error) {
      console.log("Greška:", error);
    }
  };

  const modalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center mt-48 h-full">
      <div className="w-full max-w-xs">
        <Form
          className="bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4"
          onSubmit={formSubmissionHandler}
        >
          <div className="mb-4">
            <h1 className="block text-purple-700 text-xl text-center font-bold mb-10 dark:text-purple-600">
              Enter your Email adress
            </h1>
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

          <div className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline">
            <button className="cursor-pointer" type="submit">
              Submit
            </button>
          </div>
          <p className=" p-2 text-sm text-red-400 font-semibold">
            {resetPasswordMessage}
          </p>
        </Form>
        {showModal && (
          <NotificationModal
            title="Password Reset Request"
            messages={resetPasswordMessage}
            onConfirm={modalHandler}
            buttonTitle="Close"
          />
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
