let btnEncriptar = document.querySelector(".btn-encriptar");
let btnDesencriptar = document.querySelector(".btn-desencriptar");
let cajatexto = document.querySelector(".cajatexto");
let textoResultado = document.querySelector(".texto-resultado");
let toyContainer = document.querySelector(".contenedormunieco");
let textContainer = document.querySelector(".contenedor-parrafo");
let btnCopiar = document.querySelector(".btn-copiar");

// Crear un diccionario inverso para la desencriptación
const vocales = ["a", "e", "i", "o", "u"];
let encrypter = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};
const decrypter = Object.fromEntries(
  Object.entries(encrypter).map(([key, value]) => [value, key])
);

console.log(decrypter);
console.log(typeof decrypter);

// listeners
eventListeners();

function eventListeners() {
  cajatexto.addEventListener("blur", tomarTexto);
  btnEncriptar.addEventListener("click", encriptar);
  btnCopiar.addEventListener("click", copiarTexto);
  btnDesencriptar.addEventListener("click", desencriptar);
}

function encriptarTexto(mensaje) {
  limpiarPantalla();

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
  ocultarDiv();
  return finalText;
}

function desencriptarTexto(mensaje) {
  limpiarPantalla();
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
  textoResultado.innerText = encriptarTexto(textoAEncriptar);
}

function copiarTexto() {
  const texto = document.querySelector(".texto-resultado").textContent;
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
