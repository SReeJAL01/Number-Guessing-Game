let selectedMode = 'easy';
let randomNumber;
let attemptsLeft;
const popup = document.getElementById('popup');
const confetti = document.getElementById('confetti');
const gameContainer = document.getElementById('gameContainer');

function startGame() {
    const playerName = document.getElementById('playerName').value;
    const playerAge = document.getElementById('playerAge').value;

    if (playerName && playerAge) {
        document.getElementById('playerForm').style.display = 'none';
        document.getElementById('gameContent').style.display = 'block';
        setMode('easy'); // Default to easy mode
    } else {
        alert("Please enter both your name and age.");
    }
}

function setMode(mode) {
    selectedMode = mode;
    let max = 10;
    let attempts = 10;
    let bgColor = 'rgba(139, 198, 236, 0.3)'; // Light blue for easy mode
    let buttonColor = '#333';

    if (mode === 'medium') {
        max = 50;
        attempts = 5;
        bgColor = 'rgba(255, 195, 113, 0.3)'; // Light orange for medium mode
        buttonColor = '#FF5F6D';
    }
    if (mode === 'hard') {
        max = 100;
        attempts = 3;
        bgColor = 'rgba(255, 95, 109, 0.3)'; // Light red for hard mode
        buttonColor = '#FFC371';
    }
    
    gameContainer.style.background = bgColor;
    document.getElementById('guessRange').max = max;
    randomNumber = generateRandomNumber(max);
    attemptsLeft = attempts;
    document.getElementById('attemptsLeft').textContent = attemptsLeft;
    document.getElementById('selectedNumber').textContent = 1;
    document.getElementById('guessRange').value = 1;
    document.getElementById('hint').textContent = ''; // Clear hint
    setActiveButton(mode, buttonColor); // Highlight the selected mode button
}

function setActiveButton(mode, buttonColor) {
    const buttons = document.querySelectorAll('.mode-select button');
    buttons.forEach(button => {
        button.classList.remove('active');
        button.style.backgroundColor = '#ccc';
        button.style.color = '#333';
    });

    const activeButton = document.getElementById(`${mode}Btn`);
    activeButton.classList.add('active');
    activeButton.style.backgroundColor = buttonColor;
    activeButton.style.color = '#fff';
}

document.getElementById('guessRange').addEventListener('input', function () {
    document.getElementById('selectedNumber').textContent = this.value;
});

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessRange').value);
    let hintMessage = '';
    
    if (guess === randomNumber) {
        showConfetti();
        showPopup("Congratulations! 🎉");
    } else {
        attemptsLeft--;
        if (attemptsLeft <= 0) {
            showPopup("Oops! Let's try again. 😞");
        } else {
            if (guess < randomNumber) {
                hintMessage = guess < randomNumber - 10 ? 'Too Low!' : 'Low';
            } else {
                hintMessage = guess > randomNumber + 10 ? 'Too High!' : 'High';
            }
            document.getElementById('hint').textContent = hintMessage;
            document.getElementById('attemptsLeft').textContent = attemptsLeft;
        }
    }
}

function showPopup(message) {
    document.getElementById('popupMessage').textContent = message;
    popup.classList.add('show');
}

function closePopup() {
    popup.classList.remove('show');
    hideConfetti();
    setMode(selectedMode); // Restart the game with the current mode
}

function showConfetti() {
    for (let i = 0; i < 100; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.backgroundColor = getRandomColor();
        piece.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.appendChild(piece);
    }
}

function hideConfetti() {
    confetti.innerHTML = '';
}

function getRandomColor() {
    const colors = ['#ff0', '#f0f', '#0ff', '#ff8c00', '#00fa9a'];
    return colors[Math.floor(Math.random() * colors.length)];
}
