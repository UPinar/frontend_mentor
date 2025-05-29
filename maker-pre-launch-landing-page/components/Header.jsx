import { useState, useEffect } from "react";

import "../css/Header.css";

import makerLogo from "../src/assets/logo.svg";
import headerImage from "../src/assets/illustration-hero-mobile.png";
import scrollIcon from "../src/assets/icon-scroll.svg";

export default function Header() {
  const [isTabletOrAbove, setIsTabletOrAbove] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => setIsTabletOrAbove(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <img
        className="header-logo"
        src={makerLogo}
        alt="Maker Logo"
        width={120}
        height={35}
      />
      {isTabletOrAbove ? null : (
        <img
          className="header-image"
          src={headerImage}
          width={820}
          height={468}
        />
      )}
      <section className="header-text-section">
        <h1 className="header-title">
          Get paid for the work you <strong>love</strong> to do.
        </h1>
        <p className="header-description">
          The 9-5 grind is so last century. We believe in living life on your
          own terms. Whether you&rsquo;re looking to escape the rat race or set
          up a side hustle, we&rsquo;ve got you covered.
        </p>
      </section>
      <img
        className="header-scroll-icon"
        src={scrollIcon}
        alt="Scroll down"
        width={26}
        height={42}
      />
    </header>
  );
}
