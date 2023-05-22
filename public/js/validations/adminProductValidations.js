let qs = (elemento) => {
  return document.querySelector(elemento);
};

window.addEventListener("load", () => {
  let $inputName = qs("#inputName"),
    $nameErrors = qs("#nameErrors"),
    $price = qs("#inputPrice"),
    $priceErrors = qs("#priceErrors"),
    $form = qs("#productForm"),
    $category = qs("#categorySelect"),
    $categoryErrors = qs("#categoryErrors"),
    $subcategory = qs("#subcategorySelect"),
    $subcategoryErrors = qs("#subcategoryErrors"),
    $file = qs("#formFile"),
    $fileErrors = qs("#fileErrors"),
    $imgPreview = qs("#imgPreview"),
    regexNumber = /^\d+$/;

  $inputName.addEventListener("blur", () => {
    switch (true) {
      case !$inputName.value.trim():
        $nameErrors.innerText = "El campo nombre es obligatorio";
        $inputName.classList.add("is-invalid");
        break;
      default:
        $inputName.classList.remove("is-invalid");
        $inputName.classList.add("is-valid");
        $nameErrors.innerText = "";
        break;
    }
  });

  $price.addEventListener("blur", () => {
    switch (true) {
      case !$price.value.trim():
        $priceErrors.innerText = "El precio es obligatorio";
        $price.classList.add("is-invalid");
        break;
      case !regexNumber.test($price.value):
        $priceErrors.innerText = "Precio invalido";
        $price.classList.add("is-invalid");
        break;
      default:
        $price.classList.remove("is-invalid");
        $price.classList.add("is-valid");
        $priceErrors.innerText = "";
        break;
    }
  });

  $category.addEventListener("blur", () => {
    if (!$category.value.trim()) {
      $categoryErrors.innerHTML = "Campo requerido";
      $category.classList.add("is-invalid");
    } else {
      $category.classList.remove("is-invalid");
      $category.classList.add("is-valid");
      $categoryErrors.innerHTML = "";
    }
  });

  $subcategory.addEventListener("blur", () => {
    if (!$subcategory.value.trim()) {
      $subcategoryErrors.innerHTML = "Campo requerido";
      $subcategory.classList.add("is-invalid");
    } else {
      $subcategory.classList.remove("is-invalid");
      $subcategory.classList.add("is-valid");
      $subcategoryErrors.innerHTML = "";
    }
  });

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const FORM_ELEMENTS = event.target.elements;

    for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
      const element = FORM_ELEMENTS[index];
      if (
        element.value === "" &&
        element.type !== "file" &&
        element.name !== "discount" &&
        element.name !== "description"
      ) {
        element.classList.add("is-invalid");
      }
    }

    let elementosConErrores = document.querySelectorAll(".is-invalid");
    let errores = elementosConErrores.length > 0;

    if (errores) {
      submitErrors.innerText = "Hay errores en el formulario";
    } else {
      $form.submit();
    }
  });

  $file.addEventListener("change", () => {
    let filePath = $file.value, //Capturo el valor del input
      allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i; //Extensiones permitidas
    if (!allowefExtensions.exec(filePath)) {
      //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
      $fileErrors.innerHTML =
        "Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)";
      $file.value = "";
      $imgPreview.innerHTML = "";
      return false;
    } else {
      // Image preview
      console.log($file.files);
      if ($file.files && $file.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          $imgPreview.innerHTML = '<img src="' + e.target.result + '"/>';
        };
        reader.readAsDataURL($file.files[0]);
        $fileErrors.innerHTML = "";
        $file.classList.remove("is-invalid");
      }
    }
  });
});
