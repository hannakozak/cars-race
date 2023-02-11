import './style.garage.css';
import { renderCarImage } from '../../components/car/car';
import flagIcon from '../../assets/images/flag.svg';
import { startCarAnimation, stopCarAnimation } from '../../services/animation';
import { startRace, resetRace } from '../../services/race';
import { carsState } from '../../services/cars';
import { renderPagination } from '../../components/pagination/pagination';

const garageViewWrapper = document.createElement('div');
const title = document.createElement('h1');
const p = document.createElement('p');
const main = document.createElement('div');
main.setAttribute('class', 'main');

const renderCars = (data) => {
  data.items.forEach((item) => {
    const carWrapper = document.createElement('div');
    const actionsWrapper = document.createElement('div');
    actionsWrapper.setAttribute('class', 'actions-wrapper');
    const buttonUpdate = document.createElement('button');
    buttonUpdate.setAttribute('class', 'select-button');
    buttonUpdate.dataset.buttonId = item.id;
    buttonUpdate.innerHTML = 'select';
    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('class', 'delete-button');
    buttonDelete.dataset.deleteButtonId = item.id;
    buttonDelete.innerHTML = 'delete';
    const carName = document.createElement('p');
    carName.innerHTML = item.name;

    actionsWrapper.appendChild(buttonUpdate);
    actionsWrapper.appendChild(buttonDelete);
    actionsWrapper.appendChild(carName);

    const carImageWrapper = document.createElement('div');
    carImageWrapper.setAttribute('class', 'car-image-wrapper');
    const buttonStart = document.createElement('button');
    buttonStart.innerHTML = '>';
    const buttonStop = document.createElement('button');
    buttonStop.disabled = true;
    buttonStop.innerHTML = '||';

    const car = document.createElement('div');
    car.setAttribute('class', 'car');
    car.dataset.id = item.id;

    car.innerHTML = renderCarImage(item.color);
    const flag = document.createElement('img');
    flag.setAttribute('class', 'flag');
    flag.src = flagIcon;

    buttonStart.addEventListener('click', () => {
      buttonStart.disabled = true;
      buttonStop.disabled = false;
      startCarAnimation(item.id, 'started');
    });
    buttonStop.addEventListener('click', () => {
      stopCarAnimation(item.id, 'stopped');
      buttonStop.disabled = true;
      buttonStart.disabled = false;
    });

    carImageWrapper.appendChild(buttonStart);
    carImageWrapper.appendChild(buttonStop);
    carImageWrapper.appendChild(car);
    carImageWrapper.appendChild(flag);

    carWrapper.appendChild(actionsWrapper);
    carWrapper.appendChild(carImageWrapper);
    main.appendChild(carWrapper);
  });
};

const createActionForm = () => {
  const actionFormWrapper = document.createElement('div');
  actionFormWrapper.setAttribute('class', 'action-form-wrapper');
  const createForm = document.createElement('div');

  const actionRow2 = document.createElement('div');
  const actionRow3 = document.createElement('div');

  const inputCreateName = document.createElement('input');
  inputCreateName.type = 'text';
  inputCreateName.setAttribute('id', 'car-name');

  const inputCreateColor = document.createElement('input');
  inputCreateColor.setAttribute('id', 'car-color');

  inputCreateColor.type = 'color';
  const createButton = document.createElement('button');
  createButton.setAttribute('class', 'create-button');
  createButton.innerHTML = 'create';
  const inputUpdateName = document.createElement('input');
  inputUpdateName.setAttribute('class', 'update-name-input');
  inputUpdateName.type = 'text';
  const inputUpdateColor = document.createElement('input');
  inputUpdateColor.setAttribute('class', 'update-color-input');
  inputUpdateColor.type = 'color';
  const updateButton = document.createElement('button');
  updateButton.setAttribute('class', 'update-button');
  updateButton.innerHTML = 'update';

  const raceButton = document.createElement('button');
  raceButton.setAttribute('class', 'race-button');
  raceButton.innerHTML = 'race';
  raceButton.addEventListener('click', startRace);
  const resetButton = document.createElement('button');
  resetButton.setAttribute('class', 'reset-button');
  resetButton.disabled = true;
  resetButton.innerHTML = 'reset';
  resetButton.addEventListener('click', resetRace);
  const generateButton = document.createElement('button');
  generateButton.setAttribute('class', 'generate-button');
  generateButton.innerHTML = 'generate';

  createForm.appendChild(inputCreateName);
  createForm.appendChild(inputCreateColor);
  createForm.appendChild(createButton);

  actionRow2.appendChild(inputUpdateName);
  actionRow2.appendChild(inputUpdateColor);
  actionRow2.appendChild(updateButton);

  actionRow3.appendChild(raceButton);
  actionRow3.appendChild(resetButton);
  actionRow3.appendChild(generateButton);

  actionFormWrapper.appendChild(createForm);
  actionFormWrapper.appendChild(actionRow2);
  actionFormWrapper.appendChild(actionRow3);

  main.appendChild(actionFormWrapper);
};

export const garageView = (page) => {
  const data = carsState.carsByPage;
  garageViewWrapper.setAttribute('class', 'garage-wrapper');
  title.innerText = `Garage (${data.count})`;
  p.innerHTML = `Page: ${page}`;
  createActionForm();
  renderCars(data);

  renderPagination(main, 'previousGarageButton', 'nextGarageButton');
  garageViewWrapper.appendChild(title);
  garageViewWrapper.appendChild(p);

  garageViewWrapper.appendChild(main);
  return garageViewWrapper;
};
