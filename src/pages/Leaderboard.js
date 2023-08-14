import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

import LeaderboardProgress from "../utils/LeaderboardProgress";

function LeaderBoard() {
  const [infoAbout, setInfoAbout] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/leaderboard"
        );
        if (!response.ok) {
          console.log("something went wrong with response");
        }
        const responseData = await response.json();

        const statisticData = responseData.data.map((user) => ({
          username: user.username,
          avatar: user.avatar_id,
          level: user.game_level,
          points: user.game_points,
          overall: user.statistics.overall,
          correct_answers: user.statistics.correct_answers,
          percentage: user.statistics.percentage,
        }));

        console.log("response", responseData);
        setInfoAbout(statisticData);
        console.log("state:", statisticData);
      } catch (err) {
        console.log("wrong url or something!:", err);
      }
    };
    fetchData();
  }, []);

  const sortInfoAbout = useCallback(
    (key) => {
      const sortedData = [...infoAbout];
      sortedData.sort((a, b) => b[key] - a[key]);
      setInfoAbout(sortedData);
    },
    [infoAbout]
  );

  return (
    <main>
      {infoAbout ? (
        <div className="flex flex-col  items-center gap-16  text-purple-700 font-poppins dark:text-white">
          <h1 className=" mt-10 text-5xl font-semibold">Leaderboard</h1>
          <div className="border border-2 border-purple-700 rounded-xl mt-2 mb-20 p-10 dark:border-purple-400">
            <table className="gap-10">
              <thead>
                <tr>
                  <th className="p-4"></th>
                  <th
                    className="font-bold text-xl p-4 hover:cursor-pointer"
                    onClick={() => sortInfoAbout("username")}
                  >
                    Username
                  </th>
                  <th
                    className="font-bold text-xl p-4 hover:cursor-pointer"
                    onClick={() => sortInfoAbout("correct_answers")}
                  >
                    Correct Answers
                  </th>
                  <th className="font-bold text-xl w-64 p-4 hover:cursor-pointer">
                    Progress Bar
                  </th>
                  <th
                    className="font-bold text-xl p-4 hover:cursor-pointer"
                    onClick={() => sortInfoAbout("percentage")}
                  >
                    Percentage
                  </th>
                  <th
                    className="font-bold text-xl p-4 hover:cursor-pointer"
                    onClick={() => sortInfoAbout("level")}
                  >
                    Level
                  </th>
                  <th
                    className="font-bold text-xl p-4 hover:cursor-pointer"
                    onClick={() => sortInfoAbout("points")}
                  >
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {infoAbout.map((stats, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-center p-4">
                      <Avatar size="40" round="120px" src={stats.avatar} />
                    </td>
                    <td className="font-semibold text-center text-indigo-600 p-4 dark:text-indigo-300">
                      <Link
                        to={`/profile/${stats.username}`}
                        className="hover:underline hover:text-blue-800"
                      >
                        {stats.username}
                      </Link>
                    </td>
                    <td className="font-medium text-center p-4">
                      {stats.correct_answers}/{stats.overall}
                    </td>
                    <td className="w-64 p-4">
                      <LeaderboardProgress percentage={stats.percentage} />
                    </td>
                    <td className="font-medium text-center p-4">{`${stats.percentage}%`}</td>
                    <td className="font-bold text-center p-4">{stats.level}</td>
                    <td className="font-medium text-center p-4">
                      {stats.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center p-20 text-3xl">Could not find this page!</p>
        </div>
      )}
    </main>
  );
}
export default LeaderBoard;
