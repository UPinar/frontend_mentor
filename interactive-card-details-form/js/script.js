/* ------------------------------------------------ */

/* changing font sizes when the screen is resized */

const backCardCvcNumberText = document.querySelector(
  ".card-back-image-container > .card-cvc-number"
);
const frontCardNumberText = document.querySelector(
  ".card-front-image-container > .card-number"
);
const frontCardHolderNameText = document.querySelector(
  ".card-front-image-container > .card-holder-name"
);
const frontCardExpiryDateText = document.querySelector(
  ".card-front-image-container > .card-expiry-date"
);

function setLargerFontSize() {
  if (backCardCvcNumberText) {
    backCardCvcNumberText.classList.remove("text-preset-7");
    backCardCvcNumberText.classList.add("text-preset-4");
  }

  if (frontCardNumberText) {
    frontCardNumberText.classList.remove("text-preset-2");
    frontCardNumberText.classList.add("text-preset-1");
  }

  if (frontCardHolderNameText) {
    frontCardHolderNameText.classList.remove("text-preset-7");
    frontCardHolderNameText.classList.add("text-preset-4");
  }

  if (frontCardExpiryDateText) {
    frontCardExpiryDateText.classList.remove("text-preset-7");
    frontCardExpiryDateText.classList.add("text-preset-4");
  }
}

function setSmallerFontSize() {
  if (backCardCvcNumberText) {
    backCardCvcNumberText.classList.remove("text-preset-4");
    backCardCvcNumberText.classList.add("text-preset-7");
  }

  if (frontCardNumberText) {
    frontCardNumberText.classList.remove("text-preset-1");
    frontCardNumberText.classList.add("text-preset-2");
  }

  if (frontCardHolderNameText) {
    frontCardHolderNameText.classList.remove("text-preset-4");
    frontCardHolderNameText.classList.add("text-preset-7");
  }

  if (frontCardExpiryDateText) {
    frontCardExpiryDateText.classList.remove("text-preset-4");
    frontCardExpiryDateText.classList.add("text-preset-7");
  }
}

// check window size on load
if (window.innerWidth >= 768) {
  setLargerFontSize();
} else {
  setSmallerFontSize();
}

window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) {
    setLargerFontSize();
  } else {
    setSmallerFontSize();
  }
});

/* ------------------------------------------------ */

/* checking inputs when the user types */

const cardHolderNameInput = document.querySelector(".card-holder-name-input");

const cardNumberInput = document.querySelector(".card-number-input");
cardNumberInput.addEventListener("keydown", function (event) {
  if (event.key === "Delete") {
    event.preventDefault();
  }
});
cardNumberInput.addEventListener("input", function (event) {
  const lengthWithoutSpaces = cardNumberInput.value.replace(/\s/g, "").length;
  const maxLength = 16;

  console.log(lengthWithoutSpaces);

  if (event.inputType === "deleteContentBackward") {
    if (lengthWithoutSpaces % 4 === 0 && lengthWithoutSpaces !== 2) {
      cardNumberInput.value = cardNumberInput.value.slice(0, -1);
    }
  }

  if (lengthWithoutSpaces > maxLength) {
    cardNumberInput.value = cardNumberInput.value.slice(0, -1);
  } else {
    // value can also be accepted letters and symbols but after 4 characters it should be replaced with a space
    const cardNumberValue = cardNumberInput.value.replace(/\s/g, "");
    const cardNumberValueWithSpaces = cardNumberValue
      .replace(/(.{4})/g, "$1 ")
      .trim();

    cardNumberInput.value = cardNumberValueWithSpaces;
  }
});

const cardExpiryMonthInput = document.querySelector(".card-expiry-month-input");
cardExpiryMonthInput.addEventListener("input", function (event) {
  if (cardExpiryMonthInput.value.length > 2) {
    cardExpiryMonthInput.value = cardExpiryMonthInput.value.slice(0, 2);
  }
});

const cardExpiryYearInput = document.querySelector(".card-expiry-year-input");
cardExpiryYearInput.addEventListener("input", function (event) {
  if (cardExpiryYearInput.value.length > 2) {
    cardExpiryYearInput.value = cardExpiryYearInput.value.slice(0, 2);
  }
});

const cardCvcInput = document.querySelector(".card-cvc-input");
cardCvcInput.addEventListener("input", function (event) {
  if (cardCvcInput.value.length > 3) {
    cardCvcInput.value = cardCvcInput.value.slice(0, 3);
  }
});

/* ------------------------------------------------ */

/* checking input values when confirm button is clicked */

const confirmButton = document.querySelector(".confirm-button");

confirmButton.addEventListener("click", function (event) {
  const validationFunctions = [
    checkCardHolderName,
    checkCardNumber,
    checkCardExpiryMonth,
    checkCardExpiryYear,
    checkCardCvc,
  ];

  // Check if any error is present
  for (const validate of validationFunctions) {
    if (!validate()) {
      break;
    }
  }

  // No errors present
  noError();
});

function checkCardHolderName() {
  const cardHolderName = cardHolderNameInput.value;
  const cardHolderNameEmptyError = document.querySelector(
    ".cardholder-name-section .empty-error"
  );

  if (cardHolderName === "") {
    cardHolderNameEmptyError.classList.remove("hidden");
    cardHolderNameInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else {
    cardHolderNameEmptyError.classList.add("hidden");
    cardHolderNameInput.style.border = "1px solid var(--CLR-GRAY-200)";
  }
  return true;
}

function checkCardNumber() {
  const cardNumber = cardNumberInput.value;
  const cardNumberEmptyError = document.querySelector(
    ".card-number-section .empty-error"
  );
  const cardNumberFormatError = document.querySelector(
    ".card-number-section .format-error"
  );

  if (cardNumber === "") {
    cardNumberEmptyError.classList.remove("hidden");
    cardNumberInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
    cardNumberFormatError.classList.remove("hidden");
    cardNumberInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else {
    cardNumberEmptyError.classList.add("hidden");
    cardNumberFormatError.classList.add("hidden");
    cardNumberInput.style.border = "1px solid var(--CLR-GRAY-200)";
  }
  return true;
}

function checkCardExpiryMonth() {
  const cardExpiryMonth = cardExpiryMonthInput.value;
  const cardExpiryEmptyError = document.querySelector(
    ".card-expiry-section .empty-error"
  );
  const cardExpiryFormatError = document.querySelector(
    ".card-expiry-section .format-error"
  );

  if (cardExpiryMonth === "") {
    cardExpiryEmptyError.classList.remove("hidden");
    cardExpiryMonthInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else if (!/^(0[1-9]|1[0-2])$/.test(cardExpiryMonth)) {
    cardExpiryFormatError.classList.remove("hidden");
    cardExpiryMonthInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else {
    cardExpiryEmptyError.classList.add("hidden");
    cardExpiryFormatError.classList.add("hidden");
    cardExpiryMonthInput.style.border = "1px solid var(--CLR-GRAY-200)";
  }

  return true;
}

function checkCardExpiryYear() {
  const cardExpiryYear = cardExpiryYearInput.value;
  const cardExpiryEmptyError = document.querySelector(
    ".card-expiry-section .empty-error"
  );
  const cardExpiryFormatError = document.querySelector(
    ".card-expiry-section .format-error"
  );

  if (cardExpiryYear === "") {
    cardExpiryEmptyError.classList.remove("hidden");
    cardExpiryYearInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else if (!/^\d{2}$/.test(cardExpiryYear)) {
    cardExpiryFormatError.classList.remove("hidden");
    cardExpiryYearInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else {
    cardExpiryEmptyError.classList.add("hidden");
    cardExpiryFormatError.classList.add("hidden");
    cardExpiryYearInput.style.border = "1px solid var(--CLR-GRAY-200)";
  }
  return true;
}

function checkCardCvc() {
  const cardCvc = cardCvcInput.value;
  const cardCvcEmptyError = document.querySelector(
    ".card-cvc-section .empty-error"
  );
  const cardCvcFormatError = document.querySelector(
    ".card-cvc-section .format-error"
  );

  if (cardCvc === "") {
    cardCvcEmptyError.classList.remove("hidden");
    cardCvcInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else if (!/^\d{3}$/.test(cardCvc)) {
    cardCvcFormatError.classList.remove("hidden");
    cardCvcInput.style.border = "1px solid var(--CLR-RED-400)";
    return false;
  } else {
    cardCvcEmptyError.classList.add("hidden");
    cardCvcFormatError.classList.add("hidden");
    cardCvcInput.style.border = "1px solid var(--CLR-GRAY-200)";
  }
  return true;
}

function noError() {
  confirmButton.textContent = "Continue";

  const cardHolderSection = document.querySelector(".cardholder-name-section");
  const cardNumberSection = document.querySelector(".card-number-section");
  const cardExpirySection = document.querySelector(".card-expiry-section");
  const cardCvcSection = document.querySelector(".card-cvc-section");
  const cardApprovalSection = document.querySelector(".card-approval-section");

  cardHolderSection.classList.add("hidden");
  cardNumberSection.classList.add("hidden");
  cardExpirySection.classList.add("hidden");
  cardCvcSection.classList.add("hidden");
  cardApprovalSection.classList.remove("hidden");
}

/* ------------------------------------------------ */
