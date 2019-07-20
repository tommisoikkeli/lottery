import { populateNumbersSection, onLotteryButtonClick } from './lottery';

populateNumbersSection();

document.getElementById('lottery-button').addEventListener('click', onLotteryButtonClick);
