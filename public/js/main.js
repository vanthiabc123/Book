// window.addEventListener("load", function () {
//   const sliderMan = document.querySelector(".slider-main");
//   const sliderItems = document.querySelectorAll(".slider-item");
//   const dotItems = document.querySelectorAll(".slider-dot-item");
//   const sliderItemWitdth = sliderItems[0].offsetWidth;
//   const slideLength = sliderItems.length;

//   [...dotItems].forEach((item) =>
//     item.addEventListener("click", function (e) {
//       const slideIndex = parseInt(e.target.dataset.index);
//       index = slideIndex;
//       sliderMan.style.transform = `translateX(-${
//         slideIndex * sliderItemWitdth
//       }px)`;
//     })
//   );
//   let index = 0;
//   setInterval(() => {
//     index++;
//     if (index >= slideLength) {
//       index = 0;
//     }
//     sliderMan.style.transform = `translateX(-${index * sliderItemWitdth}px)`;
//   }, 3000);
// });

// loadmore jquery
// $(document).on("click", ".btn-primary", function () {
//   var id = $(this).attr("id");
//   $(".btn-primary").html("Loading...");
//   $.ajax({
//     url: "loadmore.php",
//     method: "POST",
//     data: { id: id },
//     dataType: "text",
//     success: function (data) {
//       if (data != "") {
//         $(".show-more-btn").remove();
//         $(".post-new .post-list").append(data);
//       } else {
//         $(".show-more-btn").html("Hết bài viết");
//       }
//     },
//   });
// });
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
