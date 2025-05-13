const order_confirm_obj_arr = [];

function fetch_data_and_create_cards() {
  fetch("../js/data.json")
    .then((response) => response.json())
    .then((json_data) => {
      const desert_item_container = document.querySelector(
        ".desert-item-container"
      );
      json_data.forEach((item) => {
        order_confirm_obj_arr.push({
          name: item.name,
          thumbnail: item.image.thumbnail,
        });

        const desert_item = document.createElement("section");
        desert_item.classList.add("desert-item-section");
        desert_item.innerHTML = `
        <section class="desert-item-image-section">
          <picture>
            <source
              media="(min-width: 768px)"
              srcset="${item.image.tablet}"
            />
            <source
              media="(min-width: 1440px)"
              srcset="${item.image.desktop}"
            />
            <img
              class="desert-item-image"
              src="${item.image.mobile}"
              alt="${item.name}"
              width="654"
              height="424"
            />
          </picture>
          <button class="add-to-cart-button-container text-preset-4-bold">
            <img
              src="../assets/images/icon-add-to-cart.svg"
              alt="Cart Icon"
              width="21"
              height="20"
            />
            Add to cart
          </button>
          <div class="quantity-control-button-container hidden">
            <button class="quantity-control-button decrement">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path class="decrement-increment-icon" fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <span class="quantity">1</span>
            <button class="quantity-control-button increment">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path class="decrement-increment-icon"
                  fill="#fff"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>
        </section>

        <section class="desert-item-information-section">
          <h2 class="text-preset-4">${item.category}</h2>
          <h3 class="text-preset-3">${item.name}</h3>
          <p class="text-preset-3">${item.price.toFixed(2)}</p>
        </section>
      `;
        desert_item_container.appendChild(desert_item);
      });
    });
}

fetch_data_and_create_cards();

const item_exist_section = document.querySelector(".item-exist-section");
const no_item_exist_section = document.querySelector(".no-item-exist-section");

document
  .querySelector(".desert-item-container")
  .addEventListener("click", (event) => {
    // if element is add-to-cart-button-container
    if (event.target.classList.contains("add-to-cart-button-container")) {
      const add_to_cart_button = event.target.closest(
        ".add-to-cart-button-container"
      );

      if (add_to_cart_button) {
        // ---------------------------------------

        if (item_exist_section.classList.contains("hidden")) {
          item_exist_section.classList.remove("hidden");
          no_item_exist_section.classList.add("hidden");
        }

        // ---------------------------------------

        add_to_cart_button.classList.add("hidden");
        const quantity_control_button_container =
          add_to_cart_button.nextElementSibling;
        quantity_control_button_container.classList.remove("hidden");

        // ---------------------------------------

        const nearest_desert_item_image = add_to_cart_button
          .closest(".desert-item-image-section")
          .querySelector(".desert-item-image");

        if (nearest_desert_item_image) {
          nearest_desert_item_image.style.border = "2px solid var(--CLR-RED)";
        }

        // ---------------------------------------

        const nearest_desert_item_information_section = add_to_cart_button
          .closest(".desert-item-section")
          .querySelector(".desert-item-information-section");

        const desert_item_long_name =
          nearest_desert_item_information_section.querySelector("h3").innerText;

        const desert_item_count_price =
          nearest_desert_item_information_section.querySelector("p").innerText;
        const desert_item_count_price_float = parseFloat(
          desert_item_count_price
        ).toFixed(2);

        const cart_item_section = document.createElement("cart-item-section");
        cart_item_section.classList.add("cart-item-section");
        cart_item_section.innerHTML = `
          <section class="cart-item">
            <h2 class="cart-item-name text-preset-4-bold">
            ${desert_item_long_name}
            </h2>
            <p class="cart-item-count text-preset-4-bold">1x</p>
            <p class="cart-item-count-price text-preset-4">
              @ \$${desert_item_count_price_float}
            </p>
            <p class="cart-item-total-price text-preset-4-bold">
              \$${desert_item_count_price_float}
            </p>
          </section>
          <button class="remove-button text-preset-4-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path
                class="remove-button-icon"
                fill="#CAAFA7"
                d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
              />
            </svg>
          </button>
      `;

        const order_total_section = document.querySelector(
          ".order-total-section"
        );
        order_total_section.insertAdjacentElement(
          "beforebegin",
          cart_item_section
        );

        // ---------------------------------------
      }
    }

    // if element is quantity-control-button
    if (event.target.classList.contains("quantity-control-button")) {
      const quantity_control_button = event.target.closest(
        ".quantity-control-button-container"
      );
      const quantity_count = quantity_control_button.querySelector(".quantity");
      let quantity = parseInt(quantity_count.innerText);

      if (event.target.classList.contains("decrement") && quantity == 1) return;

      const nearest_desert_item_information_section = quantity_control_button
        .closest(".desert-item-section")
        .querySelector(".desert-item-information-section");

      const desert_item_long_name =
        nearest_desert_item_information_section.querySelector("h3").innerText;

      let cart_item_section = null;
      document.querySelectorAll(".cart-item-section").forEach((section) => {
        const h2 = section.querySelector("h2");
        if (h2.innerText.trim() === desert_item_long_name) {
          cart_item_section = section;
        }
      });

      const cart_item_count =
        cart_item_section.querySelector(".cart-item-count");
      const cart_item_count_price = parseFloat(
        cart_item_section
          .querySelector(".cart-item-count-price")
          .innerText.replace("@ $", "")
      );
      const cart_item_total_price_container = cart_item_section.querySelector(
        ".cart-item-total-price"
      );

      if (event.target.classList.contains("increment")) {
        quantity++;
        quantity_count.innerText = quantity;
        cart_item_count.innerText = `${quantity}x`;
        cart_item_total_price_container.innerText = `$${(
          cart_item_count_price * quantity
        ).toFixed(2)}`;
      } else if (event.target.classList.contains("decrement")) {
        quantity--;
        quantity_count.innerText = quantity;
        cart_item_count.innerText = `${quantity}x`;
        cart_item_total_price_container.innerText = `$${(
          cart_item_count_price * quantity
        ).toFixed(2)}`;
      }
    }

    calculate_and_set_order_total_item_count();
    calculate_and_set_order_total_price();
  });

document
  .querySelector(".item-exist-section")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-button")) {
      console.log("remove button clicked");
      const cart_item_section = event.target.closest(".cart-item-section");
      cart_item_section.remove();

      const cart_item_name = cart_item_section
        .querySelector("h2")
        .innerText.trim();
      const desert_item_information_section = document.querySelectorAll(
        ".desert-item-information-section"
      );

      console.log(cart_item_name);

      // check all h3 elements inside desert_item_information_section
      desert_item_information_section.forEach((section) => {
        const h3 = section.querySelector("h3");
        if (h3.innerText.trim() === cart_item_name) {
          // ---------------------------------------------

          const add_to_cart_button_container = section
            .closest(".desert-item-section")
            .querySelector(".add-to-cart-button-container");

          console.log(add_to_cart_button_container);
          add_to_cart_button_container.classList.remove("hidden");

          const quantity_control_button_container = section
            .closest(".desert-item-section")
            .querySelector(".quantity-control-button-container");

          quantity_control_button_container.classList.add("hidden");

          // ---------------------------------------------

          const desert_item_image =
            section.previousElementSibling.querySelector(".desert-item-image");

          if (desert_item_image) desert_item_image.style.border = "none";

          // ---------------------------------------------

          calculate_and_set_order_total_item_count();
          calculate_and_set_order_total_price();
        }
      });
    }

    if (event.target.classList.contains("confirm-order-button")) {
      console.log(event.target);
      // scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // remove hidden class from order-confirm-section
      const order_confirm_section = document.querySelector(
        ".order-confirm-section"
      );
      order_confirm_section.classList.remove("hidden");

      // order-confirm-active class for background opacity
      document.body.classList.add("order-confirm-active");

      // traverse cart-item-section and create order-confirm-item
      const cart_item_sections =
        document.querySelectorAll(".cart-item-section");
      const order_confirm_total_section = document.querySelector(
        ".order-confirm-total-section"
      );

      cart_item_sections.forEach((cart_item) => {
        const cart_item_name = cart_item.querySelector("h2").innerText.trim();

        const order_confirm_item = document.createElement("section");
        order_confirm_item.classList.add("order-confirm-item");

        const item_thumbnail = document.createElement("div");
        item_thumbnail.classList.add("order-confirm-item-thumbnail");

        // check order_confirm_obj_arr for thumbnail
        // that have the same name as cart_item_name
        const order_confirm_obj = order_confirm_obj_arr.find(
          (item) => item.name === cart_item_name
        );

        const thumbnail_image = document.createElement("img");
        thumbnail_image.src = order_confirm_obj.thumbnail;
        thumbnail_image.alt = `${cart_item_name} thumbnail image`;
        thumbnail_image.width = 100;
        thumbnail_image.height = 96;
        item_thumbnail.appendChild(thumbnail_image);
        order_confirm_item.appendChild(item_thumbnail);

        const item_information = document.createElement("div");
        item_information.classList.add("order-confirm-item-information");
        const item_name = document.createElement("h2");
        item_name.classList.add(
          "text-preset-4-bold",
          "order-confirm-item-name"
        );
        item_name.innerText = cart_item_name;
        item_information.appendChild(item_name);

        const item_count = document.createElement("p");
        item_count.classList.add(
          "text-preset-4-bold",
          "order-confirm-item-count"
        );
        item_count.innerText =
          cart_item.querySelector(".cart-item-count").innerText;
        item_information.appendChild(item_count);

        const item_price = document.createElement("p");
        item_price.classList.add("text-preset-4", "order-confirm-item-price");
        item_price.innerText = cart_item.querySelector(
          ".cart-item-total-price"
        ).innerText;
        item_information.appendChild(item_price);
        order_confirm_item.appendChild(item_information);

        // append as previous sibling to order_confirm_total_section
        order_confirm_total_section.insertAdjacentElement(
          "beforebegin",
          order_confirm_item
        );
      });

      // set order-confirm-total-price
      const order_total_price = document
        .querySelector(".order-total-section-price")
        .innerText.replace("$", "");

      console.log(order_total_price);

      const order_confirm_total_price = document.querySelector(
        ".order-confirm-total-price"
      );
      order_confirm_total_price.innerText = `$${parseFloat(
        order_total_price
      ).toFixed(2)}`;
    }
  });

function calculate_and_set_order_total_item_count() {
  const cart_item_sections = document.querySelectorAll(".cart-item-section");
  let total_item_count = 0;

  cart_item_sections.forEach((cart_item) => {
    const each_cart_item_count = cart_item
      .querySelector(".cart-item-count")
      .innerText.replace("x", "");
    const each_cart_item_count_decimal = parseInt(each_cart_item_count);

    total_item_count += each_cart_item_count_decimal;
  });

  const cart_section_h2_span = document.querySelector(".cart-section h2 span");

  cart_section_h2_span.innerText = `(${total_item_count})`;

  if (total_item_count === 0) {
    item_exist_section.classList.add("hidden");
    no_item_exist_section.classList.remove("hidden");
  }
}

function calculate_and_set_order_total_price() {
  const cart_item_sections = document.querySelectorAll(".cart-item-section");
  let total_price = 0;

  cart_item_sections.forEach((cart_item) => {
    const each_cart_item_total_price = cart_item
      .querySelector(".cart-item-total-price")
      .innerText.replace("$", "");
    const each_cart_item_total_price_float = parseFloat(
      each_cart_item_total_price
    );

    total_price += each_cart_item_total_price_float;
  });

  const order_total_section_price = document.querySelector(
    ".order-total-section-price"
  );

  order_total_section_price.innerText = `$${total_price.toFixed(2)}`;
}
