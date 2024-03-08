let arrProduct = [
    { ma: "45", ten: "Cá Hồi sốt kem", hinh: "assets/doan/cahoi.png", gia: "189.000", mota: "Cá hồi Na Uy hòa quyện cùng kem tươi" },
    { ma: "46", ten: "Bắp bò hun khói", hinh: "assets/doan/bapbohunkhoi.jpg", gia: "155.000", mota: "Thịt bò mềm mịn, ngọt béo tuyệt vời, hòa cùng nước sốt đậm đà" },
    { ma: "47", ten: "Súp tôm hùm", hinh: "assets/doan/bostontomhum.jpg", gia: "217.000", mota: "Tôm hùm tươi ngon, nồng nàn mùi hải sản thơm phức" },
    { ma: "48", ten: "Gà nướng mật ong", hinh: "assets/doan/gamuong.jpg", gia: "139.000", mota: "Gà nướng thơm phức, da giòn, thịt mềm mọng nước" },
    { ma: "49", ten: "Mì hải sản", hinh: "assets/doan/MiHS.png", gia: "135.000", mota: "Hải sản tươi ngon, đa dạng, ngon miệng, hấp dẫn mắt" },
    { ma: "50", ten: "Sườn bò lúc lắc", hinh: "assets/doan/Suonbo.png", gia: "200.000", mota: "Bò mềm cùng rau củ tươi ngon, ngọt béo" }
];
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
    loadCart();
};
//closeCart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

const listProducts = document.getElementById("list-products");
let str = "";
for (let i = 0; i < arrProduct.length; i++) {
    var obj = JSON.stringify(arrProduct[i]);
    str += `
                      <li class="item">
                      <img class"product-img" src="${arrProduct[i].hinh}" alt="">
                      <div class="stars">
                          <span>
                              <img src="assets/star.png" alt="">
                          </span>
                          <span>
                              <img src="assets/star.png" alt="">
                          </span>
                          <span>
                              <img src="assets/star.png" alt="">
                          </span>
                          <span>
                              <img src="assets/star.png" alt="">
                          </span>
                          <span>
                              <img src="assets/star.png" alt="">
                          </span>
                      </div>
                      <div class="name">${arrProduct[i].ten}</div>
                      <div class="desc">${arrProduct[i].mota}</div>
                      <div class="item-footer">
                          <div class="price">${arrProduct[i].gia} VNĐ</div>
                          <button class="detail" onclick="addCart(${arrProduct[i].ma})" id="detail">Đặt món</button>
                      </div>
                    </li>
  `;
}
listProducts.innerHTML = str;
let arrCart = [];

function addCart(ma) {
    let item;
    let count = 0;
    let quantity = 0;
    let arrCart = [];
    let myCart = (localStorage.getItem("myCart") == undefined) ? [] : JSON.parse(localStorage.getItem("myCart"));
    myCart.forEach(element => {
        arrCart.push(element);
    });
    for (let i = 0; i < arrProduct.length; i++) {
        if (arrProduct[i].ma == ma) {
            item = arrProduct[i];
            break;
        }
    }
    for (let i = 0; i < arrCart.length; i++) {
        if (ma == arrCart[i].sp.ma) {
            count++;
            break;
        }
    }
    let cartItem
    if (count != 0) {
        alert('sản phẩm đã tồn tại trong giỏ hãy thêm ở trong.');
    }
    if (count == 0) {
        cartItem = { sp: item, qty: 1 };
        arrCart.push(cartItem);
    }
    localStorage.setItem("myCart", JSON.stringify(arrCart));
    console.log(arrCart);
    updateSoLuong();
    loadCart();
}
//loadCart
function loadCart() {
    strData = "";
    let arrayCart = JSON.parse(localStorage.getItem("myCart"));
    arrayCart.forEach(item => {
        strData += `<img src="${item.sp.hinh}" alt="" class="cart-img">
                  <div class="detail-box">
                      <div class="cart-product-title">${item.sp.ten}</div>
                      <div class="cart-price">${item.sp.gia}</div>
                      <div class="quantity-cart">
                          <button class="cart-quantity" onclick="updateQuantity('${item.sp.ten}', '${item.qty}' ,'giam')">-</button>
                          <input type="number" disable value="${item.qty}"id="cart-quantity" min="1" class="cart-quantity">
                          <button class="cart-quantity" onclick="updateQuantity('${item.sp.ten}', '${item.qty}', 'tang')">+</button>
                      </div>
                  </div>
                  <!-- remove cart -->
                  <button id="cart-remove" onclick="removeCartItem('${item.sp.ten}')"><i class='bx bxs-trash-alt cart-remove'> </i> </button>
`;
    });
    document.querySelector(".cart-box").innerHTML = strData;
    console.log(arrCart);
    updateSoLuong();
    updateTotal();

}

function removeCartItem(title) {
    // var title = document.getElementById("cart-remove").value;
    let arrayCart = JSON.parse(localStorage.getItem("myCart"));
    var temp = arrayCart.filter(temp => temp.sp.ten != title);
    localStorage.setItem("myCart", JSON.stringify(temp));
    let arrayCart1 = JSON.parse(localStorage.getItem("myCart"));
    strData = "";
    arrayCart1.forEach(item => {
        strData += `<img src="${item.sp.hinh}" alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${item.sp.ten}</div>
                    <div class="cart-price">${item.sp.gia}</div>
                    <div class="quantity-cart">
                        <button class="cart-quantity" onclick="updateQuantity('${item.sp.ten}', '${item.qty}' ,'giam')">-</button>
                        <input type="number" disable value="${item.qty}"id="cart-quantity" min="1" class="cart-quantity">
                        <button class="cart-quantity" onclick="updateQuantity('${item.sp.ten}', '${item.qty}', 'tang')">+</button>
                    </div>
                </div>
                <!-- remove cart -->
                <button id="cart-remove" onclick="removeCartItem('${item.sp.ten}')"><i class='bx bxs-trash-alt cart-remove'> </i> </button>
      `;
    });
    document.querySelector(".cart-box").innerHTML = strData;
    arrCart = JSON.parse(localStorage.getItem("myCart"));
    updateSoLuong();
    updateTotal();
}
//update quantity
function updateQuantity(title, quanti, str) {
    // for(let product of arrCart){
    //     if(product.sp.title == title){
    //         product.qty = quanti +1;
    //     }
    // }
    let arrCart = JSON.parse(localStorage.getItem("myCart"));
    for (var i = 0; i < arrCart.length; i++) {
        if (arrCart[i].sp.ten == title && str == "giam" && arrCart[i].qty > 1) {
            arrCart[i].qty--;
            break;
        }
        if (arrCart[i].sp.ten == title && str == "tang") {
            arrCart[i].qty++;
            break;
        }

    }
    // console.log(arrCart);
    localStorage.setItem("myCart", JSON.stringify(arrCart));
    strData = "";
    let arrayCart = JSON.parse(localStorage.getItem("myCart"));
    arrayCart.forEach(item => {
        strData += `<img src="${item.sp.hinh}" alt="" class="cart-img">
      <div class="detail-box">
          <div class="cart-product-title">${item.sp.ten}</div>
          <div class="cart-price">${item.sp.gia}</div>
          <div class="quantity-cart">
              <button class="cart-quantity" onclick="updateQuantity('${item.sp.ten}', '${item.qty}' ,'giam')">-</button>
              <input type="number" disable value="${item.qty}"id="cart-quantity" min="1" class="cart-quantity">
              <button class="cart-quantity" onclick="updateQuantity('${item.sp.ten}', '${item.qty}', 'tang')">+</button>
          </div>
      </div>
      <!-- remove cart -->
      <button id="cart-remove" onclick="removeCartItem('${item.sp.ten}')"><i class='bx bxs-trash-alt cart-remove'> </i> </button>
`;
    });
    document.querySelector(".cart-box").innerHTML = strData;

    updateSoLuong();
    updateTotal();
}
//update Sluong
function updateSoLuong() {
    let arrayCart = JSON.parse(localStorage.getItem("myCart"));
    var totalQty = 0;
    arrayCart.forEach(item => {
        totalQty = totalQty + item.qty;
    });
    document.getElementById("cart-no").innerText = totalQty;
}
//update total
function updateTotal() {
    let arrayCart = JSON.parse(localStorage.getItem("myCart"));
    var total = 0;
    arrayCart.forEach(item => {
        var price = parseFloat(item.sp.gia);
        var quantity = item.qty;
        total = total + (price * quantity);
    });
    //if price contain some cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = total + ".000" + " VNĐ";

}

function format2(n, currency) {
    let money = n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
    money.split(",");
    return money[0];
}
let totalItem = (localStorage.getItem("myCart") == undefined) ? [] : JSON.parse(localStorage.getItem("myCart"));
document.getElementById("cart-no").innerText = totalItem.length;
// phân trang

const products = document.querySelectorAll(".item"); // lấy tất cả item ra
const itemsPerPage = 6; // Số sản phẩm mỗi trang
const numPages = Math.ceil(products.length / itemsPerPage); // Tổng số trang

// Hiển thị danh sách sản phẩm cho trang đầu tiên
showPage(1);

// Tạo các nút liên kết phân trang
const pagination = document.querySelector(".pagination");
for (let i = 1; i <= numPages; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = i;
    link.href = "#";
    if (i === 1) {
        li.classList.add("active");
    }

    li.appendChild(link);
    pagination.appendChild(li);

    // Xử lý sự kiện click cho từng nút liên kết
    link.addEventListener("click", function(event) {
        event.preventDefault();
        // Xóa class active của tất cả các nút liên kết khác
        const activeLink = pagination.querySelector("li.active");
        if (activeLink) activeLink.classList.remove("active");
        // Thêm class active vào nút liên kết được click
        li.classList.add("active");

        showPage(i);
    });
}
// Hiển thị sản phẩm cho trang được chọn
function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    for (let i = 0; i < products.length; i++) {
        if (i >= startIndex && i < endIndex) {
            products[i].style.display = "block";
        } else {
            products[i].style.display = "none";
        }
    }
}
//end phân trang