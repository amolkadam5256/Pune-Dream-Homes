import { Outlet } from "react-router-dom";
import Header from "../components/layout/public/Header";
import Footer from "../components/layout/public/Footer";

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col ">

            {/* Top Navigation */}
            <Header />
            {/* Page Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer (optional) */}
            <Footer />

        </div>
    );
};

export default PublicLayout;
