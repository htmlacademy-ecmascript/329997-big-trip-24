const capitalizeString = (inputString) => inputString.charAt(0).toUpperCase() + inputString.slice(1);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (maxValue) => Math.floor(Math.random() * maxValue);

const getRandomPicture = () => `https://loremflickr.com/248/152?random=${getRandomInteger(1000)}`;

export { capitalizeString, getRandomArrayElement, getRandomPicture, getRandomInteger };
