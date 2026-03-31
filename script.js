// Navbar shadow on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.classList.add("shadow-xl");
  } else {
    nav.classList.remove("shadow-xl");
  }
});