// do the calculation to generate the random number
let randomNumber = Math.floor(Math.random() * 100) + 1;

// show the result from the form
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHiResult = document.querySelector('.lowOrHi');

// grab the data from the form
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1 ;
let resetButton;
guessField.focus();

// the way we call bootstrap Alerts
const bootstrapAlertDanger = ['alert', 'alert-danger'];
const bootstrapAlertSuccess = ['alert', 'alert-success'];
const bootstrapAlertWarning = ['alert', 'alert-warning'];
const bootstrapAlertInfo = ['alert', 'alert-info'];
const bootstrapButtonDanger = ['btn', 'btn-danger', 'btn-lg', 'btn-block'];

// refactor this to main.js after this
function checkGuess() {
	let userGuess = Number(guessField.value);

	if(guessCount === 1) {
		guesses.textContent = 'Previous guess: ';
        guesses.classList.add(...bootstrapAlertInfo);
	}

	guesses.textContent += userGuess + ' ';

	if(userGuess === randomNumber) {
		lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.classList.remove(...bootstrapAlertDanger);

        lastResult.classList.add(...bootstrapAlertSuccess);
		lowOrHiResult.classList.remove(...bootstrapAlertWarning);
        lowOrHiResult.textContent = '';

		setGameOver();
	} else if(guessCount === 10) {
		lastResult.textContent = 'Game over!';

		setGameOver();
	} else {
		lastResult.textContent = 'Wrong';
        lastResult.classList.remove(...bootstrapAlertSuccess);
        lastResult.classList.add(...bootstrapAlertDanger);

        // lastResult.classList.replace(...bootstrapAlertSuccess, ...bootstrapAlertDanger);

		if(userGuess < randomNumber) {
			lowOrHiResult.textContent = 'Last guess was to low';
            lowOrHiResult.classList.add(...bootstrapAlertWarning);
		} else if(userGuess > randomNumber) {
			lowOrHiResult.textContent = 'Last guess was to high';
            lowOrHiResult.classList.add(...bootstrapAlertWarning);
		}
	}

	guessCount++;
	guessField.value = '';
	guessField.focus();
}

// setGameOver will trigger after the game finish
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    const btnContainer = document.querySelector('#buttonDiv');
    const btnDiv = document.createElement('div');

    resetButton = document.createElement('button');
    resetButton.classList.add(...bootstrapButtonDanger);
    resetButton.textContent = 'Start new game';

    btnDiv.classList.add("col-md-4", "offset-md-4");

    btnContainer.append(btnDiv);
    btnDiv.append(resetButton);

    resetButton.addEventListener('click', resetGame);
}

// reset the game so we can play it again
function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');

    for(let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    // lastResult.style.backgroundColor = 'white';
    guesses.classList.remove(...bootstrapAlertInfo);
    lastResult.classList.remove(...bootstrapAlertSuccess);
    lastResult.classList.remove(...bootstrapAlertDanger);
    lowOrHiResult.classList.remove(...bootstrapAlertWarning);

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

guessSubmit.addEventListener('click', checkGuess);