import { addCar } from '../services/cars';

export const createCar = async () => {
  const waitForElement = setInterval(() => {
    const createButton = document.querySelector('.create-button');
    if (createButton) {
      clearInterval(waitForElement);

      createButton.addEventListener('click', async () => {
        const nameInput = document.getElementById('car-name');
        const colorInput = document.getElementById('car-color');
        const data = { name: nameInput.value, color: colorInput.value };
        await addCar(data);
        window.location.reload();
      });
    }
  }, 0);
};
