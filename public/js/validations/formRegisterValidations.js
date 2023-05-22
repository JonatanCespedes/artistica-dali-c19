let qs = (elemento) => {
  return document.querySelector(elemento);
};

window.addEventListener("load", () => {
  let $inputName = qs("#name"),
    $nameErrors = qs("#nameErrors"),
    $inputLastname = qs("#lastname"),
    $lastnameErrors = qs("#lastnameErrors"),
    $form = qs("#registerform"),
    $email = qs("#email"),
    $emailErrors = qs("#emailErrors"),
    $pass = qs("#pass"),
    $passErrors = qs("#passErrors"),
    $pass2 = qs("#pass2"),
    $pass2Errors = qs("#pass2Errors"),
    $terms = qs("#check"),
    $termsErrors = qs("#termsErrors"),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  $inputName.addEventListener("blur", () => {
    switch (true) {
      case !$inputName.value.trim():
        $nameErrors.innerText = "El campo nombre es obligatorio";
        $inputName.classList.add("is-invalid");
        break;
      case !regExAlpha.test($inputName.value):
        $nameErrors.innerText = "Nombre invalido";
        $inputName.classList.add("is-invalid");
        break;
      default:
        $inputName.classList.remove("is-invalid");
        $inputName.classList.add("is-valid");
        $nameErrors.innerText = "";
        break;
    }
  });

  $inputLastname.addEventListener("blur", () => {
    switch (true) {
      case !$inputLastname.value.trim():
        $lastnameErrors.innerText = "El campo apellido es obligatorio";
        $inputLastname.classList.add("is-invalid");
        break;
      case !regExAlpha.test($inputLastname.value):
        $lastnameErrors.innerText = "Debes ingresar un apellido válido";
        $inputLastname.classList.add("is-invalid");
        break;
      default:
        $inputLastname.classList.remove("is-invalid");
        $inputLastname.classList.add("is-valid");
        $lastnameErrors.innerText = "";
        break;
    }
  });

  $email.addEventListener("blur", () => {
    switch (true) {
      case !$email.value.trim():
        $emailErrors.innerText = "El campo email es obligatorio";
        $email.classList.add("is-invalid");
        break;
      case !regExEmail.test($email.value):
        $emailErrors.innerText = "Debe ingresar un email válido";
        $email.classList.add("is-invalid");
        break;
      default:
        $email.classList.remove("is-invalid");
        $email.classList.add("is-valid");
        $emailErrors.innerText = "";
        break;
    }
  });

  $pass.addEventListener("blur", () => {
    switch (true) {
      case !$pass.value.trim():
        $passErrors.innerText = "El campo contraseña es obligatorio";
        $pass.classList.add("is-invalid");
        break;
      default:
        $pass.classList.remove("is-invalid");
        $pass.classList.add("is-valid");
        $passErrors.innerText = "";
        break;
    }
  });

  $pass2.addEventListener("blur", () => {
    switch (true) {
      case !$pass2.value.trim():
        $pass2Errors.innerText = "Debes reingresar la contraseña";
        $pass2.classList.add("is-invalid");
        break;
      case $pass2.value != $pass.value:
        $pass2Errors.innerText = "Las contraseñas no coinciden";
        $pass2.classList.add("is-invalid");
        break;
      default:
        $pass2.classList.remove("is-invalid");
        $pass2.classList.add("is-valid");
        $pass2Errors.innerText = "";
        break;
    }
  });

  $terms.addEventListener("click", () => {
    $terms.value = "on";
    $terms.classList.toggle("is-valid");
    $terms.classList.remove("is-invalid");
    $termsErrors.innerHTML = "";
  });

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const FORM_ELEMENTS = event.target.elements;

    for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
      const element = FORM_ELEMENTS[index];
      if (element.value === "" && element.type !== "file") {
        element.classList.add("is-invalid");
      }
      /* element.dispatchEvent(new Event("blur")) */
    }

    if (!$terms.checked) {
      $terms.classList.add("is-invalid");
      $termsErrors.innerHTML = "Debes aceptar los terminos y condiciones";
    }

    let elementosConErrores = document.querySelectorAll(".is-invalid");
    let errores = elementosConErrores.length > 0;

    if (errores) {
      submitErrors.innerText = "Hay errores en el formulario";
    } else {
      $form.submit();
    }
  });
});
