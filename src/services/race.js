import { saveWinner } from '../js/saveWinner';
import { showWinner } from '../js/showWinner';
import { startCarAnimation, stopCarAnimation } from './animation';

const toggleResetButton = () => {
  const resetButton = document.querySelector('.reset-button');
  if (resetButton.disabled === true) {
    resetButton.disabled = false;
  } else resetButton.disabled = true;
};

const toggleRaceButton = () => {
  const raceButton = document.querySelector('.race-button');
  if (raceButton.disabled === true) {
    raceButton.disabled = false;
  } else raceButton.disabled = true;
};

export const startRace = async () => {
  const raceButton = document.querySelector('.race-button');
  const cars = document.querySelectorAll('.car');
  const promisedRaces = [];
  cars.forEach((car) => {
    promisedRaces.push(startCarAnimation(car.dataset.id, 'started'));
    raceButton.disabled = true;
  });

  await Promise.any(promisedRaces);
  toggleResetButton();
  showWinner();
  await saveWinner();
  document.addEventListener('click', () => window.location.reload());
};

export const resetRace = async () => {
  const cars = document.querySelectorAll('.car');
  const promisedResets = [];
  cars.forEach((car) => {
    promisedResets.push(stopCarAnimation(car.dataset.id, 'stopped'));
  });

  await Promise.allSettled(promisedResets);

  toggleResetButton();
  toggleRaceButton();
};
