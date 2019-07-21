import { populateNumbersSection, onLotteryButtonClick, showWinText } from './lottery';

populateNumbersSection();

document.getElementById('lottery-button').addEventListener('click', onLotteryButtonClick);
