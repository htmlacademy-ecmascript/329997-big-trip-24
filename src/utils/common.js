
const capitalizeFirstLetter = (inputString) => inputString.charAt(0).toUpperCase() + inputString.slice(1);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (maxValue) => Math.floor(Math.random() * maxValue);

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { capitalizeFirstLetter, getRandomArrayElement, getRandomInteger, updateItem };
