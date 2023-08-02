import React from "react";
import Stars from "./Stars";

const DifficultyStars = ({ difficulty }) => {
  const difficultyLevels = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  const filledStars = difficultyLevels[difficulty];

  const emptyStars = 3 - filledStars;

  const starIcons = [];

  for (let i = 0; i < filledStars; i++) {
    starIcons.push(<Stars key={i} filled={true} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(<Stars key={i + filledStars} filled={false} />);
  }

  return <div className="flex">{starIcons}</div>;
};

export default DifficultyStars;
