import "../src/App.css"

function BalanceSection() {
  return (
    <div className="balance-section">
      <h1 className="balance-title">My Balance</h1>
      <p className="balance-amount">$921.48</p>
      <svg className="balance-logo" width="72" height="48" viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#382314" cx="48" cy="24" r="24"/><circle stroke="#FFF" stroke-width="2" cx="24" cy="24" r="23"/></g></svg>
    </div>
  );
}

export default BalanceSection;