import './style.winners.css';
import { state } from '../../services/winners';
import { carsState } from '../../services/cars';
import { renderCarImage } from '../../components/car/car';
import { renderPagination } from '../../components/pagination/pagination';

const winnersViewWrapper = document.createElement('div');
const title = document.createElement('h1');
const tableWrapper = document.createElement('div');

const renderTableHeader = () => {
  const tableHeader = document.createElement('tr');
  tableHeader.setAttribute('class', 'table-header');
  const carId = document.createElement('th');
  carId.innerText = 'Car ID';
  const carImage = document.createElement('th');
  carImage.innerText = 'Car Image';
  const name = document.createElement('th');
  name.innerText = 'Name';
  const wins = document.createElement('th');
  wins.setAttribute('class', 'sort-by-wins');
  wins.innerText = 'Wins';

  const ascWins = document.createElement('button');
  ascWins.setAttribute('class', 'asc-wins-button');
  ascWins.innerText = '\u2191';

  const descWins = document.createElement('button');
  descWins.setAttribute('class', 'desc-wins-button');
  descWins.innerText = '\u2193';

  wins.appendChild(ascWins);
  wins.appendChild(descWins);

  const bestTime = document.createElement('th');
  bestTime.setAttribute('class', 'sort-by-time');
  bestTime.innerText = 'Best time [s]';

  const ascTime = document.createElement('button');
  ascTime.setAttribute('class', 'asc-time-button');
  ascTime.innerText = '\u2191';

  const descTime = document.createElement('button');
  descTime.setAttribute('class', 'desc-time-button');
  descTime.innerText = '\u2193';

  bestTime.appendChild(ascTime);
  bestTime.appendChild(descTime);

  tableHeader.appendChild(carId);
  tableHeader.appendChild(carImage);
  tableHeader.appendChild(name);
  tableHeader.appendChild(wins);
  tableHeader.appendChild(bestTime);
  return tableHeader;
};

export const createTableBody = (cars, winners) => {
  const tableBody = document.createElement('tbody');
  tableBody.setAttribute('class', 'table-body');
  winners.forEach((item) => {
    const winnerCar = cars.find((car) => car.id === item.id);
    if (winnerCar) {
      const tr = document.createElement('tr');
      const carId = document.createElement('td');
      carId.innerText = item.id;
      const carImage = document.createElement('td');
      carImage.innerHTML = renderCarImage(winnerCar.color);
      const carName = document.createElement('td');
      carName.innerText = winnerCar.name;
      const wins = document.createElement('td');
      wins.innerText = item.wins;
      const bestTime = document.createElement('td');
      bestTime.innerText = item.time;
      tr.appendChild(carId);
      tr.appendChild(carImage);
      tr.appendChild(carName);
      tr.appendChild(wins);
      tr.appendChild(bestTime);
      tableBody.appendChild(tr);
    }
  });
  return tableBody;
};
const renderWinnersList = (cars, winners) => {
  const winnersTable = document.createElement('table');
  winnersTable.setAttribute('class', 'table');
  const tableHeader = renderTableHeader();
  winnersTable.appendChild(tableHeader);
  const tableBody = createTableBody(cars, winners);
  winnersTable.appendChild(tableBody);
  tableWrapper.appendChild(winnersTable);
};

export const winnersView = (currentWinnersPage) => {
  const winners = state.winnersByPage;
  const { winnersCount } = state;
  const { cars } = carsState;
  winnersViewWrapper.setAttribute('class', 'winners-wrapper');

  tableWrapper.setAttribute('class', '.table-wrapper');

  title.innerText = `Winners (${winnersCount})`;
  const p = document.createElement('p');
  p.innerText = `(page: ${currentWinnersPage})`;
  winnersViewWrapper.appendChild(title);
  winnersViewWrapper.appendChild(p);

  winnersViewWrapper.appendChild(tableWrapper);

  renderWinnersList(cars, winners);
  renderPagination(winnersViewWrapper, 'previousWinnersButton', 'nextWinnersButton');
  return winnersViewWrapper;
};
