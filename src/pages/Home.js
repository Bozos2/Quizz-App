import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/quizpage");
  }

  return (
    <div className="flex flex-col  items-center">
      <h1 className="text-center text-8xl mt-36 text-purple-700 font-bold dark:text-white">
        The best group of Quizzes
      </h1>
      <p className="text-center m-6 pt-16 text-6xl text-purple-700 font-semibold dark:text-white">
        Test your Knowledge
      </p>
      <div className="mt-28">
        <Link
          to="/quizpage"
          className="border border-blue-700 rounded-md py-5 px-14   inline-block mx-16 bg-blue-600 text-white font-bold hover:bg-blue-900 hover:border-blue-900"
          onClick={navigateHandler}
        >
          Categories
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
