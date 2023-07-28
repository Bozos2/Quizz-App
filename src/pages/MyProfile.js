import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";

import MyProfileProgressBar from "../utils/MyProfileProgressBar";
import SetAvatar from "../components/SetAvatar";

function MyProfile() {
  const authUsername = useSelector((state) => state.auth.user);
  const { usernameId } = useParams();
  const [infoAbout, setInfoAbout] = useState();
  const [showModal, setShowModal] = useState(false);

  const isOwnProfile = authUsername === usernameId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/userinfo/${usernameId}`
        );
        if (!response.ok) {
          console.log("something went wrong with response");
        }
        const responseData = await response.json();

        if (responseData && responseData.data && responseData.data.statistics) {
          const statisticData = {
            username: responseData.data.username,
            avatar: responseData.data.avatar_id,
            level: responseData.data.game_level,
            points: responseData.data.game_points,
            overall: responseData.data.statistics.overall,
            ovr_corr_answers: responseData.data.statistics.correct_answers,
            ovr_inc_answers: responseData.data.statistics.incorrect_answers,
            categories: responseData.data.statistics.categories.map(
              (category) => ({
                category: category.category,
                percentage:
                  category.percentage === 0 ? 70 : category.percentage,
                correct_answers: category.correct_answers,
                incorrect_answers: category.incorrect_answers,
                total: category.total,
              })
            ),
          };

          console.log(responseData);
          setInfoAbout(statisticData);
        }
      } catch (err) {
        console.log("wrong url or something!:", err);
      }
    };
    fetchData();
  }, [isOwnProfile, usernameId]);

  const handleAvatarClick = () => {
    setShowModal(true);
  };

  return (
    <main>
      {infoAbout ? (
        <div className="flex flex-col  items-center gap-16">
          <div className="flex flex-col  items-center  mt-12 gap-6">
            <div>
              <Avatar
                size="230"
                round="120px"
                textSizeRatio={1.75}
                src={infoAbout.avatar}
                onClick={isOwnProfile ? handleAvatarClick : undefined}
                style={{ cursor: "pointer" }}
              />
              <h2 className="text-center mt-4 text-2xl font-bold">
                {infoAbout.username}
              </h2>
            </div>
            <div>
              <h3 className="font-bold text-xl">
                Level: <span className="font-medium">{infoAbout.level}</span>
              </h3>
              <h5 className="font-bold text-base">
                Points: <span className="font-medium">{infoAbout.points}</span>
              </h5>
            </div>
          </div>
          <div className="border border-2 border-purple-700 rounded-xl mt-2 mb-20">
            <table className="gap-10">
              <thead>
                <tr>
                  <th className="font-bold text-xl p-4">Category</th>
                  <th className="font-bold text-xl p-4">Correct Answers</th>
                  <th className="font-bold text-xl w-64 p-4">Progress Bar</th>
                  <th className="font-bold text-xl p-4">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {infoAbout.categories.map((category, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-center p-4">
                      {category.category}
                    </td>
                    <td className="font-medium text-center p-4">
                      {category.correct_answers}/{category.total}
                    </td>
                    <td className="w-64 p-4">
                      <MyProfileProgressBar
                        percentege={category.percentage}
                        category={category.category}
                      />
                    </td>
                    <td className="font-medium text-center p-4">{`${category.percentage}%`}</td>
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
      {showModal && <SetAvatar onClose={() => setShowModal(false)} />}
    </main>
  );
}
export default MyProfile;
