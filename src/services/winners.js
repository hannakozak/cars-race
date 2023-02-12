import { WINNERS_PER_PAGE } from '../assets/constants';

const baseUrl = 'https://cars-race.vercel.app';

const winners = `${baseUrl}/winners`;

export const state = {
  winners: [],
  winnersCount: 0,
  results: [],
  winnersByPage: [],
};
export const getAllWinners = async () => {
  try {
    const response = await fetch(`${winners}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
    state.winnersCount = data.items.length;
    state.winners = data.items;

    return data;
  } catch (error) {
    throw new Error(`Could not get data: ${error}`);
  }
};
export const getWinnersByPage = async (page, sortBy, order = 'ASC') => {
  try {
    const response = await fetch(`${winners}?_limit=${WINNERS_PER_PAGE}&_page=${page}&_sort=${sortBy}&_order=${order}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };

    state.winnersByPage = data.items;
    return data;
  } catch (error) {
    throw new Error(`Could not get data: ${error}`);
  }
};

export const addWinner = async (data) => {
  try {
    const response = await fetch(`${winners}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Could not create element: ${error}`);
  }
};

export const updateWinner = async (id, data) => {
  try {
    const response = await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Could not create element: ${error}`);
  }
};

export const deleteWinner = async (id) => {
  try {
    const response = await fetch(`${winners}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Could not create element: ${error}`);
  }
};
