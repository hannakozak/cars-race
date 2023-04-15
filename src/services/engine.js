const baseUrl = "https://cars-race.vercel.app";
const engine = `${baseUrl}/engine/`;

export const handleEngine = async (id, status) => {
  try {
    const response = await fetch(
      `${engine}?id=${id}&status=${status}`,
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
        },

      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Could not get data: ${error}`);
  }
};

function handleDriveError(codeError) {
  switch (codeError) {
    case (400):
      throw new Error("Wrong parameters: \"id\" should be any positive number, \"status\" should be \"started\", \"stopped\" or \"drive\"");
    case (404):
      throw new Error("Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to \"started\" before?");
    case (429):
      throw new Error("Drive already in progress. You can't run drive for the same car twice while it's not stopped.");
    case (500):
      throw new Error("Car has stopped suddenly. Its engine broke down.");
    default:
      throw new Error(`HTTP error: ${codeError}`);
  }
}
export const drive = async (id) => {
  try {
    const response = await fetch(
      `${engine}?id=${id}&status=drive`,
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
        },

      },
    );
    if (response.status !== 200) {
      handleDriveError(response.status);
      return false;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Could not get data: ${error}`);
  }
};
