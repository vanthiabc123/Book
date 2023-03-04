const bar_btn = document.getElementById('bar_btn');
const sideBar = document.getElementsByClassName('sidebar')[0];

if (bar_btn) {
  bar_btn.addEventListener('click', () => {
    sideBar.classList.toggle('collapse');
  });
}

const alert = document.getElementsByClassName('alert')[0];
if (alert) {
  const closeBtn = alert.firstChild;
  closeBtn.addEventListener('click', () => {
    alert.remove();
  });
}
