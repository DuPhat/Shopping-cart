/**
 * ! Lấy phần tử shop trong HTML để hiển thị danh sách sản phẩm
 */
let shop = document.getElementById("shop");

/**
 * ! Giỏ hàng để lưu tất cả sản phẩm đã chọn
 * ? Lấy dữ liệu giỏ hàng từ localStorage
 * ? Nếu localStorage trống thì basket sẽ là mảng rỗng
 */
let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Hàm generateShop: Sinh giao diện danh sách sản phẩm
 * ? Duyệt qua shopItemsData để render từng sản phẩm
 * ? Hiển thị hình ảnh, tên, mô tả, giá và nút "Thêm vào giỏ hàng"
 */
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price } = x;
      return `
      <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>${price.toLocaleString("vi-VN")} ₫</h2>
            <button onclick="addToCart('${id}')" class="add-btn">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
      `;
    })
    .join(""));
};

generateShop();

/**
 * ! Hàm addToCart: Xử lý khi bấm nút "Thêm vào giỏ hàng"
 * ? Nếu sản phẩm chưa có trong basket thì thêm mới với item = 1
 * ? Nếu đã có thì tăng số lượng item lên 1
 * ? Sau đó lưu lại basket vào localStorage
 */
let addToCart = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};

/**
 * ! Hàm calculation: Cập nhật tổng số sản phẩm trong giỏ
 * ? Lấy ra tất cả số lượng item trong basket
 * ? Tính tổng và hiển thị ở icon giỏ hàng (cartAmount)
 */
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
