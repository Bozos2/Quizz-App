import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../input.css";

function RootLayout() {
  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-800 font-poppins">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
