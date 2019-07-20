const MIN_NUMBER = 1;
const MAX_NUMBER = 40;
const SELECTED_MAX_LENGTH = 7;
let SELECTED_NUMBERS = [];
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
}

export const onLotteryButtonClick = () => {
  lotteryGenerated = true;
  showLotteryNumberContainer();
}
