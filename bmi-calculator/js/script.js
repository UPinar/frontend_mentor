// ----------------------------------------------------

const metric_button = document.querySelector(".metric-radio-button");
const imperial_button = document.querySelector(".imperial-radio-button");

metric_button.addEventListener("click", () => {
  const is_checked = metric_button.getAttribute("aria-checked") === "true";

  if (is_checked) return;

  metric_button.setAttribute("aria-checked", "true");
  imperial_button.setAttribute("aria-checked", "false");

  metric_button.querySelector("svg").innerHTML = `    
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15.5" cy="15.5" r="15.5" fill="#E1E7FE" />
      <circle cx="15.5" cy="15.5" r="7.5" fill="#345FF6" />
    </svg>
  `;

  imperial_button.querySelector("svg").innerHTML = `    
    <svg
    width="31"
    height="31"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.5"
        cy="15.5"
        r="15"
        fill="white"
        stroke="#5E6E85"
      />
    </svg>`;

  metric_button_clicked_operations();
  set_input_container_active_states();
  activate_listening_inputs();
});

imperial_button.addEventListener("click", () => {
  const is_checked = imperial_button.getAttribute("aria-checked") === "true";

  if (is_checked) return;

  imperial_button.setAttribute("aria-checked", "true");
  metric_button.setAttribute("aria-checked", "false");

  imperial_button.querySelector("svg").innerHTML = `    
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15.5" cy="15.5" r="15.5" fill="#E1E7FE" />
      <circle cx="15.5" cy="15.5" r="7.5" fill="#345FF6" />
    </svg>
  `;
  metric_button.querySelector("svg").innerHTML = `    
    <svg
    width="31"
    height="31"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.5"
        cy="15.5"
        r="15"
        fill="white"
        stroke="#5E6E85"
      />
    </svg>`;

  imperial_button_clicked_operations();
  set_input_container_active_states();
  activate_listening_inputs();
});

// ----------------------------------------------------

const form_input_containers_section = document.querySelector(
  ".bmi-calculator-form-input-containers"
);

function metric_button_clicked_operations() {
  form_input_containers_section.innerHTML = `
    <div class="bmi-calculator-form-input-height-container">
    <div class="bmi-calculator-form-input">
      <label class="text-preset-7-regular">Height</label>
      <div class="bmi-calculator-form-input-data">
        <input class="text-preset-4" maxlength="3" />
        <p class="text-preset-4">cm</p>
      </div>
    </div>
  </div>
  <div class="bmi-calculator-form-input-weight-container">
    <div class="bmi-calculator-form-input">
      <label class="text-preset-7-regular">Weight</label>
      <div class="bmi-calculator-form-input-data">
        <input class="text-preset-4" maxlength="3" />
        <p class="text-preset-4">kg</p>
      </div>
    </div>
  </div>`;
}

function imperial_button_clicked_operations() {
  form_input_containers_section.innerHTML = `
    <div class="bmi-calculator-form-input-height-container">
      <div class="bmi-calculator-form-input">
        <label class="text-preset-7-regular">Height</label>
        <div class="bmi-calculator-form-input-data">
          <input class="text-preset-4" maxlength="3" />
          <p class="text-preset-4">ft</p>
        </div>
      </div>
      <div class="bmi-calculator-form-input">
        <div class="bmi-calculator-form-input-data">
          <input class="text-preset-4" maxlength="3"/>
          <p class="text-preset-4">in</p>
        </div>
      </div>
    </div>
    <div class="bmi-calculator-form-input-weight-container">
      <div class="bmi-calculator-form-input">
        <label class="text-preset-7-regular">Weight</label>
        <div class="bmi-calculator-form-input-data">
          <input class="text-preset-4" maxlength="3" />
          <p class="text-preset-4">st</p>
        </div>
      </div>
      <div class="bmi-calculator-form-input">
        <div class="bmi-calculator-form-input-data">
          <input class="text-preset-4" maxlength="3" />
          <p class="text-preset-4">lbs</p>
        </div>
      </div>
    </div>`;
}

// ----------------------------------------------------

function set_input_container_active_states() {
  const input_data_containers = document.querySelectorAll(
    ".bmi-calculator-form-input-data"
  );
  const inputs = document.querySelectorAll(
    ".bmi-calculator-form-input-data > input"
  );

  inputs.forEach((input) => {
    input.addEventListener("focus", (e) => {
      const parent = e.target.parentElement;
      parent.style.borderColor = "var(--CLR-BLUE-500)";
    });

    input.addEventListener("blur", (e) => {
      const parent = e.target.parentElement;
      parent.style.borderColor = "var(--CLR-GREY-500)";
    });
  });
}
set_input_container_active_states();

// create an array of objects that have weight-category and bmi range

const bmi_categories = [
  {
    category: "underweight",
    min_value: 0,
    max_value: 18.5,
  },
  {
    category: "healthy weight",
    min_value: 18.5,
    max_value: 24.9,
  },
  {
    category: "overweight",
    min_value: 25,
    max_value: 29.9,
  },
  {
    category: "obesity",
    min_value: 30,
    max_value: 100,
  },
];

function activate_listening_inputs() {
  // when a value entered in an input, check every other input
  // that all of them are filled.

  const inputs = document.querySelectorAll(
    ".bmi-calculator-form-input-data > input"
  );

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const all_inputs_filled = [...inputs].every(
        (input) => input.value.length > 0
      );

      if (!all_inputs_filled) return;

      let result_bmi = 0;
      let ideal_weight_range = [];

      const is_metric = metric_button.getAttribute("aria-checked") === "true";

      if (is_metric) {
        const height = parseFloat(inputs[0].value) / 100;
        const weight = parseFloat(inputs[1].value);
        const bmi = weight / (height * height);
        result_bmi = (Math.round(bmi * 10) / 10).toFixed(1);

        ideal_weight_range = [
          Math.round(18.5 * height * height),
          Math.round(24.9 * height * height),
        ];
      } else {
        const height_ft = parseFloat(inputs[0].value);
        const height_in = parseFloat(inputs[1].value);
        const weight_st = parseFloat(inputs[2].value);
        const weight_lbs = parseFloat(inputs[3].value);

        const height = (height_ft * 12 + height_in) * 0.0254;
        const weight = (weight_st * 14 + weight_lbs) * 0.453592;
        const bmi = weight / (height * height);
        result_bmi = (Math.round(bmi * 10) / 10).toFixed(1);

        ideal_weight_range = [
          [
            Math.round((18.5 * height * height) / 14),
            Math.round((18.5 * height * height) % 14),
          ],
          [
            Math.round((24.9 * height * height) / 14),
            Math.round((24.9 * height * height) % 14),
          ],
        ];
      }

      // -------------------------------------------------

      const result_value_container = document.querySelector(
        ".bmi-calculator-result-value"
      );
      result_value_container.textContent = result_bmi;

      const result_classification_span = document.querySelector(
        ".bmi-calculator-result-classification"
      );

      // -------------------------------------------------

      const classification = bmi_categories.find((category) => {
        return (
          result_bmi >= category.min_value && result_bmi < category.max_value
        );
      });

      result_classification_span.textContent = classification.category;
      // -------------------------------------------------

      const ideal_weight_span = document.querySelector(
        ".bmi-calculator-result-range"
      );

      if (is_metric) {
        ideal_weight_span.textContent = `${ideal_weight_range[0]}kgs - ${ideal_weight_range[1]}kgs.`;
      } else {
        ideal_weight_span.textContent = `${ideal_weight_range[0][0]}st ${ideal_weight_range[0][1]}lbs - ${ideal_weight_range[1][0]}st ${ideal_weight_range[1][1]}lbs.`;
      }
    });
  });
}
activate_listening_inputs();

// ----------------------------------------------------

function updates_for_desktop_width() {
  const h1 = document.querySelector(".bmi-calculator-information > h1");

  const result_information_text_section = document.querySelector(
    ".bmi-result-information-text"
  );

  const result_information_text_h2 = document.querySelector(
    ".bmi-result-information-text h2"
  );

  const bmi_limitations_section = document.querySelector(
    ".bmi-limitations-section"
  );

  if (window.innerWidth >= 1440) {
    // --------------------------------------

    h1.classList.remove("text-preset-2");
    h1.classList.add("text-preset-1");

    // --------------------------------------
    let existing_img = result_information_text_section.querySelector("img");

    if (!existing_img) {
      const img_element = document.createElement("img");
      img_element.setAttribute(
        "src",
        "../assets/images/pattern-curved-line-left.svg"
      );
      img_element.setAttribute("alt", "A decorative line");
      img_element.setAttribute("class", "bmi-result-information-text-svg");
      img_element.setAttribute("width", "85");
      img_element.setAttribute("height", "200");
      result_information_text_section.prepend(img_element);

      // --------------------------------------

      result_information_text_h2.classList.remove("text-preset-3");
      result_information_text_h2.classList.add("text-preset-2");

      // --------------------------------------

      existing_img = bmi_limitations_section.querySelector("img");

      if (!existing_img) {
        console.log("hello");
        const img_element = document.createElement("img");
        img_element.setAttribute(
          "src",
          "../assets/images/pattern-curved-line-right.svg"
        );
        img_element.setAttribute("alt", "A decorative line");
        img_element.setAttribute("class", "bmi-limitations-section-svg");
        img_element.setAttribute("width", "95");
        img_element.setAttribute("height", "123");

        bmi_limitations_section.insertBefore(
          img_element,
          bmi_limitations_section.children[1]
        );
      }
    }
  } else {
    // --------------------------------------

    h1.classList.remove("text-preset-1");
    h1.classList.add("text-preset-2");

    // --------------------------------------

    let existing_img = result_information_text_section.querySelector("img");
    if (existing_img) {
      existing_img.remove();
    }

    // --------------------------------------

    result_information_text_h2.classList.remove("text-preset-2");
    result_information_text_h2.classList.add("text-preset-3");

    // --------------------------------------

    existing_img = result_information_text_section.querySelector("img");
    if (existing_img) {
      existing_img.remove();
    }
  }
}

window.addEventListener("resize", updates_for_desktop_width);
window.addEventListener("DOMContentLoaded", updates_for_desktop_width);

// ----------------------------------------------------
