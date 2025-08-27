let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");

/**
 * ! Giỏ hàng để chứa tất cả sản phẩm đã chọn
 * ? getItem: lấy dữ liệu từ localStorage
 * ? Nếu localStorage trống thì basket là mảng rỗng
 */
let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Tính tổng số lượng sản phẩm đã chọn
 */
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

/**
 * ! Tạo giao diện giỏ hàng với các thẻ sản phẩm gồm:
 * ! hình ảnh, tên, giá, nút bấm, & tổng giá
 * ? Nếu giỏ hàng trống -> hiển thị "Cart is Empty"
 */
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />

        <div class="details">
        
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">$ ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>

          <h3>$ ${item * price}</h3>
        
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Giỏ hàng trống</h2>
    <a href="index.html">
      <button class="HomeBtn">Quay lại trang chủ</button>
    </a>
    `;
  }
};

generateCartItems();

/**
 * ! Tăng số lượng của sản phẩm đã chọn lên 1
 */
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Giảm số lượng của sản phẩm đã chọn đi 1
 */
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Cập nhật số lượng hiển thị của từng sản phẩm trong giỏ
 */
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

/**
 * ! Xóa 1 sản phẩm khỏi giỏ (bằng nút X)
 */
let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Tính tổng tiền của tất cả sản phẩm đã chọn
 * ? Nếu giỏ trống thì không hiển thị gì
 */
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2>Tổng tiền : $ ${amount}</h2>
    <button class="checkout">Thanh toán</button>
    <button onclick="clearCart()" class="removeAll">Xóa tất cả</button>
    `);
  } else return;
};

TotalAmount();

/**
 * ! Xóa toàn bộ giỏ hàng và làm trống localStorage
 */
let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
