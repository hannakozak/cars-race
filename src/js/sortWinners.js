/* eslint-disable no-unused-expressions */
import { carsState } from "../services/cars";
import { getWinnersByPage } from "../services/winners";
import { createTableBody } from "../views/winners/winners";
import { getDataFromStorage, saveDataToStorage } from "./localStorage";

export const renderSortedWinners = async () => {
  const currentWinnersPage = getDataFromStorage("currentWinnersPage");
  const sortBy = getDataFromStorage("sortBy");
  const sortOrder = getDataFromStorage("sortOrder");
  const data = await getWinnersByPage(currentWinnersPage, sortBy, sortOrder);
  const tableBody = document.querySelector(".table-body");
  const winnersTable = document.querySelector(".table");
  tableBody.remove();
  const { cars } = carsState;
  const winners = data.items;
  const sortedBody = createTableBody(cars, winners);
  winnersTable.appendChild(sortedBody);
};

export const toggleWins = async () => {
  const waitForElement = setInterval(() => {
    const winsButton = document.querySelector(".sort-by-wins");
    const ascButton = document.querySelector(".asc-wins-button");
    const descButton = document.querySelector(".desc-wins-button");
    saveDataToStorage("sortBy", "wins");
    if (winsButton.length !== null && ascButton.length !== null && descButton.length !== null) {
      clearInterval(waitForElement);
      ascButton.addEventListener("click", () => {
        saveDataToStorage("sortOrder", "ASC");
        renderSortedWinners();
      });
      descButton.addEventListener("click", () => {
        saveDataToStorage("sortOrder", "DESC");
        renderSortedWinners();
      });
    }
  }, 0);
};

export const toggleByBestTime = async () => {
  const waitForElement = setInterval(() => {
    const sortByTime = document.querySelector(".sort-by-time");
    const ascTimeButton = document.querySelector(".asc-time-button");
    const descTimeButton = document.querySelector(".desc-time-button");
    saveDataToStorage("sortBy", "time");
    if (sortByTime.length !== null && ascTimeButton.length !== null
      && descTimeButton.length !== null) {
      clearInterval(waitForElement);
      ascTimeButton.addEventListener("click", () => {
        saveDataToStorage("sortOrder", "ASC");
        renderSortedWinners();
      });
      descTimeButton.addEventListener("click", () => {
        saveDataToStorage("sortOrder", "DESC");
        renderSortedWinners();
      });
    }
  }, 0);
};
