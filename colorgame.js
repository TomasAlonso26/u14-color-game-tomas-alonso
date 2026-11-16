// =============================================
// The Great Guessing Game (Color Game)
// =============================================

// ----- Variables -----
// colors y pickedColor se definen sin valor porque los asigna reset()
var numberOfSquares = 6;
var colors;
var pickedColor;

// Guardamos cada selector en una variable
var body = document.querySelector("body");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("#h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// ----- Inicio del juego -----
init();

// ----- Definición de las funciones -----

// init solo ejecuta 3 funciones
function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

// Botones Easy y Hard (comparten la clase .mode)
function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      for (var j = 0; j < modeButtons.length; j++) {
        modeButtons[j].classList.remove("selected");
      }
      this.classList.add("selected");
      // Según el texto del botón clickeado se juega con 3 o 6 cuadrados
      numberOfSquares = this.textContent === "EASY" ? 3 : 6;
      reset();
    });
  }
}

// Evento de click en cada cuadrado
function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
      var clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "¡Correcto!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        // El cuadrado desaparece tomando el color de fondo del body
        this.style.backgroundColor = body.style.backgroundColor;
        messageDisplay.textContent = "Intentalo Nuevamente";
      }
    });
  }
}

// El botón "Nuevos Colores" / "Play Again?" reinicia el juego
resetButton.addEventListener("click", reset);

// Genera nuevos colores, elige el ganador y actualiza la página
function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "Nuevos Colores";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "";

  for (var i = 0; i < squares.length; i++) {
    // Si hay un color para ese cuadrado se muestra, si no (undefined) se oculta
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

// Pinta todos los cuadrados con el color recibido
function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

// Devuelve un color al azar del arreglo colors
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Devuelve un arreglo con la cantidad de colores aleatorios pedida
function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// Genera un color "rgb(r, g, b)" con 3 números entre 0 y 255
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
