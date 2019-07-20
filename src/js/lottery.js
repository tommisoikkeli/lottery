const MIN_NUMBER = 1;
const MAX_NUMBER = 40;
const SELECTED_MAX_LENGTH = 7;
let SELECTED_NUMBERS = [];

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

const selectNumber = number => {
  const selectedNumber = parseInt(number.getAttribute('value'));
  if (!SELECTED_NUMBERS.includes(selectedNumber)) {
    if (SELECTED_NUMBERS.length === SELECTED_MAX_LENGTH) return;
    number.classList.add('selected');
    SELECTED_NUMBERS = [...SELECTED_NUMBERS, selectedNumber];
  } else {
    number.classList.remove('selected');
    SELECTED_NUMBERS = SELECTED_NUMBERS.filter(n => n !== selectedNumber);
  }
  console.log(SELECTED_NUMBERS);
  updateIndicator(SELECTED_MAX_LENGTH - SELECTED_NUMBERS.length);
};

const addEventListenersToNumbers = () => {
  const numbers = Array.from(document.querySelectorAll('.number'));
  numbers.forEach(number =>
    number.addEventListener('click', function() {
      selectNumber(number);
    })
  );
};

const updateIndicator = number => {
  const indicator = document.getElementById('left-indicator');
  indicator.innerHTML =
    number === 1 ? '1 number left' : `${number} numbers left`;
};
