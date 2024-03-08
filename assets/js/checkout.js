function checkout() {
  let checkOut = localStorage.getItem("myCart") ? JSON.parse(localStorage.getItem("myCart")) : [];

  if (checkOut.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi!!!',
      text: 'Giỏ hàng của bạn đang trống!'
    });
  } else {
    try {
      localStorage.removeItem("myCart");
      Swal.fire(
        'Thanh toán thành công!',
        'You clicked the button!',
        'success'
      );
      document.getElementById("cart-no").innerText = 0;
      document.querySelector(".total-price").innerText = 0;
      document.querySelector(".cart-box").innerHTML = "";

      const productTitles = Array.from(document.querySelectorAll('.cart-product-title')).map(element => element.textContent);
      const prices = Array.from(document.querySelectorAll('.cart-price')).map(element => element.textContent);
      const quantities = checkOut.map(item => item.qty);
      const totalPrice = document.querySelector('.total-price').textContent;
      let csvData = 'Tên sản phẩm, Giá thành, Số lượng\n';
      for (let i = 0; i < productTitles.length; i++) {
        csvData += `${productTitles[i]},${prices[i]},${quantities[i]}\n`;
      }
      csvData += `Tổng tiền,${totalPrice}\n`;

      const currentTime = new Date().toISOString(); // Lấy thời gian hiện tại dưới dạng chuỗi datetime
      csvData += `Thời gian đặt hàng,${currentTime}\n`; // Thêm dòng thời gian đặt hàng vào file CSV

      const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(csvBlob);
      downloadLink.download = 'order_' + Date.now() + '.csv'; // Tạo tên file duy nhất dựa trên thời gian hiện tại
      downloadLink.style.display = 'none';

      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log(error);
    }
  }
}
