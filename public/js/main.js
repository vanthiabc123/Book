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

const avatarUser = document.querySelector('.account-img');
const accountMenu = document.querySelector('.account ul');
avatarUser.addEventListener('click', function () {
  accountMenu.classList.toggle('active');
});
const commentList = document.querySelector('.post-comment__list');

const form = document.querySelector('form');
const input = form.querySelector(`textarea[name="content"]`);
// const postComment = document.querySelector('.post-comment');
(() => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const response = await fetch(`/postDetails/${form.dataset.id}/addcomments`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: input.value }),
    });
    const data = await response.json();
    console.log(data);
  });
})();
