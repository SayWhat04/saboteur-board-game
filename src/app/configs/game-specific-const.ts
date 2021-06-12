// key - number of players, value - number of saboteurs
export const SABOTEURS = new Map([
  [3, 1], [4, 1], [5, 2], [6, 2],
  [7, 1], [8, 1], [9, 1], [10, 1],
]);
// key - number of players, value - number of miners
export const MINERS = new Map([
  [3, 3], [4, 4], [5, 4], [6, 5],
  [7, 5], [8, 6], [9, 7], [10, 7],
]);
// key - number of players, value - starting hand size
export const STARTING_HAND = new Map([
  [3, 6], [4, 6], [5, 6], [6, 5],
  [7, 5], [8, 4], [9, 4], [10, 4],
]);
// key - number of saboteurs, value - summary reward gold
export const GOLD_FOR_SABOTEURS = new Map([
  [1, 4], [2, 3], [3, 3], [4, 2]
]);
export const POSSIBLE_NO_OF_PLAYERS = [3, 4, 5, 6, 7, 8, 9, 10];

export const IMAGES_PATH = '/assets/images/';
export const SABOTEUR_IMAGE_PATH = `${IMAGES_PATH}saboteur_role.png`;
export const MINER_IMAGE_PATH = `${IMAGES_PATH}miner_role.png`;
