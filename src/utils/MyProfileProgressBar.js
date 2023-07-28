import React from "react";

const categoryColors = {
  sports: "bg-green-600",
  general: "bg-yellow-600",
  animals: "bg-orange-600",
  mythology: "bg-blue-600",
  geography: "bg-pink-600",
  history: "bg-yellow-300",
  politics: "bg-pink-900",
  science_and_nature: "bg-blue-400",
  film: "bg-green-400",
  music: "bg-purple-600",
  books: "bg-indigo-600",
};

const MyProfileProgressBar = ({ percentege, category }) => {
  const color = categoryColors[category];
  return (
    <div className="border rounded h-3 w-64 bg-gray-300 overflow-hidden">
      <div
        style={{ width: `${percentege}%` }}
        className={`h-full ${color}`}
      ></div>
    </div>
  );
};

export default MyProfileProgressBar;
