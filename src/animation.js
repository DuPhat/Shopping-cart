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
