import React from "react";

const LeaderboardProgress = ({ percentage }) => {
  return (
    <div className="border rounded h-3 w-64 bg-gray-300 overflow-hidden">
      <div
        style={{ width: `${percentage}%` }}
        className="h-full bg-indigo-600"
      ></div>
    </div>
  );
};

export default LeaderboardProgress;
