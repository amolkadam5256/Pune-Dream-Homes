import { Outlet } from "react-router-dom";
import Header from "../components/layout/public/Header";
import Footer from "../components/layout/public/Footer";

const BuilderLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BuilderLayout;
