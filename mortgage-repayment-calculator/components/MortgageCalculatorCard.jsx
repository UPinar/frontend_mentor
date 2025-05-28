import { useState } from "react";

import "../css/MortgageCalculatorCard.css";
import calculatorLogo from "../src/assets/images/icon-calculator.svg";
import noResultsLogo from "../src/assets/images/illustration-empty.svg";

function MortgageCalculatorCard() {
  const [mortgageAmount, setMortgageAmount] = useState(0);
  const [mortgageTerm, setMortgageTerm] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [mortgageType, setMortgageType] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [monthlyRepayment, setMonthlyRepayment] = useState("");
  const [totalRepayment, setTotalRepayment] = useState("");

  function handleFormSubmit(formData) {
    setMortgageAmount(formData.get("mortgageAmount"));
    setMortgageTerm(formData.get("mortgageTerm"));
    setInterestRate(formData.get("interestRate"));
    setMortgageType(formData.get("mortgageType"));

    if (
      !Number(mortgageAmount) ||
      !Number(mortgageTerm) ||
      !Number(interestRate) ||
      !mortgageType
    ) {
      setFormSubmitted(false);
      return;
    }

    setFormSubmitted(true);

    const principal = parseFloat(mortgageAmount);
    const termInMonths = parseFloat(mortgageTerm) * 12;
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    let monthlyPayment;
    if (mortgageType === "repayment") {
      monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termInMonths));
    } else if (mortgageType === "interestOnly") {
      monthlyPayment = principal * monthlyRate;
    }

    setMonthlyRepayment(
      Number(monthlyPayment).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
    setTotalRepayment(
      Number(monthlyPayment * termInMonths).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  function handleClearAll() {
    setMortgageAmount(0);
    setMortgageTerm(0);
    setInterestRate(0);
    setMortgageType("");
    setFormSubmitted(false);
  }

  return (
    <section className="mortgage-card">
      <section className="mortgage-card-info-section">
        <header className="card-header-section">
          <h1 className="card-header">Mortgage Calculator</h1>
          <button className="card-clear-button" onClick={handleClearAll}>
            Clear all
          </button>
        </header>
        <main className="card-main-section">
          <form className="card-form-section" action={handleFormSubmit}>
            <section className={"card-form-group"}>
              <label htmlFor="mortgageAmount">Mortgage Amount</label>
              <div
                className={`input-container ${
                  !Number(mortgageAmount) ? "empty-container" : ""
                }`}
              >
                <p>£</p>
                <input
                  type="text"
                  id="mortgageAmount"
                  name="mortgageAmount"
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(e.target.value)}
                />
              </div>
              {!Number(mortgageAmount) ? (
                <p className="required-field">This field is required</p>
              ) : null}
            </section>

            <section className="card-form-group">
              <label htmlFor="mortgageTerm">Mortgage Term</label>
              <div
                className={`input-container ${
                  !Number(mortgageTerm) ? "empty-container" : ""
                }`}
              >
                <input
                  type="text"
                  id="mortgageTerm"
                  name="mortgageTerm"
                  value={mortgageTerm}
                  onChange={(e) => setMortgageTerm(e.target.value)}
                />
                <p>years</p>
              </div>
              {!Number(mortgageTerm) ? (
                <p className="required-field">This field is required</p>
              ) : null}
            </section>

            <section className="card-form-group">
              <label htmlFor="interestRate">Interest Rate</label>
              <div
                className={`input-container ${
                  !Number(interestRate) ? "empty-container" : ""
                }`}
              >
                <input
                  type="text"
                  id="interestRate"
                  name="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
                <p>%</p>
              </div>
              {!Number(interestRate) ? (
                <p className="required-field">This field is required</p>
              ) : null}
            </section>

            <section className="card-form-group">
              <label htmlFor="mortgageType">Mortgage Type</label>
              <div
                className={`radio-container ${
                  mortgageType === "repayment" ? "checked-radio-container" : ""
                }`}
              >
                <input
                  type="radio"
                  id="repayment"
                  name="mortgageType"
                  value="repayment"
                  checked={mortgageType === "repayment"}
                  onChange={(e) => setMortgageType(e.target.value)}
                />
                <label htmlFor="repayment">Repayment</label>
              </div>
              <div
                className={`radio-container ${
                  mortgageType === "interestOnly"
                    ? "checked-radio-container"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  id="interestOnly"
                  name="mortgageType"
                  value="interestOnly"
                  checked={mortgageType === "interestOnly"}
                  onChange={(e) => setMortgageType(e.target.value)}
                />
                <label htmlFor="interestOnly">Interest Only</label>
              </div>
              {!mortgageType ? (
                <p className="required-field">This field is required</p>
              ) : null}
            </section>

            <section className="card-form-group">
              <div className="button-container">
                <img
                  src={calculatorLogo}
                  alt="Calculator Icon"
                  className="card-calculator-icon"
                />
                <button className="card-submit-button">
                  Calculate Repayments
                </button>
              </div>
            </section>
          </form>
        </main>
      </section>
      {!formSubmitted ? (
        <section className="mortgage-card-no-result-section">
          <img
            src={noResultsLogo}
            alt="No Results"
            className="card-no-results-icon"
            width={192}
            height={192}
          />
          <h2 className="card-no-results-header">Results shown here</h2>
          <p className="card-no-results-description">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </section>
      ) : (
        <section className="mortgage-card-result-section">
          <h2 className="card-results-header">Your results</h2>
          <p className="card-results-description">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div className="card-results-information-container">
            <h3 className="card-results-monthly-title">
              Your monthly repayments
            </h3>
            <p className="card-results-monthly-value">£{monthlyRepayment}</p>
            <h3 className="card-results-total-title">
              Total you'll repay over the term
            </h3>
            <p className="card-results-total-value">£{totalRepayment}</p>
          </div>
        </section>
      )}
    </section>
  );
}

export default MortgageCalculatorCard;
