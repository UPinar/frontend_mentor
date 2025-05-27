import "./App.css";
import TipCalculatorCard from "../components/TipCalculatorCard.jsx";

import SplitterLogo from "./assets/images/logo.svg";

function App() {
  return (
    <>
      <header className="app-header">
        <img
          src={SplitterLogo}
          alt="Splitter Logo"
          className="app-logo"
          width={87}
          height={54}
        />
      </header>
      <TipCalculatorCard />
    </>
  );
}

export default App;
