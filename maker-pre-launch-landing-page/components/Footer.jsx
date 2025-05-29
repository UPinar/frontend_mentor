import React from 'react';
import '../css/Footer.css';

export default function Footer() {
  const [isEmailValid, setIsEmailValid] = React.useState(null);

  function handleSubmit(formData) {
    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }

  console.log(isEmailValid);

  return (
    <footer className="footer">
      <h2 className="footer-title">Get notified when we launch</h2>
      <form action={handleSubmit} className="footer-form" >
        <input  name="email"
                className="footer-input"
                placeholder="Email address"
                aria-label="Email address for notifications" />
        {isEmailValid === false ? (
          <p className="footer-error">Oops! That doesn’t look like an email address</p>
        ) : null}
        <button className="footer-button" type="submit">Get Notified</button>
      </form>
    </footer>
  );
}