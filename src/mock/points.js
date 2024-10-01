import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

const mockPoints = [
  {
    'id': nanoid(),
    'basePrice': 100,
    'dateFrom': dayjs('2024-1-1T20:0').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-1-1T21:0').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '1',
    'isFavorite': false,
    'offers': ['1', '2'],
    'type': 'taxi'
  },
  {
    'id': nanoid(),
    'basePrice': 20,
    'dateFrom': dayjs('2024-10-3T7:50').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-10-3T15:25').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '2',
    'isFavorite': true,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': nanoid(),
    'basePrice': 35,
    'dateFrom': dayjs('2024-9-13T15:50').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-9-13T16:30').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '3',
    'isFavorite': false,
    'offers': ['2'],
    'type': 'train'
  },
  {
    'id': nanoid(),
    'basePrice': 56,
    'dateFrom': dayjs('2024-6-11T15:0').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-6-11T17:25').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '4',
    'isFavorite': true,
    'offers': ['1'],
    'type': 'ship'
  },
  {
    'id': nanoid(),
    'basePrice': 400,
    'dateFrom': dayjs('2024-11-24T10:10').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-11-25T23:20').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '5',
    'isFavorite': false,
    'offers': ['2'],
    'type': 'drive'
  },
  {
    'id': nanoid(),
    'basePrice': 340,
    'dateFrom': dayjs('2024-3-14T9:45').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-3-14T11:0').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '6',
    'isFavorite': false,
    'offers': ['1', '3'],
    'type': 'flight'
  },
  {
    'id': nanoid(),
    'basePrice': 65,
    'dateFrom': dayjs('2024-7-23T10:25').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-7-23T11:15').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '7',
    'isFavorite': true,
    'offers': ['1'],
    'type': 'check-in'
  },
  {
    'id': nanoid(),
    'basePrice': 15,
    'dateFrom': dayjs('2024-5-20T23:20').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-5-21T1:0').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '8',
    'isFavorite': false,
    'offers': ['1'],
    'type': 'sightseeing'
  },
  {
    'id': nanoid(),
    'basePrice': 125,
    'dateFrom': dayjs('2024-1-2T19:0').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'dateTo': dayjs('2024-1-2T21:30').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    'destination': '9',
    'isFavorite': true,
    'offers': ['1', '2'],
    'type': 'restaurant'
  },
];
const getMockPoints = () => mockPoints;

export { getMockPoints };
