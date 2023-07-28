import Navbar from "../components/Navbar";

function ErrorPage() {
  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-800 dark:text-white">
      <Navbar />
      <main>
        <h1 className="text-center mt-60 text-8xl ">An error occurred!</h1>
        <p className="text-center p-20 text-3xl">Could not find this page!</p>
      </main>
    </div>
  );
}

export default ErrorPage;
