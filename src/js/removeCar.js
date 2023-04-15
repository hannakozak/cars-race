import { carsState, deleteCar } from "../services/cars";
import { state, deleteWinner } from "../services/winners";
import { renderMainView } from "../views/mainView/mainView";

export const removeCar = async () => {
  const waitForElement = setInterval(() => {
    const removeButtons = document.querySelectorAll(".delete-button");
    if (removeButtons) {
      clearInterval(waitForElement);
      [...removeButtons].forEach((button) => {
        button.addEventListener("click", async () => {
          const carId = +button.dataset.deleteButtonId;
          await deleteCar(carId);
          await deleteWinner(carId);
          state.winnersCount -= 1;
          carsState.cars.filter((car) => car.id === carId);
          state.winners.filter((winner) => winner.id === carId);
          window.location.reload();
          renderMainView();
        });
      });
    }
  }, 0);
};
