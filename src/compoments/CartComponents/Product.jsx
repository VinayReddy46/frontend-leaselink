const productsData = [
  // Laptops
  {
    id: "dell1",
    name: "Dell Inspiron 15",
    price: 2500,
    images: [
      "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW1geGv?ver=e834&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "laptops",
    brand: "Dell",
    model: "Inspiron 15",
    processor: "Intel Core i5",
    rating: 4,
    insurancePlans: [
      {
        id: 'basic',
        name: 'Dell basic coverage',
        description: 'cover accidental damage',
        price: 400,
      },
      {
        id: 'premium',
        name: 'Dell premium',
        description: 'cover all damages including water damage',
        price: 1600
      }
    ]
  },
  {
    id: 2,
    name: "HP Pavilion x360",
    price: 2800,
    images: [
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1544099858-75feeb57f01b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1544099858-75feeb57f01b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "laptops",
    brand: "HP",
    model: "Pavilion x360",
    processor: "Intel Core i7",
    rating: 4.5,
    insurancePlans: [
      {
        id: 'basic',
        name: 'HP lite',
        description: 'cover accidental damage',
        price: 200
      },
      {
        id: 'premium',
        name: 'HP Advanced',
        description: 'cover all damages including water damage',
        price: 2500
      }
    ]
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1",
    price: 3200,
    images: [
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "laptops",
    brand: "Lenovo",
    model: "ThinkPad X1",
    processor: "Intel Core i7",
    rating: 3.5,
    insurancePlans: [
      {
        id: 'basic',
        name: 'Lenovo Min',
        description: 'cover accidental damage',
        price: 750
      },
      {
        id: 'premium',
        name: 'Lenovo Sheild',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 4,
    name: "MacBook Air M1",
    price: 4500,
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1526570207772-784d36084510?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "laptops",
    brand: "Apple",
    model: "MacBook Air M1",
    processor: "Apple M1",
    rating: 5,
    insurancePlans: [
      {
        id: 'basic',
        name: 'Apple One',
        description: 'cover accidental damage',
        price: 1500
      },
      {
        id: 'premium',
        name: 'Apple Advanced',
        description: 'cover all damages including water damage',
        price: 3500
      }
    ]
  },
  {
    id: 5,
    name: "Acer Aspire 7",
    price: 2600,
    images: [
      "https://images.unsplash.com/photo-1593642632559-8db5b51c28c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593642702821-c8e775f4e513?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "laptops",
    brand: "Acer",
    model: "Aspire 7",
    processor: "AMD Ryzen 5",
    rating: 2,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 6,
    name: "Asus ROG Zephyrus",
    price: 3800,
    images: [
      "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593642703013-5a3b53c965f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "laptops",
    brand: "Asus",
    model: "ROG Zephyrus",
    processor: "Intel Core i9",
    rating: 4.5,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  
  // Printers & Scanners
  {
    id: 7,
    name: "HP LaserJet Pro",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "printers",
    brand: "HP",
    model: "LaserJet Pro",
    processor: "N/A",
    rating: 4.2,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 8,
    name: "Canon PIXMA G3010",
    price: 1000,
    images: [
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "printers",
    brand: "Canon",
    model: "PIXMA G3010",
    processor: "N/A",
    rating: 3.8,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 9,
    name: "Epson EcoTank L3150",
    price: 1100,
    images: [
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "printers",
    brand: "Epson",
    model: "EcoTank L3150",
    processor: "N/A",
    rating: 4.0,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 10,
    name: "Brother DCP-T710W",
    price: 1300,
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "printers",
    brand: "Brother",
    model: "DCP-T710W",
    processor: "N/A",
    rating: 3.9,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 11,
    name: "Samsung Xpress M2021",
    price: 950,
    images: [
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "printers",
    brand: "Samsung",
    model: "Xpress M2021",
    processor: "N/A",
    rating: 3.5,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 12,
    name: "Ricoh SP 210",
    price: 1100,
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "printers",
    brand: "Ricoh",
    model: "SP 210",
    processor: "N/A",
    rating: 3.7,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  
  // TV & Monitors
  {
    id: 13,
    name: "Samsung 43-inch 4K TV",
    price: 3000,
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "monitors",
    brand: "Samsung",
    model: "43-inch 4K TV",
    processor: "N/A",
    rating: 4.6,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 14,
    name: "LG UltraGear 27-inch Monitor",
    price: 2200,
    images: [
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "monitors",
    brand: "LG",
    model: "UltraGear 27-inch",
    processor: "N/A",
    rating: 4.4,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 15,
    name: "Dell 24-inch IPS Monitor",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "monitors",
    brand: "Dell",
    model: "24-inch IPS Monitor",
    processor: "N/A",
    rating: 4.1,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 16,
    name: "Sony Bravia 55-inch 4K",
    price: 4500,
    images: [
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "monitors",
    brand: "Sony",
    model: "Bravia 55-inch 4K",
    processor: "N/A",
    rating: 4.8,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 17,
    name: "BenQ Zowie 144Hz Monitor",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "monitors",
    brand: "BenQ",
    model: "Zowie 144Hz",
    processor: "N/A",
    rating: 4.3,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 18,
    name: "Acer Nitro VG240Y",
    price: 2000,
    images: [
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "monitors",
    brand: "Acer",
    model: "Nitro VG240Y",
    processor: "N/A",
    rating: 4.0,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  // Kitchen Appliances
  {
    id: 19,
    name: "Philips Air Fryer",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1585664811087-47f65abbad64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1544233726-9f1d0ac78485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1585664811087-47f65abbad64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "kitchen",
    processor: "N/A",
    brand: "Philips",
    model: "HD9200/90",
    rating: 4.2,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 20,
    name: "Bajaj Microwave Oven",
    price: 2200,
    images: [
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1585664811087-47f65abbad64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "kitchen",
    processor: "N/A",
    brand: "Bajaj",
    model: "2005 ETB",
    rating: 3.9,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  
  // Projectors
  {
    id: 25,
    name: "Epson Home Cinema",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "projectors",
    processor: "N/A",
    brand: "Epson",
    model: "Home Cinema 2150",
    rating: 4.5,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  },
  {
    id: 26,
    name: "BenQ TH585",
    price: 4000,
    images: [
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    category: "projectors",
    processor: "N/A",
    brand: "BenQ",
    model: "TH585",
    rating: 4.3,
    insurancePlans: [
      {
        id: 'basic',
        name: 'basic coverage',
        description: 'cover accidental damage',
        price: 500
      },
      {
        id: 'premium',
        name: 'full coverage',
        description: 'cover all damages including water damage',
        price: 1500
      }
    ]
  }
];

export default productsData;