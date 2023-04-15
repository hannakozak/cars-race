import {
  addWinner, state, updateWinner,
} from "../services/winners";

export const saveWinner = async () => {
  const savedWinners = state.winners;
  const currentWinnerId = +state.results[0].id;
  let currentBestTime = +state.results[0].time;
  const savedWinner = savedWinners.find((winner) => winner.id === currentWinnerId);
  const dataToAdd = { id: +state.results[0].id, wins: 1, time: state.results[0].time };
  let numberOfWins = 1;
  if (savedWinner) {
    numberOfWins = savedWinner.wins + 1;
    if (savedWinner.time < currentBestTime) {
      currentBestTime = savedWinner.time;
    }
    await updateWinner(currentWinnerId, { wins: numberOfWins, time: currentBestTime });
  } else {
    await addWinner(dataToAdd);
    state.winnersCount += 1;
  }
};
