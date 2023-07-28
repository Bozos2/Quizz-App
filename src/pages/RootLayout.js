import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../input.css";

function RootLayout() {
  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-800">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
