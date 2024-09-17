import { getRandomArrayElement } from '../utils/common.js';
import { getRandomPicture } from '../utils/utils.js';
import { DESTINATIONS_DESCRIPTIONS } from '../const.js';

const mockDestinations = [
  {
    'id': '1',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Bourges',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  },
  {
    'id': '2',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Nantes',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  },
  {
    'id': '3',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Paris',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  },
  {
    'id': '4',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Amiens',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },{
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  },
  {
    'id': '5',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Lyon',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  },
  {
    'id': '6',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Toulouse',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  },
  {
    'id': '7',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Auch',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  },
  {
    'id': '8',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Montpellier',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  },
  {
    'id': '9',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Marseille',
    'pictures': []
  },
  {
    'id': '10',
    'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`,
    'name': 'Nice',
    'pictures': [
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      },
      {
        'src': `${getRandomPicture()}`,
        'description': `${getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)}`
      }
    ]
  }
];


const getMockDestinations = () => mockDestinations;

export { getMockDestinations };
