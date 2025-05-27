import React from "react";
import "../css/TipCalculatorCard.css";
import dollarIcon from "../src/assets/images/icon-dollar.svg";
import personIcon from "../src/assets/images/icon-person.svg";

function TipCalculatorCard() {
  const [billAmount, setBillAmount] = React.useState(0);
  const [tipPercentage, setTipPercentage] = React.useState(0);
  const [numberOfPeople, setNumberOfPeople] = React.useState(0);
  const [tipAmountPerPerson, setTipAmountPerPerson] = React.useState("$0.00");
  const [totalPerPerson, setTotalPerPerson] = React.useState("$0.00");

  const calculateTipAndTotal = React.useCallback(() => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople, 10);
    if (isNaN(bill) || isNaN(tip) || isNaN(people) || people <= 0) {
      setTipAmountPerPerson("$0.00");
      setTotalPerPerson("$0.00");
      return;
    }
    const tipAmount = (bill * (tip / 100)) / people;
    const totalAmount = (bill + tipAmount) / people;
    setTipAmountPerPerson(`$${tipAmount.toFixed(2)}`);
    setTotalPerPerson(`$${totalAmount.toFixed(2)}`);
  }, [billAmount, tipPercentage, numberOfPeople]);

  React.useEffect(() => {
    calculateTipAndTotal();
  }, [calculateTipAndTotal]);

  function handleResetButtonClick() {
    setBillAmount(0);
    setTipPercentage(0);
    setNumberOfPeople(0);
    setTipAmountPerPerson("$0.00");
    setTotalPerPerson("$0.00");
  }

  return (
    <section className="tip-calculator-card">
      <section className="bill-amount-section">
        <section className="bill-amount-text-section">
          <label>Bill</label>
          {!billAmount && <p>Can't be zero</p>}
        </section>
        <div
          className={`bill-amount-input-container ${
            billAmount == 0 ? "non-valid-input" : "valid-input"
          }`}
        >
          <img
            className="bill-amount-logo"
            src={dollarIcon}
            alt="Dollar Icon"
            width={11}
            height={17}
          />
          <input
            className="bill-amount-text"
            type="text"
            placeholder="0"
            defaultValue={0}
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            aria-label="Bill Amount"
          />
        </div>
      </section>
      <section className="tip-amount-section">
        <label>Select Tip %</label>
        <div className="tip-amount-buttons-container">
          <button
            className={`tip-amount-button ${
              tipPercentage === 5 ? "active" : ""
            }`}
            onClick={() => setTipPercentage(5)}
            aria-pressed={tipPercentage === 5}
            aria-label="Set Tip Percentage to 5%"
          >
            5%
          </button>
          <button
            className={`tip-amount-button ${
              tipPercentage === 10 ? "active" : ""
            }`}
            onClick={() => setTipPercentage(10)}
            aria-pressed={tipPercentage === 10}
            aria-label="Set Tip Percentage to 10%"
          >
            10%
          </button>
          <button
            className={`tip-amount-button ${
              tipPercentage === 15 ? "active" : ""
            }`}
            onClick={() => setTipPercentage(15)}
            aria-pressed={tipPercentage === 15}
            aria-label="Set Tip Percentage to 15%"
          >
            15%
          </button>
          <button
            className={`tip-amount-button ${
              tipPercentage === 25 ? "active" : ""
            }`}
            onClick={() => setTipPercentage(25)}
            aria-pressed={tipPercentage === 25}
            aria-label="Set Tip Percentage to 25%"
          >
            25%
          </button>
          <button
            className={`tip-amount-button ${
              tipPercentage === 50 ? "active" : ""
            }`}
            onClick={() => setTipPercentage(50)}
            aria-pressed={tipPercentage === 50}
            aria-label="Set Tip Percentage to 50%"
          >
            50%
          </button>
          <input
            className="custom-tip-input"
            type="text"
            placeholder="Custom"
            value={
              [5, 10, 15, 25, 50].includes(tipPercentage) ? "" : tipPercentage
            }
            onChange={(e) => {
              setTipPercentage(e.target.value);
            }}
            aria-label="Custom Tip Percentage"
          />
        </div>
      </section>
      <section className="number-of-people-section">
        <section className="number-of-people-text-section">
          <label>Number of People</label>
          {!numberOfPeople && <p>Can't be zero</p>}
        </section>
        <div
          className={`number-of-people-input-container ${
            numberOfPeople == 0 ? "non-valid-input" : "valid-input"
          }`}
        >
          <img
            className="number-of-people-logo"
            src={personIcon}
            alt="Person Icon"
            width={13}
            height={16}
          />
          <input
            onChange={(e) => setNumberOfPeople(e.target.value)}
            value={numberOfPeople}
            className="number-of-people-input"
            type="text"
            placeholder="0"
            defaultValue={0}
            aria-label="Number of People"
          />
        </div>
      </section>
      <section className="results-section">
        <section className="result-item-tip">
          <p>
            Tip Amount <br />
            <small>/ person</small>
          </p>
          <p className="result-tip-value">{tipAmountPerPerson}</p>
        </section>
        <section className="result-item-total">
          <p>
            Total <br />
            <small>/ person</small>
          </p>
          <p className="result-total-value">{totalPerPerson}</p>
        </section>

        <button
          className={`reset-button ${
            billAmount || tipPercentage || numberOfPeople
              ? "reset-button-active"
              : ""
          }`}
          aria-pressed={
            billAmount || tipPercentage || numberOfPeople ? false : true
          }
          aria-label="Reset Tip Calculator"
          onClick={() => {
            handleResetButtonClick();
          }}
        >
          Reset
        </button>
      </section>
    </section>
  );
}

export default TipCalculatorCard;
