import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import ReactIcon from "../assets/FooterIcons/ReactIcon";
import NodejsIcon from "../assets/FooterIcons/NodejsIcon";
import MongoDBIcon from "../assets/FooterIcons/MongoDBIcon";
import FirebaseIcon from "../assets/FooterIcons/FirebaseIcon";
import ReduxIcon from "../assets/FooterIcons/ReduxIcon";
import GithubIcon from "../assets/FooterIcons/GithubIcon";
import LinkedinIcon from "../assets/FooterIcons/LinkedinIcon";

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <footer className="flex flex-col h-72 mt-16 bg-purple-300">
      <div className="my-8 flex justify-center">
        <p className="text-slate-800">
          Questions provided by{" "}
          <Link
            to="https://opentdb.com"
            className="text-blue-600 font-light underline "
          >
            Open Trivia DB
          </Link>{" "}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row  items-center gap-2 ml-24">
          <ReactIcon />
          <NodejsIcon />
          <MongoDBIcon />
          <FirebaseIcon />
          <ReduxIcon />
        </div>
        <div className="flex  flex-col justify-center w-48 mr-28 text-slate-800 ">
          <h6 className="text-center font-bold text-xl">Contact</h6>
          <div className="flex flex-row justify-between mt-2 font-semibold text-sm">
            <p>Frontend</p>
            <p>Backend</p>
          </div>
          <div className="flex flex-row justify-between pt-1">
            <div className="flex flex-row">
              <Link to="https://github.com/Bozos2">
                <GithubIcon />
              </Link>
              <LinkedinIcon />
            </div>
            <div className="mx-3">
              <Link to="https://github.com/emeraldrazer">
                <GithubIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <ul className="flex justify-between items-center w-96 no-underline text-blue-600   ">
          <li className="hover:underline dark:hover:text-blue-700">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline dark:hover:text-blue-700">
            <Link to="/quizpage">Categories</Link>
          </li>
          <li className="hover:underline dark:hover:text-blue-700">
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
