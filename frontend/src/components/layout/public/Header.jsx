import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import HeaderBottom from "./HeaderBottom";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-md"}`}
        >
            <TopBar />
            <HeaderBottom />
        </header>
    );
};

export default Header;
