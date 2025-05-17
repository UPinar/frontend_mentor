// when pricing-toggle-button is clicked
const pricing_toggle_button = document.querySelector(".pricing-toggle-button");

const pricing_toggle_circle = document.querySelector(".pricing-toggle-circle");

const basic_price = document.querySelector(
  ".pricing-card:nth-child(1) .pricing-card-price"
);

const pro_price = document.querySelector(
  ".pricing-card:nth-child(2) .pricing-card-price"
);

const master_price = document.querySelector(
  ".pricing-card:nth-child(3) .pricing-card-price"
);

pricing_toggle_button.addEventListener("click", () => {
  if (pricing_toggle_circle.classList.contains("monthly")) {
    pricing_toggle_button.style.justifyContent = "flex-start";
    pricing_toggle_circle.classList.remove("monthly");
    pricing_toggle_circle.classList.add("annually");

    basic_price.textContent = "$199.99";
    pro_price.textContent = "$249.99";
    master_price.textContent = "$399.99";
  } else {
    pricing_toggle_button.style.justifyContent = "flex-end";
    pricing_toggle_circle.classList.remove("annually");
    pricing_toggle_circle.classList.add("monthly");

    basic_price.textContent = "$19.99";
    pro_price.textContent = "$24.99";
    master_price.textContent = "$39.99";
  }
});
