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

const form = document.querySelector("form");
const userId = document
  .querySelector(".form-comments")
  .getAttribute("data-user");
const input = form.querySelector(`textarea[name="content"]`);
// const postComment = document.querySelector('.post-comment');
// (() => {
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const response = await fetch(
//       `/postDetails/${form.dataset.id}/addcomments`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "application.json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: input.value }),
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     commentList.innerHTML += ` <div class="post-comment__item">
//     <div class="post-comment__item__avatar">
//       <img src="${data.avatar}" alt="" />
//     </div>
//     <div class="post-comment__item__content">
//       <div class="post-comment__item__content__info">
//         <h4 class="name">${data.username}</h4>
//         <time class="date">${data.createAt}</time>
//       </div>
//       <div class="post-comment__item__content__text">${data.comment}</div>
//     ${
//       userId == data.userId
//         ? `
//         <div class="post-comment__action">
//         <a href="/postDetails/${form.dataset.id}/${data.commentId}/delete">Xóa</a>
//       </div>
//           `
//         : ""
//     }
//     </div>
//       </div>
//   `;
//     input.value = "";
//   });
// })();

// dùng ajax để thêm comment
$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    const content = $(this).find("textarea[name='content']").val();
    $.ajax({
      url: `/postDetails/${form.dataset.id}/addcomments`,
      type: "POST",
      data: { content },
      success: function (data) {
        console.log(data);
        commentList.innerHTML += ` <div class="post-comment__item" commentId=${
          data.commentId
        }>
        <div class="post-comment__item__avatar">

          <img src="${data.avatar}" alt="" />
        </div>
        <div class="post-comment__item__content">
          <div class="post-comment__item__content__info">
            <h4 class="name">${data.username}</h4>
            <time class="date">${data.createAt}</time>
          </div>
          <div class="post-comment__item__content__text">${data.comment}</div>
        ${
          userId == data.userId
            ? `
            <div class="post-comment__action">
            <a href="/postDetails/${form.dataset.id}/${data.commentId}/delete">Xóa</a>
          </div>
              `
            : ""
        }
        </div>
          </div>
      `;
        // cap nhat lai dom cho nut xoa
        $(document).ready(function () {
          $(".post-comment__action a").click(function (e) {
            e.preventDefault();
            const commentId = $(this)
              .parent()
              .parent()
              .parent()
              .attr("commentId");
            const comment = $(this).parent().parent().parent();
            $.ajax({
              url: `/postDetails/${form.dataset.id}/${commentId}/delete`,
              type: "GET",
              success: function (data) {
                if (data.message) {
                  alert(data.message);
                } else {
                  comment.remove();
                }
              },
            });
          });
        });

        input.value = "";
      },
    });
  });
});

// const deleteComment = document.querySelectorAll(".post-comment__action a");
// $(document).ready(function () {
//   $(".post-comment__action a").click(function (e) {
//     e.preventDefault();
//     const commentId = $(this).parent().parent().parent().attr("commentId");
//     const comment = $(this).parent().parent().parent();
//     $.ajax({
//       url: `/postDetails/${form.dataset.id}/${commentId}/delete`,
//       type: "GET",
//       success: function (data) {
//         if (data.message) {
//           alert(data.message);
//         } else {
//           comment.remove();
//         }
//       },
//     });
//   });
// });
