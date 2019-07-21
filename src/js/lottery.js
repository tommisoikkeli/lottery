const MIN_NUMBER = 1;
const MAX_NUMBER = 40;
const SELECTED_MAX_LENGTH = 7;
let SELECTED_NUMBERS = [];
let LOTTERY_NUMBERS = [];
let lotteryGenerated = false;

// Get numbers from 1 to 40.
const getNumbers = () => {
  const numbers = [];
  for (let i = MIN_NUMBER; i <= MAX_NUMBER; i++) {
    numbers.push(i);
  }
  return numbers;
};

export const populateNumbersSection = () => {
  const numbersSection = document.getElementById('numbers');
  numbersSection.innerHTML = getNumbers()
    .map(number => {
      return `<div class="number" value=${number}>${number}</div>`;
    })
    .join(' ');
  addEventListenersToNumbers();
};

const onNumberSelect = number => {
  // Don't allow selections once lottery numbers are generated.
  if (lotteryGenerated) return;

  const selectedNumber = parseInt(number.getAttribute('value'));

  // Add number to selections if it does not already exist.
  // Otherwise remove it from selections.
  if (!SELECTED_NUMBERS.includes(selectedNumber)) {
    if (SELECTED_NUMBERS.length === SELECTED_MAX_LENGTH) return;
    number.classList.add('selected');
    SELECTED_NUMBERS = [...SELECTED_NUMBERS, selectedNumber];
  } else {
    number.classList.remove('selected');
    SELECTED_NUMBERS = SELECTED_NUMBERS.filter(n => n !== selectedNumber);
  }

  // Update the indicator and check if button can be enabled.
  updateIndicator(SELECTED_MAX_LENGTH - SELECTED_NUMBERS.length);
  setButtonStatus();
};

const addEventListenersToNumbers = () => {
  const numbers = Array.from(document.querySelectorAll('.number'));
  numbers.forEach(number =>
    number.addEventListener('click', () => {
      onNumberSelect(number);
    })
  );
};

// Tells how many numbers are left to select.
const updateIndicator = number => {
  const indicator = document.getElementById('left-indicator');
  indicator.innerHTML =
    number === 1 ? '1 number left' : `${number} numbers left`;
};

const shouldEnableButton = () =>
  SELECTED_NUMBERS.length === SELECTED_MAX_LENGTH;

// Enables button when all seven numbers are selected.
const setButtonStatus = () => {
  const button = document.getElementById('lottery-button');
  shouldEnableButton() ? (button.disabled = false) : (button.disabled = true);
};

const showLotteryNumberContainer = () => {
  const container = document.getElementById('results');
  container.style.display = 'block';
};

const getRandomNumber = () =>
  Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;

const generateLotteryNumbers = () => {
  while (LOTTERY_NUMBERS.length < 7) {
    const number = getRandomNumber();
    if (!LOTTERY_NUMBERS.includes(number)) {
      LOTTERY_NUMBERS = [...LOTTERY_NUMBERS, number];
    }
  }
  return LOTTERY_NUMBERS;
};

const revealLotteryNumbers = lotteryNumbers => {
  const numberBalls = Array.from(document.querySelectorAll('.lottery-number'));
  numberBalls.forEach((ball, i) => {
    setTimeout(() => {
      ball.innerHTML = lotteryNumbers[i];
      ball.classList.add('revealed');

      // Show winning text after all numbers are revealed.
      if (i === numberBalls.length - 1) {
        showWinText();
      }
    }, i * 500);
  });
};

export const onLotteryButtonClick = () => {
  lotteryGenerated = true;
  showLotteryNumberContainer();
  revealLotteryNumbers(generateLotteryNumbers());
};

const getWinText = winnings => {
  const winTexts = {
    0: 'You got 0 correct numbers. Unlucky.',
    1: 'You got 1 correct number. Not exactly impressive.',
    2: 'You got 2 correct numbers. Not bad, not great.',
    3: 'You got 3 correct numbers. Consider yourself lucky.',
    4: 'You got 4 correct numbers. Good for you!',
    5: 'You got 5 correct numbers. Actually quite impressive.',
    6: 'Yoi got 6 correct numbers. Seriously lucky.',
    7: 'You got ALL the correct numbers. No way.'
  };
  return winTexts[winnings];
};

const checkWinnings = () =>
  SELECTED_NUMBERS.filter(n => LOTTERY_NUMBERS.includes(n)).length;

export const showWinText = () => {
  document.getElementById('winnings').style.display = 'flex'
  document.getElementById('win-text').innerHTML = getWinText(checkWinnings())
}
