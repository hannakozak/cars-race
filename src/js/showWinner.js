import { state } from "../services/winners";
import { carsState } from "../services/cars";

export const showWinner = () => {
  const main = document.querySelector(".main");
  const winnerMessage = document.createElement("div");
  winnerMessage.setAttribute("class", "show-winner");
  const winnerCar = carsState.cars.find(
    (car) => car.id === +state.results[0].id
  );
  winnerMessage.innerText = `${winnerCar.name} wins. Time: ${state.results[0].time}s`;
  main.appendChild(winnerMessage);
  setTimeout(() => {
    winnerMessage.innerText = "";
  }, 9000);
};
