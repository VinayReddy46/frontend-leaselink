

const productsData = [
    // Laptops
    {
      id: 1,
      name: "Dell Inspiron 15",
      price: 2500,
      image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW1geGv?ver=e834&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true",
      category: "laptops",
      brand: "Dell",
      model: "Inspiron 15",
      processor: "Intel Core i5",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 2,
      name: "HP Pavilion x360",
      price: 2800,
      image: "https://example.com/hp-pavilion.jpg",
      category: "laptops",
      brand: "HP",
      model: "Pavilion x360",
      processor: "Intel Core i7",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1",
      price: 3200,
      image: "https://example.com/lenovo-thinkpad.jpg",
      category: "laptops",
      brand: "Lenovo",
      model: "ThinkPad X1",
      processor: "Intel Core i7",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 4,
      name: "MacBook Air M1",
      price: 4500,
      image: "https://example.com/macbook-air.jpg",
      category: "laptops",
      brand: "Apple",
      model: "MacBook Air M1",
      processor: "Apple M1",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 5,
      name: "Acer Aspire 7",
      price: 2600,
      image: "https://example.com/acer-aspire.jpg",
      category: "laptops",
      brand: "Acer",
      model: "Aspire 7",
      processor: "AMD Ryzen 5",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 6,
      name: "Asus ROG Zephyrus",
      price: 3800,
      image: "https://example.com/asus-rog.jpg",
      category: "laptops",
      brand: "Asus",
      model: "ROG Zephyrus",
      processor: "Intel Core i9",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    
    // Printers & Scanners
    {
      id: 7,
      name: "HP LaserJet Pro",
      price: 1200,
      image: "https://example.com/hp-laserjet.jpg",
      category: "printers",
      brand: "HP",
      model: "LaserJet Pro",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 8,
      name: "Canon PIXMA G3010",
      price: 1000,
      image: "https://example.com/canon-pixma.jpg",
      category: "printers",
      brand: "Canon",
      model: "PIXMA G3010",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 9,
      name: "Epson EcoTank L3150",
      price: 1100,
      image: "https://example.com/epson-ecotank.jpg",
      category: "printers",
      brand: "Epson",
      model: "EcoTank L3150",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 10,
      name: "Brother DCP-T710W",
      price: 1300,
      image: "https://example.com/brother-dcp.jpg",
      category: "printers",
      brand: "Brother",
      model: "DCP-T710W",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 11,
      name: "Samsung Xpress M2021",
      price: 950,
      image: "https://example.com/samsung-xpress.jpg",
      category: "printers",
      brand: "Samsung",
      model: "Xpress M2021",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 12,
      name: "Ricoh SP 210",
      price: 1100,
      image: "https://example.com/ricoh-sp.jpg",
      category: "printers",
      brand: "Ricoh",
      model: "SP 210",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    
    // TV & Monitors
    {
      id: 13,
      name: "Samsung 43-inch 4K TV",
      price: 3000,
      image: "https://example.com/samsung-4k-tv.jpg",
      category: "monitors",
      brand: "Samsung",
      model: "43-inch 4K TV",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 14,
      name: "LG UltraGear 27-inch Monitor",
      price: 2200,
      image: "https://example.com/lg-ultragear.jpg",
      category: "monitors",
      brand: "LG",
      model: "UltraGear 27-inch",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 15,
      name: "Dell 24-inch IPS Monitor",
      price: 1800,
      image: "https://example.com/dell-ips-monitor.jpg",
      category: "monitors",
      brand: "Dell",
      model: "24-inch IPS Monitor",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 16,
      name: "Sony Bravia 55-inch 4K",
      price: 4500,
      image: "https://example.com/sony-bravia.jpg",
      category: "monitors",
      brand: "Sony",
      model: "Bravia 55-inch 4K",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 17,
      name: "BenQ Zowie 144Hz Monitor",
      price: 2500,
      image: "https://example.com/benq-zowie.jpg",
      category: "monitors",
      brand: "BenQ",
      model: "Zowie 144Hz",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 18,
      name: "Acer Nitro VG240Y",
      price: 2000,
      image: "https://example.com/acer-nitro.jpg",
      category: "monitors",
      brand: "Acer",
      model: "Nitro VG240Y",
      processor: "N/A",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    // Kitchen Appliances
    {
      id: 19,
      name: "Philips Air Fryer",
      price: 1800,
      image: "https://example.com/philips-airfryer.jpg",
      category: "kitchen",
      processor: "N/A",
      brand: "Philips",
      model: "HD9200/90",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 20,
      name: "Bajaj Microwave Oven",
      price: 2200,
      image: "https://example.com/bajaj-microwave.jpg",
      category: "kitchen",
      processor: "N/A",
      brand: "Bajaj",
      model: "2005 ETB",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    
    // Projectors
    {
      id: 25,
      name: "Epson Home Cinema",
      price: 3500,
      image: "https://example.com/epson-home-cinema.jpg",
      category: "projectors",
      processor: "N/A",
      brand: "Epson",
      model: "Home Cinema 2150",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    },
    {
      id: 26,
      name: "BenQ TH585",
      price: 4000,
      image: "https://example.com/benq-th585.jpg",
      category: "projectors",
      processor: "N/A",
      brand: "BenQ",
      model: "TH585",
      insurancePlans:[
        {
          id:'basic',
          name:'basic coverage',
          description:'cover accidental damage',
          price:500
        },
        {
          id:'premium',
          name:'full coverage',
          description:'cover all damages including water damage',
          price:1500
        }
      ]
    }
  ];
  
  export default productsData;