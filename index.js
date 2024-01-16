// !-- نظام اداره مشروعات -->

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const taxes = document.querySelector("#taxes");
const ads = document.querySelector("#ads");
const discount = document.querySelector("#discount");
const total = document.querySelector("#total");
const count = document.querySelector("#count");
const category = document.querySelector("#category");
const submit = document.querySelector("#submit");
const search = document.querySelector("#search");
let dellAll = document.querySelector(".deleteAll");
let mood = "Create";
let tmp;

// Get Total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.textContent = result;
    total.style.backgroundColor = "#43a047";
  } else {
    total.textContent = "";
    total.style.backgroundColor = "#f02727";
  }
}

// Create product
let dataProduct;

if (localStorage.dataProduct != null) {
  dataProduct = JSON.parse(localStorage.dataProduct);
} else {
  dataProduct = [];
}

submit.addEventListener("click", function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.textContent,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    count.value < 1000 &&
    category.value != ""
  ) {
    if (mood === "Create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      count.style.display = "block";
      mood = "Create";
      submit.textContent = mood;
    }
    clearInput();
  } else {
    if (title.value == "") {
      title.style.borderColor = "#f02727";
    } else {
      title.style.borderColor = "#43a047";
    }
    if (price.value == "") {
      price.style.borderColor = "#f02727";
    } else {
      price.style.borderColor = "#43a047";
    }
    if (count.value > 100 || count.value == "") {
      count.style.borderColor = "#f02727";
    } else {
      count.style.borderColor = "#43a047";
    }
    if (category.value == "") {
      category.style.borderColor = "#f02727";
    } else {
      category.style.borderColor = "#43a047";
    }
  }

  // Save Data To Local Storage
  localStorage.setItem("dataProduct", JSON.stringify(dataProduct));

  showData();
});

// Clear Input
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.textContent = "";
  total.style.backgroundColor = "#f02727";
  count.value = "";
  category.value = "";
}

// show Data => (Reed)
function showData() {
  let data = "";
  for (let i = 0; i < dataProduct.length; i++) {
    data += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" class="update">Update</button></td>
        <td><button onclick="dellData(${i})" class="delete">delete</button></td>
      </tr>`;
  }
  document.querySelector("#tbody").innerHTML = data;

  if (dataProduct.length > 0) {
    dellAll.textContent = `Delete All (${dataProduct.length})`;
    dellAll.style.display = "block";
  } else {
    dellAll.style.display = "none";
  }
}
showData();

// Delete Element
let deleteElement = document.querySelector(".delete");

function dellData(e) {
  dataProduct.splice(e, 1);
  localStorage.dataProduct = JSON.stringify(dataProduct);
  showData();
}

dellAll.addEventListener("click", function () {
  btnDellAll();
});

function btnDellAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// Update Data Product

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  ads.value = dataProduct[i].ads;
  taxes.value = dataProduct[i].taxes;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProduct[i].category;
  mood = "Update";
  submit.innerHTML = "Update";
  tmp = i;
}

// Search Data Product

let searchMood = "title";

function getSearchMood(i) {
  if (i == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let data = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      {
        if (dataProduct[i].title.includes(value.toLowerCase())) {
          data += `
      <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" class="update">Update</button></td>
        <td><button onclick="dellData(${i})" class="delete">delete</button></td>
      </tr>`;
        }
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        data += `
      <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" class="update">Update</button></td>
        <td><button onclick="dellData(${i})" class="delete">delete</button></td>
      </tr>`;
      }
    }
  }
  document.querySelector("#tbody").innerHTML = data;
}
