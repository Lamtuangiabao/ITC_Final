import { data } from "./data.js";

//hàm tạo element
function create_element(tag, att, sub_tag) {
  const e = document.createElement(tag);
  if (att) {
    for (let key in att) {
      // console.log(key);
      e[key] = att[key];
      // console.log(att[key]);
    }
  }
  //// ví dụ sub_tag
  // {
  //   i: {
  //     className: "fa-solid fa-cart-plus fa-lg";
  //   }
  // }
  ////data ví dụ sub_key
  if (sub_tag) {
    for (let key in sub_tag) {
      const a = document.createElement(key);
      // console.log(key);
      if (sub_tag[key]) {
        for (let k in sub_tag[key]) {
          // console.log(key);
          a[k] = sub_tag[key][k];
          // console.log(att[key]);
        }
      }
      e.appendChild(a);
    }
  }
  return e;
}

//tao các thẻ đã thêm vào giỏ hàng
if (localStorage.cart) {
  let cart = JSON.parse(localStorage.cart);
  let tong = 0; //tổng giá tiền
  // duyệt qua chữ số tiền của từng thẻ card
  for (let product of cart) {
    // console.log(product.id);
    for (const key in data)
      for (let i = 0; i < data[key].length; i++)
        if (i > 0) {
          // console.log(data[key][i]);
          if (data[key][i].id == product.id) {
            let t = 0;
            for (let j = 0; j < data[key][i].price.length; j++) {
              if (
                data[key][i].price[j] != "." &&
                data[key][i].price[j] != " "
              ) {
                // console.log(data[key][i].price[j]);
                t *= 10;
                t += parseInt(data[key][i].price[j]);
              }
            }
            // console.log(t * product.number); //đúng
            tong += t * product.number; //tổng số tiền của giỏ hàng
            let div_card = create_element("div", {
              className: "product_item",
              id: product.id,
            });

            let image = create_element("img", {
              className: "p_items imge", //auto cập nhập giá khi lấy thêm ở bên trang products
              src: data[key][i].image,
              alt: "thay the",
            });

            let name = create_element("H5", {
              className: "p_items name", //auto cập nhập giá khi lấy thêm ở bên trang products
              innerText: data[key][i].name,
            });

            let price = create_element("H4", {
              className: "p_items price", //auto cập nhập giá khi lấy thêm ở bên trang products
              innerHTML: data[key][i].price,
            });

            let number = create_element("div", {
              className: "p_items numbers", //auto cập nhập giá khi lấy thêm ở bên trang products
              innerText: product.number,
            });

            let deleted = create_element(
              "button",
              {
                className: "p_items delete", //auto cập nhập giá khi lấy thêm ở bên trang products
                id: product.id,
              },
              {
                i: {
                  className: "fa-solid fa-delete-left fa-x10",
                },
              },
            );
            div_card.appendChild(image);
            div_card.appendChild(name);
            div_card.appendChild(price);
            div_card.appendChild(number);
            div_card.appendChild(deleted);
            document.querySelector("#products").appendChild(div_card);
          }
        }
  }
  //tính tổng và tạo 1 thẻ tính tổng số tiền ở đây
  let div_card = create_element("div", {
    className: "product_item",
  });

  let total = create_element("div", {
    className: "p_items ",
    id: "total",
    innerText: tong.toLocaleString("vi-VN"), //để ra các dấu chấm giữua các số theo kiểu Việt Nam
  });
  let total_text = create_element("div", {
    className: "p_items",
    innerText: "Tổng thành tiền của pạn nà:",
  });
  div_card.appendChild(total_text);
  div_card.appendChild(total);

  document.querySelector("#products").appendChild(div_card);
}

//Xóa hàm
function deleted(array, a) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == a) {
      // console.log(array[i]);
      // console.log(array[i + 1]);
      for (let o = i; o < array.length; o++) array[o] = array[o + 1];
      break;
    }
  }
  array.length = array.length - 1;
}

//Nhấn vào nút xóa sản phảm khỏi giỏ hàng
document.querySelectorAll(".delete").forEach((i) => {
  i.addEventListener("click", () => {
    // console.log(i.id);
    document.querySelectorAll(".product_item").forEach((item) => {
      //Xóa ở localStorage
      let cart = JSON.parse(localStorage.cart);
      // tổng giá tiền
      let tong = 0;
      for (
        let j = 0;
        j < document.querySelector("#total").innerText.length;
        j++
      ) {
        if (
          document.querySelector("#total").innerText[j] != "." &&
          document.querySelector("#total").innerText != " "
        ) {
          // console.log(data[key][i].price[j]);
          tong *= 10;
          tong += parseInt(document.querySelector("#total").innerText[j]);
        }
      }
      // console.log("tong trươc khi tru", tong);
      for (let product of cart) {
        //product.id là trong localStorage nếu nó bằng i.id tức là id ở trong cái button được nhấn vào
        if (product.id == i.id) {
          //Tính toán lại tổng số tiền hiện có:
          //   // console.log(product.id);
          for (const key in data)
            for (let o = 0; o < data[key].length; o++)
              if (o > 0) {
                //         // console.log(data[key][i]);
                if (data[key][o].id == i.id) {
                  let t = 0;
                  for (let j = 0; j < data[key][o].price.length; j++) {
                    if (
                      data[key][o].price[j] != "." &&
                      data[key][o].price[j] != " "
                    ) {
                      //               // console.log(data[key][i].price[j]);
                      t *= 10;
                      t += parseInt(data[key][o].price[j]);
                    }
                  }
                  // console.log(t * product.number); //đúng
                  tong -= t * product.number; //tổng số tiền của giỏ hàng
                }
              }
          // console.log("tong sau khi tru", tong);
          document.querySelector("#total").innerText =
            tong.toLocaleString("vi-VN"); //để ra các dấu chấm giữua các số theo kiểu Việt Nam
          //Xóa sản phẩm đó bên trong cart
          deleted(cart, i.id);
        }
      }
      if (i.id == item.id) item.remove(); // Xóa hẳn khỏi DOM
      //Cập nhập lại mảng ở trên local Storage
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
});

// nhấn vào logo thương hiệu chuyển về trang main
document.querySelector("#Home").addEventListener("click", () => {
  location = "./index.html";
});
