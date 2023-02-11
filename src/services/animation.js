import { handleEngine, drive } from './engine';
import { state } from './winners';

let resultArray = [];
const animate = ({ timing, draw, duration }) => {
  const start = performance.now();

  requestAnimationFrame(function animation(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    const progress = timing(timeFraction);
    draw(progress);
    if (timeFraction < 1) {
      const animationId = requestAnimationFrame(animation);
      localStorage.setItem('animationId', animationId);
    }
  });
  return start;
};

const calculateElementPosition = (element) => {
  const { left, width } = element.getBoundingClientRect();
  return left + width / 2;
};

const calculateDistance = (element1, element2) => {
  const element1Position = calculateElementPosition(element1);
  const element2Position = calculateElementPosition(element2);
  return Math.abs(Math.round(element2Position - element1Position)) + 20;
};

export const startCarAnimation = async (id, status) => {
  const data = await handleEngine(id, status);
  const car = document.querySelector(`[data-id='${id}']`);
  const startPosition = calculateElementPosition(car);
  const duration = Math.round(data.distance / data.velocity);
  const flag = document.querySelectorAll('.flag')[0];
  const distance = calculateDistance(flag, car);

  const start = animate({
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      car.style.left = `${startPosition + progress * distance}px`;
    },
    duration,
  });

  try {
    state.results = [];
    resultArray = [];
    const driving = await drive(id);
    const end = performance.now();
    const result = +((end - start) / 1000).toFixed(2);

    if (resultArray.length === 0) {
      resultArray.push({ id, time: result });
    }
    state.results = resultArray;

    if (!driving) {
      return;
    }
  } catch (error) {
    const animationId = localStorage.getItem('animationId');
    cancelAnimationFrame(animationId);
    throw new Error(error);
  }
};

export const stopCarAnimation = async (id, status) => {
  const car = document.querySelector(`[data-id='${id}']`);
  const animationId = localStorage.getItem('animationId');
  window.cancelAnimationFrame(animationId);
  car.style.left = '150px';
  await handleEngine(id, status);
};
