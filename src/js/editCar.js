import { getAll, updateCar } from '../services/cars';

export const editCar = async () => {
  const waitForElement = setInterval(async () => {
    const selectButtons = document.querySelectorAll('.select-button');
    if (selectButtons.length !== null) {
      clearInterval(waitForElement);

      [...selectButtons].forEach((button) => {
        button.addEventListener('click', async () => {
          const page = JSON.parse(localStorage.getItem('page'));
          const updateNameInput = document.querySelector('.update-name-input');
          const updateColorInput = document.querySelector('.update-color-input');
          const data = await getAll(page);
          const carId = +button.dataset.buttonId;
          const carToUpdate = data.items.find((car) => car.id === carId);
          const carName = carToUpdate.name;
          const carColor = carToUpdate.color;
          if (carName) {
            updateNameInput.value = carName;
          }
          if (carColor) {
            updateColorInput.value = carColor;
          }
          const updateButton = document.querySelector('.update-button');
          updateButton.addEventListener('click', async () => {
            const updatedCar = { name: updateNameInput.value, color: updateColorInput.value };
            await updateCar(carId, updatedCar);
            window.location.reload();
          });
        });
      });
    }
  }, 0);
};
