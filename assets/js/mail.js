// tabs
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".content");
let tabIndex = 0;

tabs.forEach((tab) => tab.addEventListener("click", changeTabHandler));

function changeTabHandler() {
  tabs[tabIndex].classList.remove("tab_active");
  tabContents[tabIndex].classList.remove("content_active");

  tabIndex = +this.dataset.tab;

  tabs[tabIndex].classList.add("tab_active");
  tabContents[tabIndex].classList.add("content_active");
}

// input mask for number
const phone = document.getElementById("phone");
const maskOptions = {
  mask: "+{7}(000)000-00-00",
};
const mask = IMask(phone, maskOptions);

// validate form
const validator = new JustValidate("#form");
validator
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Имя обязательно для заполнения",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимальная длина имени 2 символа",
    },
  ])
  .addField("#phone", [
    {
      rule: "required",
      errorMessage: "Введите ваш номер телефона",
    },
    {
      rule: "minLength",
      value: 16,
      errorMessage: "Это не номер телефона",
    },
  ])
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "Введите ваш e-mail",
    },
    {
      rule: "email",
      errorMessage: "Это не e-mail",
    },
  ])
  .addField("#message", [
    {
      rule: "required",
      errorMessage: "Вы забыли ввести сообщение",
    },
  ]);

document.querySelector("#form").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (validator.isValid && mask.masked.isComplete) {
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    // await fetch("mail.php", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    // });

    console.log(formData);

    Swal.fire({
      title: "Ваше сообщение отправлено!",
      text: "Наши специалисты скоро с вами свяжутся!",
      icon: "success",
    });
    e.target.reset();
  }
});

const header = document.querySelector(".header");

window.addEventListener("scroll", (e) => {
  window.scrollY > 1
    ? header.classList.add("header__sticky")
    : header.classList.remove("header__sticky");
});

AOS.init({
  offset: 120, 
  once: true
});
