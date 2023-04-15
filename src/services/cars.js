import { CARS_PER_PAGE } from "../assets/constants";

const baseUrl = "https://cars-race.vercel.app";

const cars = `${baseUrl}/garage`;

export const carsState = {
  cars: [],
  carsCount: 0,
  carsByPage: [],
};

export const getAll = async () => {
  try {
    const response = await fetch(`${cars}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = {
      items: await response.json(),
      count: response.headers.get("X-Total-Count"),
    };
    carsState.cars = data.items;
    carsState.carsCount = data.count;
    return data;
  } catch (error) {
    throw new Error(`Could not get data: ${error}`);
  }
};

export const getAllByPage = async (page) => {
  try {
    const response = await fetch(
      `${cars}?_limit=${CARS_PER_PAGE}&_page=${page}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = {
      items: await response.json(),
      count: response.headers.get("X-Total-Count"),
    };
    carsState.carsByPage = data;
    return data;
  } catch (error) {
    throw new Error(`Could not get data: ${error}`);
  }
};

export const getCarById = async (id) => {
  try {
    const response = await fetch(`${cars}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Could not get data: ${error}`);
  }
};

export const addCar = async (data) => {
  try {
    const response = await fetch(`${cars}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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

export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${cars}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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

export const updateCar = async (id, data) => {
  try {
    const response = await fetch(`${cars}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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
