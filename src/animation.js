// Hiệu ứng rung giỏ hàng khi bấm "+"
let cartIcon = document.querySelector(".cart");

function addToCartEffect() {
  cartIcon.classList.add("shake");
  setTimeout(() => {
    cartIcon.classList.remove("shake");
  }, 400);
}

// Gắn sự kiện vào tất cả nút "+"
let plusButtons = document.querySelectorAll(".bi-plus-lg");
plusButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    addToCartEffect();
  });
});

let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // đổi hình sau 4 giây
}

function plusSlides(n) {
  slideIndex += n - 1;
  showSlides();
}

