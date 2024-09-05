import { getRandomArrayElement, getRandomPicture } from '../utils.js';
import { DESTINATIONS, DESTINATIONS_DESCRIPTIONS } from '../const.js';

const getMockDestination = () => (
  {
    'id': '1',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': `${getRandomArrayElement(DESTINATIONS)}`,
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  });

const getMockDestinations = () => Array.from({ length: 10 }, getMockDestination);

export { getMockDestinations };
