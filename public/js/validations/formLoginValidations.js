let qs = (elemento) => {
  return document.querySelector(elemento);
};

window.addEventListener("load", () => {
  let $email = qs("#email"),
    $emailErrors = qs("#emailErrors"),
    $pass = qs("#pass"),
    $passErrors = qs("#passErrors"),
    $form = qs("#loginForm"),
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

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

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const FORM_ELEMENTS = event.target.elements;

    for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
      const element = FORM_ELEMENTS[index];
      if (element.value === "") {
        element.classList.add("is-invalid");
      }
      /* element.dispatchEvent(new Event("blur")) */
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
