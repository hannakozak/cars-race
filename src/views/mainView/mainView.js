import { garageView } from "../garage/garage";
import { winnersView } from "../winners/winners";
import { createNavigation } from "../../components/navigation/navigation";
import { CARS_PER_PAGE, WINNERS_PER_PAGE } from "../../assets/constants";
import { getDataFromStorage } from "../../js/localStorage";
import { getAll, getAllByPage } from "../../services/cars";
import { getAllWinners, getWinnersByPage } from "../../services/winners";
import { updatePagination } from "../../js/pagination";

const createMainView = (currentGaragePage, currentWinnersPage) => {
  const garage = garageView(currentGaragePage);
  const winners = winnersView(currentWinnersPage);

  const header = document.createElement("div");
  const main = document.createElement("div");
  const garageSection = document.createElement("section");
  garageSection.setAttribute("class", "garage-section");
  const winnersSection = document.createElement("section");
  winnersSection.setAttribute("class", "winners-section");
  const navigation = createNavigation(garageSection, winnersSection);
  garageSection.classList.add("show");
  header.appendChild(navigation);
  garageSection.appendChild(garage);
  winnersSection.appendChild(winners);
  main.appendChild(garageSection);
  main.appendChild(winnersSection);
  document.body.appendChild(header);
  document.body.appendChild(main);
  return document.body;
};

export const renderMainView = async () => {
  const currentGaragePage = getDataFromStorage("currentGaragePage");
  const currentWinnersPage = getDataFromStorage("currentWinnersPage");

  await getAllByPage(currentGaragePage);
  const sortOrder = getDataFromStorage("sortOrder");
  const sortBy = getDataFromStorage("sortBy");
  await getWinnersByPage(currentWinnersPage, sortBy, sortOrder);

  const cars = await getAll();
  const winners = await getAllWinners();
  createMainView(currentGaragePage, currentWinnersPage);
  updatePagination(
    cars,
    CARS_PER_PAGE,
    currentGaragePage,
    "currentGaragePage",
    "nextGarageButton",
    "previousGarageButton"
  );
  updatePagination(
    winners,
    WINNERS_PER_PAGE,
    currentWinnersPage,
    "currentWinnersPage",
    "nextWinnersButton",
    "previousWinnersButton"
  );

  const view = getDataFromStorage("view");
  if (view === "winners") {
    const winnersSection = document.querySelector(".winners-section");
    const garageSection = document.querySelector(".garage-section");
    winnersSection.classList.add("show");
    garageSection.classList.remove("show");
  } else {
    const winnersSection = document.querySelector(".winners-section");
    const garageSection = document.querySelector(".garage-section");
    garageSection.classList.add("show");
    winnersSection.classList.remove("show");
  }
};
