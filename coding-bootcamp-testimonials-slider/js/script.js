const person_information_array = [
  {
    image: "../images/image-john.jpg",
    bio: `“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”`,
    name: "John Tarkpor",
    title: "Junior Front-end Developer",
  },
  {
    image: "../images/image-tanya.jpg",
    bio: `“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”`,
    name: "Tanya Sinclair",
    title: "UX Engineer",
  },
];

const slider_buttons = document.querySelectorAll(".img-slider-container > *");

const person_image = document.querySelector(".person-image-section img");
const person_information_bio = document.querySelector(
  ".person-information-bio p"
);
const person_information_name = document.querySelector(
  ".person-information-name"
);
const person_information_title = document.querySelector(
  ".person-information-title"
);

slider_buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let person_index = person_information_array.findIndex(
      (person) => person.name === person_information_name.innerHTML
    );

    if (person_index === 0) person_index = 1;
    else person_index = 0;

    person_image.src = person_information_array[person_index].image;
    person_information_bio.innerHTML =
      person_information_array[person_index].bio;
    person_information_name.innerHTML =
      person_information_array[person_index].name;
    person_information_title.innerHTML =
      person_information_array[person_index].title;
  });
});

window.addEventListener("resize", function () {
  const text_information_bio = document.querySelector(
    ".person-information-bio p"
  );
  const text_person_information_name = document.querySelector(
    ".person-information-name"
  );

  const text_person_information_title = document.querySelector(
    ".person-information-title"
  );

  if (window.innerWidth >= 768) {
    text_information_bio.classList.remove("text-preset-1-mobile");
    text_person_information_name.classList.remove("text-preset-2-bold-mobile");
    text_person_information_title.classList.remove(
      "text-preset-2-medium-mobile"
    );
    text_information_bio.classList.add("text-preset-1");
    text_person_information_name.classList.add("text-preset-2-bold");
    text_person_information_title.classList.add("text-preset-2-medium");
  } else {
    text_information_bio.classList.remove("text-preset-1");
    text_person_information_name.classList.remove("text-preset-2-bold");
    text_person_information_title.classList.remove("text-preset-2-medium");

    text_information_bio.classList.add("text-preset-1-mobile");
    text_person_information_name.classList.add("text-preset-2-bold-mobile");
    text_person_information_title.classList.add("text-preset-2-medium-mobile");
  }
});
