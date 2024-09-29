import { nanoid } from 'nanoid';

const mockPoints = [
  {
    'id': nanoid(),
    'basePrice': 100,
    'dateFrom': '2024-1-1T20:0',
    'dateTo': '2024-1-1T21:0',
    'destination': '1',
    'isFavorite': false,
    'offers': ['1', '2'],
    'type': 'taxi'
  },
  {
    'id': nanoid(),
    'basePrice': 20,
    'dateFrom': '2024-10-3T7:50',
    'dateTo': '2024-10-3T15:25',
    'destination': '2',
    'isFavorite': true,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': nanoid(),
    'basePrice': 35,
    'dateFrom': '2024-9-13T15:50',
    'dateTo': '2024-9-13T16:30',
    'destination': '3',
    'isFavorite': false,
    'offers': ['2'],
    'type': 'train'
  },
  {
    'id': nanoid(),
    'basePrice': 56,
    'dateFrom': '2024-6-11T15:0',
    'dateTo': '2024-6-11T17:25',
    'destination': '4',
    'isFavorite': true,
    'offers': ['1'],
    'type': 'ship'
  },
  {
    'id': nanoid(),
    'basePrice': 400,
    'dateFrom': '2024-11-24T10:10',
    'dateTo': '2024-11-25T23:20',
    'destination': '5',
    'isFavorite': false,
    'offers': ['2'],
    'type': 'drive'
  },
  {
    'id': nanoid(),
    'basePrice': 340,
    'dateFrom': '2024-3-14T9:45',
    'dateTo': '2024-3-14T11:0',
    'destination': '6',
    'isFavorite': false,
    'offers': ['1', '3'],
    'type': 'flight'
  },
  {
    'id': nanoid(),
    'basePrice': 65,
    'dateFrom': '2024-7-23T10:25',
    'dateTo': '2024-7-23T11:15',
    'destination': '7',
    'isFavorite': true,
    'offers': ['1'],
    'type': 'check-in'
  },
  {
    'id': nanoid(),
    'basePrice': 15,
    'dateFrom': '2024-5-20T23:20',
    'dateTo': '2024-5-21T1:0',
    'destination': '8',
    'isFavorite': false,
    'offers': ['1'],
    'type': 'sightseeing'
  },
  {
    'id': nanoid(),
    'basePrice': 125,
    'dateFrom': '2024-1-2T19:0',
    'dateTo': '2024-1-2T21:30',
    'destination': '9',
    'isFavorite': true,
    'offers': ['1', '2'],
    'type': 'restaurant'
  },
];
const getMockPoints = () => mockPoints;

export { getMockPoints };
