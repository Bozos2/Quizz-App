import React from "react";

const categoryColors = {
  Sports: "bg-green-600",
  General: "bg-yellow-600",
  Animals: "bg-orange-600",
  Mythology: "bg-blue-600",
  Geography: "bg-pink-600",
  History: "bg-yellow-300",
  Politics: "bg-pink-900",
  "Science & Nature": "bg-sky-600",
  Film: "bg-green-400",
  Music: "bg-purple-600",
  Books: "bg-indigo-600",
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
