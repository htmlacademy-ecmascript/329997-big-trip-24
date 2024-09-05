const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '1',
        'title': 'Upgrade to a business class',
        'price': 120
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '1',
        'title': 'Upgrade to a business class',
        'price': 300
      },
      {
        'id': '2',
        'title': 'Add a glass of wine',
        'price': 20
      },
      {
        'id': '3',
        'title': 'Add luggage',
        'price': 30
      },
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '1',
        'title': 'Book table at window',
        'price': 20
      },
      {
        'id': '2',
        'title': 'Add specialty of the house',
        'price': 200
      },
      {
        'id': '3',
        'title': 'Add live music',
        'price': 300
      },
    ]
  },
  {
    'type': 'bus',
    'offers': []
  },
];

const getMockOffers = () => mockOffers;

export { getMockOffers };
