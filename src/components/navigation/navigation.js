import { saveDataToStorage } from '../../js/localStorage';
import { renderSortedWinners } from '../../js/sortWinners';
import './style.navigation.css';

const navigation = document.createElement('nav');
const ul = document.createElement('ul');
const garageLink = document.createElement('li');
const winnersLink = document.createElement('li');

const showGarageView = (garageSection, winnersSection) => {
  garageSection.classList.add('show');
  winnersSection.classList.remove('show');
  winnersLink.classList.remove('active');
  garageLink.classList.add('active');
};

const showWinnersView = (garageSection, winnersSection) => {
  garageSection.classList.remove('show');
  winnersSection.classList.add('show');
  garageLink.classList.remove('active');
  winnersLink.classList.add('active');
};

export const createNavigation = (garageSection, winnersSection) => {
  garageLink.innerText = 'garage';
  garageLink.classList.add('active');

  garageLink.addEventListener('click', () => {
    saveDataToStorage('view', 'garage');
    showGarageView(garageSection, winnersSection);
  });

  winnersLink.innerHTML = 'winners';

  winnersLink.addEventListener('click', () => {
    saveDataToStorage('view', 'winners');
    showWinnersView(garageSection, winnersSection);
    renderSortedWinners();
  });

  ul.appendChild(garageLink);
  ul.appendChild(winnersLink);
  navigation.appendChild(ul);
  return navigation;
};
