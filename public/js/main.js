// const iconDarkMode = document.querySelector(".icon-darkmode");
// const currentTheme = localStorage.getItem("theme");
// if (currentTheme) {
//   document.documentElement.setAttribute("data-theme", currentTheme);
//   if (currentTheme === "dark") {
//     iconDarkMode.classList.add("active");
//   }
// }
// toggle dark mode
// iconDarkMode.addEventListener("click", function () {
//   if (iconDarkMode.classList.contains("active")) {
//     document.documentElement.setAttribute("data-theme", "light");
//     localStorage.setItem("theme", "light");
//     iconDarkMode.classList.remove("active");
//   } else {
//     document.documentElement.setAttribute("data-theme", "dark");
//     localStorage.setItem("theme", "dark");
//     iconDarkMode.classList.add("active");
//   }
// });

const avatarUser = document.querySelector(".account-img");
const accountMenu = document.querySelector(".account ul");
avatarUser.addEventListener("click", function () {
  accountMenu.classList.toggle("active");
});

const commentList = document.querySelector(".post-comment__list");
