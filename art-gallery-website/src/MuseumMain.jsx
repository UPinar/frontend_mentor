import React from "react";
import "../css/MuseumMain.css";

function MuseumMain() {
  return (
    <section className="main-section">
      <picture className="main-picture-1">
        <source
          media="(min-width: 1440px)"
          srcSet="../src/assets/images/desktop/image-grid-1@2x.jpg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="../src/assets/images/tablet/image-grid-1@2x.jpg"
        />
        <img
          className="main-image-1"
          src="../src/assets/images/mobile/image-grid-1@2x.jpg"
          alt="Main section image 1"
          width="686"
          height="640"
        />
      </picture>
      <section className="main-text-section">
        <h2 className="main-title">
          Your day <br />
          at the gallery
        </h2>
        <p className="main-description">
          Wander through our distinct collections and find new insights about
          our artists. Dive into the details of their creative process.
        </p>
      </section>
      <picture className="main-picture-2">
        <source
          media="(min-width: 1440px)"
          srcSet="../src/assets/images/desktop/image-grid-2@2x.jpg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="../src/assets/images/tablet/image-grid-2@2x.jpg"
        />
        <img
          className="main-image-2"
          src="../src/assets/images/mobile/image-grid-2@2x.jpg"
          alt="Main section image 2"
          width="686"
          height="960"
        />
      </picture>
      <picture className="main-picture-3">
        <source
          media="(min-width: 1440px)"
          srcSet="../src/assets/images/desktop/image-grid-3@2x.jpg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="../src/assets/images/tablet/image-grid-3@2x.jpg"
        />
        <img
          className="main-image-3"
          src="../src/assets/images/mobile/image-grid-3@2x.jpg"
          alt="Main section image 3"
          width="686"
          height="400"
        />
      </picture>
      <section className="invitation-section">
        <h2 className="invitation-title">Come &amp; be inspired</h2>
        <p className="invitation-description">
          We’re excited to welcome you to our gallery and see how our
          collections influence you.
        </p>
      </section>
    </section>
  );
}

export default MuseumMain;
