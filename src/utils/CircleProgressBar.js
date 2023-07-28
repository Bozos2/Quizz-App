import React, { useState, useEffect } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { Link } from "react-router-dom";

import NotificationModal from "./NotificationModal";

const needDominantBaselineFix = true;

function CircleProgressBar(props) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [value, setValue] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showModal, setShowModal] = useState();

  useEffect(() => {
    if (props.isQuizCompleted) {
      setShouldAnimate(true);
      setValue(props.percentage);
      setCorrectAnswers(props.correctAnswers);
    }
  }, [props.isQuizCompleted, props.percentage, props.correctAnswers]);

  const allCorrectAnswers = correctAnswers.map((answer, index) => (
    <div key={index} className="text-white px-20">
      <p className="text-lg font-bold">{index + 1}.</p>
      <p className="font-normal text-sm">
        <span className="font-semibold">answer:</span> {answer}
      </p>
    </div>
  ));

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center ">
      <h2 className="text-3xl text-purple-700 font-bold mb-6">
        Congratulations your quiz is finished!
      </h2>
      <h4 className="mb-16 text-purple-700 font-bold text-2xl">Result:</h4>
      <div className="w-96 h-96 mb-16">
        <CircularProgressbarWithChildren
          value={value}
          text={
            <tspan
              dy={needDominantBaselineFix ? 7 : 0}
              textAnchor="middle"
            >{`${props.text}%`}</tspan>
          }
          styles={buildStyles({
            strokeLinecap: "round",
            textSize: "28px",
            pathTransitionDuration: shouldAnimate ? 2.7 : 0,
            pathColor: `rgb(123, 31, 162)`,
            textColor: "#7B1FA2",
            trailColor: "#d6d6d6",
          })}
        ></CircularProgressbarWithChildren>
      </div>
      <div className="mb-6">
        <button
          className="border border-blue-700 rounded-2xl py-2 px-8  bg-blue-600 text-white font-semibold hover:bg-blue-900 hover:border-blue-900"
          onClick={openModalHandler}
        >
          Show Correct Answers
        </button>
        {showModal && (
          <NotificationModal
            title="Correct Answers"
            messages={allCorrectAnswers}
            onConfirm={closeModalHandler}
            buttonTitle="Close"
          />
        )}
      </div>
      <div>
        <Link
          to="/quizpage"
          className="border border-blue-700 rounded-2xl py-2 px-8  bg-blue-600 text-white font-semibold hover:bg-blue-900 hover:border-blue-900"
        >
          Play More
        </Link>
      </div>
    </div>
  );
}

export default CircleProgressBar;
