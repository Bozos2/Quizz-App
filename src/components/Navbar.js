import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import DarkButton from "../assets/DarkButton";
import Logo from "../assets/Logo";
import { authActions } from "../store/auth";

import "../input.css";

function Navbar() {
  const [theme, setTheme] = useState("light");
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className="max-w-full m-auto  p-5 font-semibold">
      <nav className="flex flex-row justify-between">
        <div>
          <Logo />
        </div>
        <ul className="flex justify-between items-center space-x-6 no-underline text-purple-700  text-xl dark:text-white ">
          <li className="hover:underline dark:hover:text-purple-400">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? " underline dark:text-purple-400" : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className="hover:underline dark:hover:text-purple-400">
            <NavLink
              to="/quizpage"
              className={({ isActive }) =>
                isActive ? "underline dark:text-purple-400" : undefined
              }
            >
              Categories
            </NavLink>
          </li>
          <li className="hover:underline dark:hover:text-purple-400">
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive ? " underline dark:text-purple-400 " : undefined
              }
            >
              Leaderboard
            </NavLink>
          </li>
          {isAuth && (
            <li className="hover:underline dark:hover:text-purple-400">
              <NavLink
                to={`/profile/${username}`}
                className={({ isActive }) =>
                  isActive ? " underline dark:text-purple-400 " : undefined
                }
              >
                My Profile
              </NavLink>
            </li>
          )}
        </ul>
        <div className="flex justify-center">
          <DarkButton onClick={handleThemeSwitch} />

          {!isAuth && (
            <div>
              <NavLink
                to="/login"
                className="border border-purple-700 rounded-md py-2 px-4 mt-2 ml-4 h-11 inline-block mx-3  text-purple-700 font-bold tracking-wider dark:border-purple-400 dark:text-purple-400"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className="border border-purple-700 rounded-md bg-purple-700 py-2 px-4 mt-2 h-11  inline-block mx-2  text-white font-bold tracking-wider dark:bg-purple-400 dark:border-purple-400"
              >
                Sign up
              </NavLink>
            </div>
          )}
          {isAuth && (
            <div>
              <NavLink
                to={`/profile/${username}`}
                className=" py-2 px-4 mt-2 h-11 w-24 inline-block mx-3 text-center text-purple-700 font-normal hover:underline hover:font-semibold dark:text-purple-400"
              >
                {username}
              </NavLink>
              <NavLink
                className="border border-purple-700 rounded-md  py-2 px-4 mt-2 h-11  inline-block mx-2  text-purple-700 font-semibold tracking-wider dark:border-purple-400 dark:text-purple-400"
                onClick={logoutHandler}
              >
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
