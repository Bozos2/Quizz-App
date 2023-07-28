import React from "react";

const QuestionsProgressBar = ({ currentIndex }) => {
  const numSteps = 10;
  const filledSteps = Math.min(currentIndex + 1, numSteps);

  return (
    <div className="flex justify-center mt-10">
      {Array.from({ length: numSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-12  h-2 m-1 rounded ${
            index < filledSteps ? "bg-purple-700" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default QuestionsProgressBar;
