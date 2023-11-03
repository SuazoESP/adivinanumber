// Variables globales
let attempts = 10;
let remainingAttempts = 0;
let allowAttemptsChange = true;
let gameStarted = false;
let countdown = 60;
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 1;
let resetCount = 1;

// Elementos del DOM
const guessSubmit = document.getElementById('guessSubmit');
const guessField = document.getElementById('guessInput');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const resetButton = document.getElementById('resetButton');
const attemptsInput = document.getElementById('attemptsInput');
const selectAttemptsButton = document.getElementById('selectAttemptsButton');
const countdownElement = document.getElementById('countdown');
const timerElement = document.getElementById('timer');

// Función para seleccionar el número de intentos
function selectAttempts() {
    if (allowAttemptsChange) {
        attempts = parseInt(attemptsInput.value);
        remainingAttempts = attempts;
        attemptsInput.disabled = true;
        selectAttemptsButton.disabled = true;
        allowAttemptsChange = false;
        guessSubmit.disabled = false;
    }
}

// Función para comprobar el intento del usuario
function checkGuess() {
    if (!gameStarted) {
        gameStarted = true;
        lockAttemptsInput();
    }

    if (remainingAttempts > 0) {
        let userGuess = Number(guessField.value);

        if (guessCount === 1) {
            guesses.textContent = 'Intentos anteriores: ';
        }

        guesses.textContent += userGuess + ' ';
        remainingAttempts--;

        if (userGuess === randomNumber || remainingAttempts === 0) {
            if (userGuess === randomNumber) {
                const winnings = attempts * 5;
                lastResult.textContent = '¡Felicidades! ¡Ganaste ' + winnings + '!';
                lastResult.style.backgroundColor = '#4CAF50';
            } else {
                lastResult.textContent = '¡Se agotaron los intentos! El número era ' + randomNumber;
                lastResult.style.backgroundColor = '#FF5252';
            }
            lowOrHi.textContent = '';
            setGameOver();
        } else {
            lastResult.textContent = '¡Incorrecto!';
            lastResult.style.backgroundColor = '#FF5252';
            if (userGuess < randomNumber) {
                lowOrHi.textContent = 'El número es más alto.';
            } else {
                lowOrHi.textContent = 'El número es más bajo.';
            }
            guessCount++;
            guessField.value = '';
            guessField.focus();
        }
    }
}

guessSubmit.addEventListener('click', checkGuess);

// Función para finalizar el juego
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton.style.display = 'block';
    resetButton.addEventListener('click', resetGame);
}

// Función para reiniciar el juego
function resetGame() {
    guessCount = 1;
    remainingAttempts = attempts;
    attemptsInput.disabled = false;
    selectAttemptsButton.disabled = false;
    allowAttemptsChange = true;
    attemptsInput.value = attempts;
    gameStarted = false;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    resetButton.style.display = 'none';
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
    resetCount++;
    if (resetCount === 2) {
        guesses.textContent = '';
        resetCount = 1;
    }
}

// Función para bloquear el campo de intentos
function lockAttemptsInput() {
    attemptsInput.disabled = true;
    selectAttemptsButton.disabled = true;
}

// Función para actualizar el contador
function updateCountdown() {
    if (countdown === 10) {
        timerElement.style.color = '#ff0000';
        timerElement.style.fontSize = '24px';
        setTimeout(() => {
            timerElement.style.fontSize = '20px';
        }, 500);
    }

    countdownElement.textContent = countdown;
    countdown--;

    if (countdown < 0) {
        // Cuando el contador llega a 0, mostrar el botón "Empezar nuevo juego"
        countdownElement.textContent = '0';
        countdownElement.style.color = '#ff0000';
        resetButton.style.display = 'block';
        resetButton.addEventListener('click', resetGame);
        guessField.disabled = true;
        guessSubmit.disabled = true;
    }
}

// Actualizar el contador cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);
