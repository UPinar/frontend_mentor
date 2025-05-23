import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../css/App.css";

import MuseumHeader from "./MuseumHeader.jsx";
import MuseumMain from "./MuseumMain.jsx";
import MuseumFooter from "./MuseumFooter.jsx";

import LocationMap from "./LocationMap.jsx";
import LocationInfo from "./LocationInfo.jsx";
import LocationFooter from "./LocationFooter.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MuseumHeader />
              <MuseumMain />
              <MuseumFooter />
            </>
          }
        />
        <Route
          path="/location"
          element={
            <>
              <LocationMap />
              <LocationInfo />
              <LocationFooter />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
