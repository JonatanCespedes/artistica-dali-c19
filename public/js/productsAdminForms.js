const BASE_URL = "http://localhost:3000/api/";
let $subcategoriesSelect = document.querySelector("#subcategorySelect");
let $categoriesSelect = document.querySelector("#categorySelect");

const handlerCategory = async (id) => {
  const response = await fetch(`${BASE_URL}categories/${id}`);
  const category = await response.json();
  console.log(category)
  let subcategories = category.subcategories;
  for (let index = 0; index < subcategories.length; index++) {
    $subcategoriesSelect.innerHTML += `<option value="${subcategories[index].id}">${subcategories[index].name}</option>`;
  }
};

$categoriesSelect.addEventListener("change", function (e) {
  $subcategoriesSelect.innerHTML = "";
  handlerCategory(e.target.value);
});
