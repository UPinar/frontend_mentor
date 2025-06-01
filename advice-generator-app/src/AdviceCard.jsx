import { useState, useEffect } from 'react';
import "./AdviceCard.css";

export default function AdviceCard() {
  const [advice, setAdvice] = useState(null);

  function getNewAdvice() {
    fetch(`https://api.adviceslip.com/advice?timestamp=${Date.now()}`)
      .then((response) => { return response.json()})
      .then((adviceData) => { 
        return setAdvice(adviceData.slip);
      });
  }

  useEffect(() => {
    getNewAdvice();
  }, []);

  return (
    <>
      <div className="advice-card">
        <p className="advice-id">Advice #{advice ? advice.id : null}</p>
        <p className="advice-text">"{advice ? advice.advice : null}"</p>
        <picture className="advice-divider-image">
          <source srcSet="../src/assets/pattern-divider-desktop.svg" media="(min-width: 768px)" />
          <img src="../src/assets/pattern-divider-mobile.svg" alt="Divider Logo" />
        </picture>
        <button className="advice-button" onClick={getNewAdvice}>
          <img src="../src/assets/icon-dice.svg" alt="Dice icon" />
        </button>
      </div>
    </>
  );
};
