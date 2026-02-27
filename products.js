import { data } from "./data.js";

function create_element(tag_name, attributes) {
  let element = document.createElement(tag_name);

  if (attributes) {
    for (let key in attributes) {
      element[key] = attributes[key];
    }
  }
  return element;
}

for (const key in data)
  for (let i = 0; i < data[key].length; i++)
    if (i > 0) {
      let div_card = create_element("div", {
        className: "card",
        id: [key],
      });

      let div_image_container = create_element("div", {
        className: "image-container",
      });

      let image = create_element("img", {
        src: data[key][i].image,
      });

      let div_container = create_element("div", {
        className: "container",
      });

      let h5_name = create_element("h5", {
        className: "product-name",
        innerText: data[key][i].name,
      });

      let h6_price = create_element("h6", {
        innerHTML: "<b>Price: </b>",
      });

      let h_price = create_element("h4", {
        innerHTML: data[key][i].price,
      });

      let btn = create_element("button", {
        innerText: "Thêm vào giỏ hàng",
        value: data[key][i].id,
        id: "them", //để bấm vào hiện lên modal lấy số lượng cần thiết
      });

      div_image_container.appendChild(image);
      div_container.appendChild(h5_name);
      div_container.appendChild(h6_price);
      div_container.appendChild(h_price);
      div_container.appendChild(btn);
      div_card.appendChild(div_image_container);
      div_card.appendChild(div_container);

      document.getElementById("products").appendChild(div_card);
    }

////////////////////////tìm kiếm
const search_input = document.getElementById("searching");

search_input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let search_input_value = document.getElementById("searching").value;
    let list_product = document.getElementsByClassName("card");
    let product_names = document.getElementsByClassName("product-name");
    //vòng lặp for bên dưới là thể hiện ra các sản phẩm trùng với từ khóa trên thanh tìm kiếm
    for (let i = 0; i < list_product.length; i++) {
      if (
        product_names[i].innerText.includes(search_input_value.toUpperCase())
      ) {
        list_product[i].style = "display: block";
      } else {
        //nếu không có sản phẩm nào trùng lặp thì không thể hiện ra gì hết
        list_product[i].style = "display: none";
      }
    }
  }
});
//nhấp vô icon kính lúp
document.querySelector("#find").addEventListener("click", () => {
  let search_input_value = document.getElementById("searching").value;
  let list_product = document.getElementsByClassName("card");
  let product_names = document.getElementsByClassName("product-name");
  //vòng lặp for bên dưới là thể hiện ra các sản phẩm trùng với từ khóa trên thanh tìm kiếm
  for (let i = 0; i < list_product.length; i++) {
    if (product_names[i].innerText.includes(search_input_value.toUpperCase())) {
      list_product[i].style = "display: block";
    } else {
      //nếu không có sản phẩm nào trùng lặp thì không thể hiện ra gì hết
      list_product[i].style = "display: none";
    }
  }
});

// hiệu ứng nhấn vào icon filter sẽ hiển ra bảng tổng filter
document.querySelector(".filter").addEventListener("click", () => {
  document.querySelector(".filter_board").classList.add("show");
});

// hiẹu ứng click ra ngoài icon filter hoặc là bảng filter sẽ tắt bảng tổng filter
const board = document.querySelector(".filter_board");
document.addEventListener("click", function (event) {
  // console.log(event);
  if (
    !document.querySelector(".filter").contains(event.target) &&
    !board.contains(event.target)
  ) {
    board.classList.remove("show");
  }
});
// Giải thích:
// document.addEventListener("click", function(event) {
// Gắn một listener cho toàn bộ tài liệu (document).
// Bất kỳ khi nào người dùng click ở đâu trên trang, hàm callback sẽ được gọi.
// Tham số event chứa thông tin về sự kiện click, trong đó event.target là phần tử cụ thể mà người dùng vừa click.
//   if (!board.contains(event.target)) {
// board.contains(event.target) kiểm tra xem phần tử được click (event.target) có nằm bên trong board hay không.
// Dấu ! phủ định: nghĩa là “nếu phần tử được click không nằm trong .filter_board”.
//     board.style.display = "none"; // ẩn khi click ra ngoài
//   }
// });
// Nếu click ra ngoài, thay đổi CSS inline của board thành display: none, tức là ẩn nó đi.
// Nếu click bên trong board và vào icon filter, điều kiện sai, nên không làm gì cả.

// Hiệu ứng click vào filter sẽ lọc đúng với những button được click
document.querySelectorAll(".accessories").forEach((item) => {
  let list_product = document.getElementsByClassName("card");
  item.value = false;
  item.addEventListener("click", () => {
    if (item.value == "false") item.value = true;
    else item.value = false;
    item.classList.toggle("clicked");
    // Duyệt mảng khi mỗi lần bấm vào nút thì duyệt xem có nút nào là false không ,nếu có thì chỉ hiện true còn nếu không thì mặc định hiện hét
    let t = 0;
    document.querySelectorAll(".accessories").forEach((item) => {
      if (item.value == "true") t += 1;
    });
    // console.log(t);
    // nếu như nhỏ hơn tổng các nút hiện có thì tức là đang có  sự lọc thì chỉ lọc những cái đang được chọn
    if (t < document.querySelectorAll(".accessories").length && t > 0) {
      //vòng lặp của các nút
      document.querySelectorAll(".accessories").forEach((item) => {
        if (item.value == "true") {
          //vòng lặp của card sản phẩm
          for (let i = 0; i < list_product.length; i++) {
            if (list_product[i].id === item.id)
              list_product[i].style = "display: block";
            // console.log(list_product[i].id);
          }
        } else
          for (let i = 0; i < list_product.length; i++)
            if (list_product[i].id === item.id)
              //id này là của các nút có giá trị là false//Nếu tổng các nút false nhỏ hơn tổng các nút hiện tại
              list_product[i].style = "display: none";
      });
    } else
      for (let i = 0; i < list_product.length; i++)
        list_product[i].style = "display: block";
  });
});
// Logic: Cho 1 biến đếm t các số nút có giá trị là true,nếu tổng số nút true nhỏ hơn tổng số nút tức loại sản phẩm hiện có và lớn hơn 0 thì sẽ bắt đầu duyệt vòng lặp đầu tiên của các nút ,kiếm xem hiện tại nút nào đang giữ giá trị là true,nếu đúng là true thì sẽ duyệt vòng lặp thứ 2 là tất cả list_product các thẻ có className là card được tạo ra bên trong html chứa các sản phẩm và tìm xem thẻ nào trùng id thì display:block,nếu như vòng lặp của các card có class là accessories mà false thì sẽ tiếp tục duyệt vòng lặp và thể hiện là display:none,thoát ra bên ngoài nếu như bỏ chọn từng thẻ filter thì tổng thẻ có giá trị là true sẽ về 0 và sẽ lại tiếp tục xét vogng lặp for để cho display:clock tất cả vì không có loại sản phẩm nào được chọn để filter

// Cách sử dụng: khi nhập vào giá tiền và enter nó sẽ lọc ra các giá tương ứng ,nhưng nếu sau đó nhấp vào 1 trong các nút filter thì phải enter lại cái input thì nó mới lọc ra đúng với filter đã nhấn với giá đã nhập mong muốn

document.querySelector("#price_input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let u = []; //mỗi lần nhấn Enter là sẽ có 1 mảng mới hoàn toàn rỗng dược tạo mới
    let r = parseInt(document.querySelector("#price_input").value);
    if (r == null) alert("Không được để trống nho pạn");
    else if (r <= 0) alert("Không được nhỏ hơn 0 nho pạn");
    else if (Number.isNaN(r)) alert("Không được để trống nho pạn");
    else {
      let list_product = document.querySelectorAll(".card");
      // dem so lương nut filter
      let dem = 0;
      let flag = false;
      document.querySelectorAll(".accessories").forEach((item) => {
        if (item.value == "true") {
          dem += 1;
          u.push(item.id);
        }
      });
      // Nếu như có nút filter và tổng số nút có filter nhỏ hơn tổng số nút hiện có hiện tại
      if (dem < document.querySelectorAll(".accessories").length && dem > 0) {
        list_product.forEach((item) => {
          for (let i = 0; i < u.length; i++) {
            //nếu đúng 1 trong các nút filter thì flag bằng true tức có thể kiểm tra qua giá tiền
            if (item.id == u[i]) {
              flag = true;
              break;
            }
          }
          if (flag) {
            // lấy được giá và chuyẻn sang dạng số int từ các thẻ card: Duyệt qua từng ký tự của số và dùng 1 biến t ,mỗi lần cộng 1 số mới là nhân với 10 và cộng với từng ksy tự được chuyển thành số đó
            const p = item.querySelector("h4");
            // console.log(p.innerText); //lấy được giá của từng thẻ
            let t = 0;
            // duyệt qua chữ số tiền của từng thẻ card
            for (let i = 0; i < p.innerText.length; i++) {
              if (p.innerText[i] != ".") {
                t *= 10;
                t += parseInt(p.innerText[i]);
              }
            }
            // console.log(item.id);
            //in ra được t là giá theo kiểu số nguyên của các thẻ
            if (t <= r) {
              // for (let i = 0; i < u.length; i++) console.log("u là", u[i]); //vì quan có 13 sản phẩm nên nó sẽ in ra 13 lần duyệt giá
              item.style.display = "block";
              flag = false;
            } else {
              item.style.display = "none";
              flag = false;
            } // ẩn nếu không thỏa điều kiện theo giá
          } else item.style.display = "none"; // ẩn nếu không thỏa điều kiện theo id
        });
      }
      // trường hợp không có nút filter ,dem == 0 hoặc là dem == tổng số nút hiện có,thì hiện tất cả các thẻ có số tiền nhỏ hơn hoặc bằng với r là giá được điền vào
      else {
        let min = 0;
        // trường hợp số nhập vào nhỏ hơn cả thẻ có giá trị tiền nhỏ nhất => thể hiện hết mặc định
        list_product.forEach((item, index) => {
          const p = item.querySelector("h4");
          let t = 0;
          // duyệt qua chữ số tiền của từng thẻ card
          for (let i = 0; i < p.innerText.length; i++) {
            if (p.innerText[i] != ".") {
              t *= 10;
              t += parseInt(p.innerText[i]);
            }
          }
          if (index == 0) min = t; //gán giá trị dầu tiên ở mảng cho min để có giá trị tham chiếu
          if (t < min) min = t;
        });
        if (r < min) {
          alert("Giá nhỏ quá hong cóa pé ơi");
          for (let i = 0; i < list_product.length; i++)
            list_product[i].style = "display: block";
        } else {
          //  // lấy được giá và chuyẻn sang dạng số int từ các thẻ card:
          list_product.forEach((item) => {
            const p = item.querySelector("h4");
            let t = 0;
            // duyệt qua chữ số tiền của từng thẻ card
            for (let i = 0; i < p.innerText.length; i++) {
              if (p.innerText[i] != ".") {
                t *= 10;
                t += parseInt(p.innerText[i]);
              }
            }
            //in ra được t là giá theo kiểu số nguyên của các thẻ
            if (t <= r)
              item.style.display = "block"; //Nếu t nhỏ hơn giá được nhập vào thì hiện ra trên tổng tất cả thẻ
            else item.style.display = "none"; // ẩn nếu không thỏa điều kiện }
          });
        }
      }
    }
    //sau khi nhấn Enter thì sau quá trình xử lý thì sẽ xóa số đã nhập ở thanh input
    document.querySelector("#price_input").value = "";
  }
});

//nhấn vào nút xác nhận giá bên trong filter giá
document.querySelector("#price_confirm").addEventListener("click", () => {
  // console.log("helo");
  let u = []; //mỗi lần nhấn Enter là sẽ có 1 mảng mới hoàn toàn rỗng dược tạo mới chứa các nút được chọn filter
  let r = parseInt(document.querySelector("#price_input").value);
  console.log(r === NaN);
  if (r == null) alert("Không được để trống nho pạn");
  else if (r <= 0) alert("Không được nhỏ hơn 0 nho pạn");
  else if (Number.isNaN(r))
    alert("Không được để trống nho pạn"); //kiểm tra NaN
  else {
    let list_product = document.querySelectorAll(".card");
    // dem so lương nut filter
    let dem = 0;
    let flag = false;
    document.querySelectorAll(".accessories").forEach((item) => {
      if (item.value == "true") {
        dem += 1;
        u.push(item.id);
      }
    });
    // Nếu như có nút filter và tổng số nút có filter nhỏ hơn tổng số nút hiện có hiện tại
    if (dem < document.querySelectorAll(".accessories").length && dem > 0) {
      list_product.forEach((item) => {
        for (let i = 0; i < u.length; i++) {
          //nếu đúng 1 trong các nút filter thì flag bằng true tức có thể kiểm tra qua giá tiền
          if (item.id == u[i]) {
            flag = true;
            break;
          }
        }
        if (flag) {
          // lấy được giá và chuyẻn sang dạng số int từ các thẻ card: Duyệt qua từng ký tự của số và dùng 1 biến t ,mỗi lần cộng 1 số mới là nhân với 10 và cộng với từng ksy tự được chuyển thành số đó
          const p = item.querySelector("h4");
          // console.log(p.innerText); //lấy được giá của từng thẻ
          let t = 0;
          // duyệt qua chữ số tiền của từng thẻ card
          for (let i = 0; i < p.innerText.length; i++) {
            if (p.innerText[i] != ".") {
              t *= 10;
              t += parseInt(p.innerText[i]);
            }
          }
          // console.log(item.id);
          //in ra được t là giá theo kiểu số nguyên của các thẻ
          if (t <= r) {
            for (let i = 0; i < u.length; i++) console.log("u là", u[i]); //vì quan có 13 sản phẩm nên nó sẽ in ra 13 lần duyệt giá
            item.style.display = "block";
            flag = false;
          } else {
            item.style.display = "none";
            flag = false;
          } // ẩn nếu không thỏa điều kiện theo giá
        } else item.style.display = "none"; // ẩn nếu không thỏa điều kiện theo id
      });
    }
    // trường hợp không có nút filter ,dem == 0 hoặc là dem == tổng số nút hiện có,thì hiện tất cả các thẻ có số tiền nhỏ hơn hoặc bằng với r là giá được điền vào
    else {
      let min = 0;
      // trường hợp số nhập vào nhỏ hơn cả thẻ có giá trị tiền nhỏ nhất => thể hiện hết mặc định
      list_product.forEach((item, index) => {
        const p = item.querySelector("h4");
        let t = 0;
        // duyệt qua chữ số tiền của từng thẻ card
        for (let i = 0; i < p.innerText.length; i++) {
          if (p.innerText[i] != ".") {
            t *= 10;
            t += parseInt(p.innerText[i]);
          }
        }
        if (index == 0) min = t; //gán giá trị dầu tiên ở mảng cho min để có giá trị tham chiếu
        if (t < min) min = t;
      });
      if (r < min) {
        alert("Giá nhỏ quá hong cóa pé ơi");
        for (let i = 0; i < list_product.length; i++)
          list_product[i].style = "display: block";
      } else {
        //  // lấy được giá và chuyẻn sang dạng số int từ các thẻ card:
        list_product.forEach((item) => {
          const p = item.querySelector("h4");
          let t = 0;
          // duyệt qua chữ số tiền của từng thẻ card
          for (let i = 0; i < p.innerText.length; i++) {
            if (p.innerText[i] != ".") {
              t *= 10;
              t += parseInt(p.innerText[i]);
            }
          }
          //in ra được t là giá theo kiểu số nguyên của các thẻ
          if (t <= r)
            item.style.display = "block"; //Nếu t nhỏ hơn giá được nhập vào thì hiện ra trên tổng tất cả thẻ
          else item.style.display = "none"; // ẩn nếu không thỏa điều kiện }
        });
      }
    }
  }
  //sau khi nhấn Enter thì sau quá trình xử lý thì sẽ xóa số đã nhập ở thanh input
  document.querySelector("#price_input").value = "";
});

//Nhấn vào nút thêm vào giỏ hàng của từng thẻ card sản phẩm sẽ hiện lên modal điền vào số lượng cần thiết và lưu lấy id của sản phẩm đó
// hiẹu ứng click ra ngoài bảng modal và nút thêm vào giỏ hàng của các card sẽ tắt bảng modal
const modal = document.querySelector(".modal");
document.addEventListener("click", function (event) {
  let id;
  const buttons = document.querySelectorAll("#them");
  for (const btn of buttons) {
    if (btn.contains(event.target)) {
      modal.classList.add("show"); //hiện lên modal
      //lấy id của nút được bấm vào
      id = btn.value;
      break; // bắt buộc xài vì if-else không thể nào cắt ngang như break,nó vẫn xét luôn else nếu đúng mặc dù đã chạy if trước nó
    }
    if (!modal.contains(event.target)) {
      modal.classList.remove("show"); //bỏ modal khi không bấm vào modal
    }
  }
  //Xét vòng lặp với mảng data để thay đổi tên và img và price tag của từng sản phẩm nhấn vào tương ứng
  for (const key in data)
    for (let i = 0; i < data[key].length; i++) {
      if (i > 0) {
        if (id == data[key][i].id) {
          document.querySelector(".modal").id = data[key][i].id;
          document.querySelector("#modal_img").src = data[key][i].image;
          document.querySelector("#modal_name").innerText = data[key][i].name;
          document.querySelector("#modal_price_tag").innerText =
            data[key][i].price;
          break;
        }
      }
    }

  // click vào chỗ input của modal thì chữ Số Lượng sẽ biến mất,còn nếu không bấm vào thì nó sẽ hiện chữ số lượng ra
  document.querySelectorAll("#modal_input").forEach((item, index) => {
    if (item.contains(event.target)) item.placeholder = "";
    if (!item.contains(event.target)) item.placeholder = "Số lượng";
  });
});
// Logic: Nếu như nút Thêm vào giỏ hàng được nhấn bất cứ nút nào thì nó sẽ duyệt vòng lặp qua các tổng phần tử nút trả về ,sau đó tìm kiếm xem có nút nào đang được click vào hay không,nếu có thì nó sẽ thêm .show vào class modal để hiện lên sau đó break luôn không cần tìm nữa,dòn if số 2 là nếu như modal đã hiện lên mà click ra bên ngoài không phải bên trong modal thì nó sẽ bỏ .show đi
//Xài break là break ra hết vòng lặp không xét tiếp bên trong loop nữa

document.querySelectorAll("#modal_input").forEach((item) => {
  item.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      //kiểm tra điều kiện cho giá trị được nhập vào phải khác null và nằm ở giữa max và min
      if (
        item.value == null ||
        Number(item.value) < 1 ||
        Number(item.value) > 10
      ) {
        alert("Nhập lại đi min là 1 còn max là 10 á pạn!");
      }
      // console.log(Number(item.value)); //phải ép kiểu number vì cái nó trả về là 1 string
      // console.log(document.querySelector(".modal").id); //modal chỉ có 1 nhưng id thì thay đổi theo từng sản phẩm được click vào
      // localStorage : chỉnh sửa lại cho phù hợp với nội dung cần lưu
      else {
        if (localStorage.cart) {
          let cart = JSON.parse(localStorage.cart);
          let vari = true;
          for (let product of cart) {
            // console.log(typeof document.querySelector(".modal").id); //string
            // console.log(typeof product.id); //string
            if (document.querySelector(".modal").id == product.id) {
              // console.log(typeof product.number); //string
              //cộng dồn vào number hóa chuỗi hiện đang có bên trong cart cộng vào
              let a = Number(item.value) + Number(product.number);
              product.number = a;
              vari = false;
              break; //nó chỉ cần tìm được 1 cái xong là break luôn không cần xét tiếp phần tử tiếp theo
            }
          }
          // NẾu như id chưa từng tồn tại trong cart thì sẽ đẩy vào 1 phần tử mới,xác định phần tử mới cũ bằng biến vari có giá trị là true và false
          if (vari) {
            cart.push({
              number: item.value,
              id: document.querySelector(".modal").id,
            });
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Đã thêm thành công");
          modal.classList.remove("show"); //bỏ modal khi hoàn thành thêm
          item.value = null; //Xóa số đã nhập trước đó ở chỗ input
        } else {
          // nếu chưa có 1 tài khoản nào đăng ký tức là chưa có mảng users chứa các tài khoản đăng ký thì tạo 1 mảng mới users
          let cart = [];
          cart.push({
            number: item.value,
            id: document.querySelector(".modal").id,
          });
          localStorage.setItem("cart", JSON.stringify(cart));
        }
        alert("Đã thêm thành công");
        modal.classList.remove("show"); //bỏ modal khi hoàn thành thêm
        item.value = null; //Xóa số đã nhập trước đó ở chỗ input
      }
    }
  });
});
//Logic: Khi nhấn vào enter của input bên trong đó xong rồi lấy về id ở trong khung của modal tương ứng với id của từng sản phẩm trong mảng

document.querySelector(".modal_confirm").addEventListener("click", () => {
  document.querySelectorAll("#modal_input").forEach((item, index) => {
    //kiểm tra điều kiện cho giá trị được nhập vào phải khác null và nằm ở giữa max và min
    if (
      item.value == null ||
      Number(item.value) < 1 ||
      Number(item.value) > 10
    ) {
      alert("Nhập lại đi min là 1 còn max là 10 á pạn!");
    }
    // console.log(Number(item.value)); //phải ép kiểu number vì cái nó trả về là 1 string
    // console.log(document.querySelector(".modal").id); //modal chỉ có 1 nhưng id thì thay đổi theo từng sản phẩm được click vào
    // localStorage : chỉnh sửa lại cho phù hợp với nội dung cần lưu
    else {
      if (localStorage.cart) {
        let cart = JSON.parse(localStorage.cart);
        let vari = true;
        for (let product of cart) {
          // console.log(typeof document.querySelector(".modal").id); //string
          // console.log(typeof product.id); //string
          if (document.querySelector(".modal").id == product.id) {
            // console.log(typeof product.number); //string
            //cộng dồn vào number hóa chuỗi hiện đang có bên trong cart cộng vào
            let a = Number(item.value) + Number(product.number);
            product.number = a;
            vari = false;
            break; //nó chỉ cần tìm được 1 cái xong là break luôn không cần xét tiếp phần tử tiếp theo
          }
        }
        // NẾu như id chưa từng tồn tại trong cart thì sẽ đẩy vào 1 phần tử mới,xác định phần tử mới cũ bằng biến vari có giá trị là true và false
        if (vari) {
          cart.push({
            number: item.value,
            id: document.querySelector(".modal").id,
          });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm thành công");
        modal.classList.remove("show"); //bỏ modal khi hoàn thành thêm
        item.value = null; //Xóa số đã nhập trước đó ở chỗ input
      } else {
        // nếu chưa có 1 tài khoản nào đăng ký tức là chưa có mảng users chứa các tài khoản đăng ký thì tạo 1 mảng mới users
        let cart = [];
        cart.push({
          number: item.value,
          id: document.querySelector(".modal").id,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      alert("Đã thêm thành công");
      modal.classList.remove("show"); //bỏ modal khi hoàn thành thêm
      item.value = null; //Xóa số đã nhập trước đó ở chỗ input
    }
  });
});

// nhấn vào logo thương hiệu chuyển về trang main
document.querySelector("#Home").addEventListener("click", () => {
  location = "./index.html";
});
