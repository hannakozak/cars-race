import "./style.css";
import { editCar } from "./js/editCar";
import { createCar } from "./js/createCar";
import { renderGeneratedCars } from "./js/generateCars";
import { renderMainView } from "./views/mainView/mainView";
import { removeCar } from "./js/removeCar";
import { toggleByBestTime, toggleWins } from "./js/sortWinners";

const init = async () => {
  await renderMainView();
  await createCar();
  await editCar();
  await removeCar();
  await renderGeneratedCars();
  await toggleWins();
  await toggleByBestTime();
};
init();
