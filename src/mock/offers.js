const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '1',
        'name': 'business',
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': '2',
        'name': 'sportcar',
        'title': 'Upgrade to a sportcar class',
        'price': 200
      },
      {
        'id': '3',
        'name': 'rradio',
        'title': 'Choose radio station',
        'price': 20
      },
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': '1',
        'name': 'comfort',
        'title': 'Comfort seat',
        'price': 20
      },
      {
        'id': '2',
        'name': 'alone',
        'title': 'Seat alone',
        'price': 10
      },
      {
        'id': '3',
        'name': 'luggage',
        'title': 'Add luggage',
        'price': 50
      },
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '1',
        'name': 'fast',
        'title': 'Fast train',
        'price': 30
      },
      {
        'id': '2',
        'name': 'business',
        'title': 'Business class coupe',
        'price': 50
      },
      {
        'id': '3',
        'name': 'meal',
        'title': 'Include dinner',
        'price': 50
      },
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': '1',
        'name': 'meal',
        'title': 'Include dinner',
        'price': 30
      },
      {
        'id': '2',
        'name': 'selfie',
        'title': 'Selfie with captain',
        'price': 50
      },
      {
        'id': '3',
        'name': 'luggage',
        'title': 'Add luggage',
        'price': 50
      },
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '1',
        'name': 'sportcar',
        'title': 'Sportcar',
        'price': 300
      },
      {
        'id': '2',
        'name': 'autopilot',
        'title': 'Car with an autopilot',
        'price': 500
      },
      {
        'id': '3',
        'name': 'cabrio',
        'title': 'Cabrio',
        'price': 200
      },
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '1',
        'name': 'business',
        'title': 'Upgrade to a business class',
        'price': 300
      },
      {
        'id': '2',
        'name': 'wine',
        'title': 'Add a glass of wine',
        'price': 20
      },
      {
        'id': '3',
        'name': 'luggage',
        'title': 'Add luggage',
        'price': 30
      },
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '1',
        'name': 'meal',
        'title': 'Include breakfast',
        'price': 30
      },
      {
        'id': '2',
        'name': 'table',
        'title': 'Book a table',
        'price': 20
      },
      {
        'id': '3',
        'name': 'studio',
        'title': 'Studio lights',
        'price': 50
      },
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': '1',
        'name': 'chairs',
        'title': 'Pair of chairs',
        'price': 30
      },
      {
        'id': '2',
        'name': 'table',
        'title': 'Book a table',
        'price': 20
      },
      {
        'id': '3',
        'name': 'surprise',
        'title': 'Surprise for a couple',
        'price': 100
      },
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '1',
        'name': 'table',
        'title': 'Book table at window',
        'price': 20
      },
      {
        'id': '2',
        'name': 'speciality',
        'title': 'Add specialty of the house',
        'price': 200
      },
      {
        'id': '3',
        'name': 'music',
        'title': 'Add live music',
        'price': 300
      },
    ]
  },
  {
    'type': 'bus',
    'offers': []
  }
];

const getMockOffers = () => mockOffers;
export { getMockOffers };


