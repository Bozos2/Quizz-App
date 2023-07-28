import React from "react";
import "../input.css";

const categoryColors = {
  Sports: "bg-green-700",
  General_Knowledge: "bg-yellow-700",
  Animals: "bg-orange-700",
  Mythology: "bg-blue-700",
};

const Card = (props) => {
  const { category } = props;
  const color = categoryColors[category] || "bg-purple-700 dark:bg-purple-400";

  const cardStyle = `block w-72 h-80 p-4 m-12 ${color} border border-black-200 rounded-lg cursor-pointer shadow dark:border-gray-700`;

  return <div className={`${cardStyle}`}>{props.children}</div>;
};

export default Card;
