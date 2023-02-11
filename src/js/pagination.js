import { saveDataToStorage } from './localStorage';

export const nextPage = (data, dataPerPage, currentPage, name, next) => {
  const nextButton = document.querySelector(`.${next}`);

  const numberOfPages = Math.ceil(data.items.length / dataPerPage);
  if (data.items.length > dataPerPage && currentPage < numberOfPages) {
    nextButton.disabled = false;
  }
  nextButton.addEventListener('click', async () => {
    window.location.reload();
    saveDataToStorage(name, currentPage + 1);
  });
};

export const previousPage = (data, dataPerPage, currentPage, name, previous) => {
  const previousButton = document.querySelector(`.${previous}`);

  if (data.items.length > dataPerPage && currentPage > 1) {
    previousButton.disabled = false;
  }
  previousButton.addEventListener('click', async () => {
    window.location.reload();
    saveDataToStorage(name, currentPage - 1);
  });
};

export const updatePagination = (data, dataPerPage, currentPage, name, next, previous) => {
  nextPage(data, dataPerPage, currentPage, name, next);
  previousPage(data, dataPerPage, currentPage, name, previous);
};
