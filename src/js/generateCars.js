import { carBrands, carModels } from '../assets/carModels';
import { addCar, getAll, getAllByPage } from '../services/cars';
import { NUMBER_CARS_TO_GENERATE } from '../assets/constants';
import { getDataFromStorage } from './localStorage';
import { getWinnersByPage } from '../services/winners';

const generateRandomValue = (max) => Math.floor(Math.random() * max) + 1;

const generateRandomCarName = () => {
  const carModel = carModels[generateRandomValue(carModels.length)];
  const carBrand = carBrands[generateRandomValue(carBrands.length)];
  return `${carModel} ${carBrand}`;
};

const generateRandomCarColor = () => {
  const NUMBER_OF_EXISTING_COLORS = 16777215;
  const randomCarColor = `#${Math.floor(Math.random() * NUMBER_OF_EXISTING_COLORS).toString(16)}`;
  return randomCarColor;
};

const generateCars = async () => {
  const carListPromises = [];

  for (let i = 0; i < NUMBER_CARS_TO_GENERATE; i += 1) {
    const carName = generateRandomCarName();
    const carColor = generateRandomCarColor();
    const generatedCar = { name: carName, color: carColor };
    carListPromises.push(addCar(generatedCar));
  }
  await Promise.all(carListPromises);
  window.location.reload();
};

export const renderGeneratedCars = async () => {
  const waitForElement = setInterval(async () => {
    const generateCarsButton = document.querySelector('.generate-button');
    if (generateCarsButton) {
      clearInterval(waitForElement);
      generateCarsButton.addEventListener('click', async () => {
        await generateCars();
        const currentGaragePage = getDataFromStorage('currentGaragePage');
        const currentWinnersPage = getDataFromStorage('currentWinnersPage');
        await getAll();
        await getAllByPage(currentGaragePage);
        await getWinnersByPage(currentWinnersPage);
      });
    }
  });
};
