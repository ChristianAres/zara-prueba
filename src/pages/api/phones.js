export default function handler(req, res) {
    const phones = [
      { id: 1, name: 'iPhone 15 Pro', brand: 'Apple' },
      { id: 2, name: 'Galaxy S23 Ultra', brand: 'Samsung' },
      { id: 3, name: 'Pixel 8 Pro', brand: 'Google' },
    ];
  
    res.status(200).json(phones);
  }
  