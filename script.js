const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");
const cajatexto = document.querySelector(".text textarea");
const textoResultado = document.querySelector(".text-result");
const resultContainer = document.querySelector(".result-container");
const toyContainer = document.querySelector(".toy-container");
const textContainer = document.querySelector(".info-text");
const btnCopiar = document.querySelector(".btn-copy");

const vocales = ["a", "e", "i", "o", "u"];
const encrypter = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};
const decrypter = Object.fromEntries(
  Object.entries(encrypter).map(([key, value]) => [value, key])
);

eventListeners();

function eventListeners() {
  cajatexto.addEventListener("blur", tomarTexto);
  btnEncriptar.addEventListener("click", encriptar);
  btnCopiar.addEventListener("click", copiarTexto);
  btnDesencriptar.addEventListener("click", desencriptar);
}

function encriptarTexto(mensaje) {
  limpiarPantalla();
  if (mensaje.length === 0) return;
  let text = mensaje;
  let finalText = "";

  for (let i = 0; i < text.length; i++) {
    if (!vocales.includes(text[i]) || text[i] == " ") {
      finalText += text[i];
      continue;
    } else {
      for (let j = 0; j < vocales.length; j++) {
        if (text[i] === vocales[j]) {
          finalText += encrypter[vocales[j]];
          break;
        }
      }
    }
  }

  resultContainer.removeAttribute("hidden");
  btnCopiar.removeAttribute("hidden");
  ocultarDiv();
  console.log(finalText);
  return finalText;
}

function desencriptarTexto(mensaje) {
  limpiarPantalla();
  if (mensaje.length === 0) return;
  let textoFinal = "";
  let i = 0;

  while (i < mensaje.length) {
    let found = false;

    for (let key in decrypter) {
      if (mensaje.substr(i, key.length) === key) {
        textoFinal += decrypter[key];
        i += key.length;
        found = true;
        break;
      }
    }

    if (!found) {
      textoFinal += mensaje[i];
      i++;
    }
  }
  ocultarDiv();
  return textoFinal;
}

function tomarTexto() {
  const texto = cajatexto.value;
  if (texto === "") {
    return;
  } else {
    return texto;
  }
}

function ocultarDiv() {
  toyContainer.classList.add("ocultar");
  textContainer.classList.add("ocultar");
}

function encriptar(e) {
  e.preventDefault();

  const textoAEncriptar = tomarTexto();
  console.log(textoAEncriptar);
  textoResultado.innerText = encriptarTexto(textoAEncriptar);
}

function copiarTexto() {
  const texto = document.querySelector(".text-result").textContent;
  navigator.clipboard.writeText(texto);
}

function desencriptar(e) {
  e.preventDefault();

  const textoDesencriptar = tomarTexto();
  textoResultado.innerText = desencriptarTexto(textoDesencriptar);
}

function limpiarPantalla() {
  textoResultado.innerText = "";
}
