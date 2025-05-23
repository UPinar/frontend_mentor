import React from "react";
import "../css/LocationInfo.css";

function LocationInfo() {
  return (
    <section className="location-info-section">
      <h2 className="location-header">
        <span>Our</span> Location
      </h2>
      <div className="location-address-section">
        <p className="location-address-1">99 King Street</p>
        <p className="location-address-2">Newport</p>
        <p className="location-address-3">RI 02840</p>
        <p className="location-address-4">United States of America</p>
        <p className="location-address-information">
          Our newly opened gallery is located near the Edward King House on 99
          King Street, the Modern Art Gallery is free to all visitors and open
          seven days a week from 8am to 9pm.
        </p>
      </div>
    </section>
  );
}
export default LocationInfo;
