export const renderPagination = (node, previous, next) => {
  const paginationButtonsWrapper = document.createElement('div');
  paginationButtonsWrapper.setAttribute('class', 'pagination-wrapper');
  const previousButton = document.createElement('button');
  previousButton.setAttribute('class', `${previous}`);
  previousButton.disabled = true;
  previousButton.innerHTML = '<';
  const nextButton = document.createElement('button');
  nextButton.setAttribute('class', `${next}`);
  nextButton.disabled = true;
  nextButton.innerHTML = '>';
  paginationButtonsWrapper.appendChild(previousButton);
  paginationButtonsWrapper.appendChild(nextButton);
  node.appendChild(paginationButtonsWrapper);
};
