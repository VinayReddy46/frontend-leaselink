const productsData = [
    {
      id: 1,
      name: "AMD Ryzen 5 5500U",
      processor: "AMD Ryzen 5",
      model: "Basic",
      ssd: "256 GB",
      price: 35000,
      imageUrl: "https://images-cdn.ubuy.co.id/651571ddd4abc70cf15040ab-hp-15-6-fhd-laptop-amd-ryzen-5-5500u.jpg",
    },
    {
      id: 2,
      name: "camera",
      processor: "64px",
      model: "Expert",
      ssd: "512 GB",
      price: 45000,
      imageUrl: "https://cdn.supercommerce.io/kareem/uploads/1603796831_1558260-1649788878.jpg",
    },
    {
      id: 3,
      name: "Tablet",
      processor: "8gb",
      model: "Basic",
      ssd: "128 GB",
      price: 28000,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzoKYAeuVK4kIvrjKXmuU1s5W6cu1Ot7kgA&s",
    },
    {
      id: 4,
      name: "Monitor",
      processor: "core i5",
      model: "Pro",
      ssd: "1 TB",
      price: 70000,
      imageUrl: "https://m.media-amazon.com/images/I/71QXQAl0f7L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 5,
      name: "Mikes",
      processor: "wired",
      model: "Expert",
      ssd: "512 GB",
      price: 5000,
      imageUrl: "https://tsstage.com/cdn/shop/products/mic90_600x600.png?v=1571741219",
    },
    {
      id: 6,
      name: "Television",
      processor: "64 inches",
      model: "Pro",
      ssd: "1 TB",
      price: 50000,
      imageUrl: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/jioretailer/products/pictures/item/free/original/SBSKeqRUgk-bpl-32-hd-television-492166140-i-2-1200wx1200h.jpeg",
    },
    {
      id: 7,
      name: "AMD Ryzen 5 5500U",
      processor: "AMD Ryzen 5",
      model: "Basic",
      ssd: "256 GB",
      price: 35000,
      imageUrl: "https://images-cdn.ubuy.co.id/651571ddd4abc70cf15040ab-hp-15-6-fhd-laptop-amd-ryzen-5-5500u.jpg",
    },
    {
      id: 8,
      name: "camera",
      processor: "64px",
      model: "Expert",
      ssd: "512 GB",
      price: 45000,
      imageUrl: "https://cdn.supercommerce.io/kareem/uploads/1603796831_1558260-1649788878.jpg",
    },
    {
      id: 9,
      name: "Tablet",
      processor: "8gb",
      model: "Basic",
      ssd: "128 GB",
      price: 28000,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzoKYAeuVK4kIvrjKXmuU1s5W6cu1Ot7kgA&s",
    },
    {
      id: 10,
      name: "Monitor",
      processor: "core i5",
      model: "Pro",
      ssd: "1 TB",
      price: 70000,
      imageUrl: "https://m.media-amazon.com/images/I/71QXQAl0f7L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 11,
      name: "Mikes",
      processor: "wired",
      model: "Expert",
      ssd: "512 GB",
      price: 5000,
      imageUrl: "https://tsstage.com/cdn/shop/products/mic90_600x600.png?v=1571741219",
    },
    {
      id: 12,
      name: "Television",
      processor: "64 inches",
      model: "Pro",
      ssd: "1 TB",
      price: 50000,
      imageUrl: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/jioretailer/products/pictures/item/free/original/SBSKeqRUgk-bpl-32-hd-television-492166140-i-2-1200wx1200h.jpeg",
    },
    
    {
      id: 13,
      name: "camera",
      processor: "AMD Ryzen 5",
      model: "Pro",
      ssd: "512 GB",
      price: 60000,
      imageUrl: "https://poojaelectronics.in/storage/2023/08/Nikon-D7500-DSLR-Camera-with-18-140mm-Lens-Online-Buy-India_01.jpg",
    },
    {
      id: 14,
      name: "Television",
      processor: "AMD Ryzen 9",
      model: "Expert",
      ssd: "1 TB",
      price: 95000,
      imageUrl: "https://image.made-in-china.com/2f0j00cFzbODwJMgka/Kuai-TV-Factory-OEM-ODM-LCD-LED-Smart-Android-Television-TV-43-55-65-70-85-100-Large-Size-Flat-Screnn-4K-Ultra-HD-TV.webp",
    },
    {
      id: 15,
      name: "laptop",
      processor: "Intel Core i3",
      model: "Basic",
      ssd: "128 GB",
      price: 25000,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmmvUOvk0JGFqtl6gA6_1zV91lXMLj3FMrIg&s",
    },
    {
      id: 16,
      name: "AMD Ryzen 3 3250U",
      processor: "AMD Ryzen 3",
      model: "Basic",
      ssd: "256 GB",
      price: 30000,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmmvUOvk0JGFqtl6gA6_1zV91lXMLj3FMrIg&s",
    },
    {
      id: 17,
      name: "macbook",
      processor: "Intel Core i7",
      model: "Expert",
      ssd: "512 GB",
      price: 65000,
      imageUrl: "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/wm/164091-laptops-news-apple-s-macbook-air-could-be-getting-bigger-in-2023-image1-4ckrvmv5j7.jpg",
    },
    {
      id: 18,
      name: "AMD Ryzen 5 5500U",
      processor: "AMD Ryzen 5",
      model: "Basic",
      ssd: "256 GB",
      price: 35000,
      imageUrl: "https://images-cdn.ubuy.co.id/651571ddd4abc70cf15040ab-hp-15-6-fhd-laptop-amd-ryzen-5-5500u.jpg",
    },
    {
      id: 19,
      name: "camera",
      processor: "64px",
      model: "Expert",
      ssd: "512 GB",
      price: 45000,
      imageUrl: "https://cdn.supercommerce.io/kareem/uploads/1603796831_1558260-1649788878.jpg",
    },
    {
      id: 20,
      name: "Tablet",
      processor: "8gb",
      model: "Basic",
      ssd: "128 GB",
      price: 28000,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzoKYAeuVK4kIvrjKXmuU1s5W6cu1Ot7kgA&s",
    },
    {
      id: 21,
      name: "Monitor",
      processor: "core i5",
      model: "Pro",
      ssd: "1 TB",
      price: 70000,
      imageUrl: "https://m.media-amazon.com/images/I/71QXQAl0f7L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 22,
      name: "Mikes",
      processor: "wired",
      model: "Expert",
      ssd: "512 GB",
      price: 5000,
      imageUrl: "https://tsstage.com/cdn/shop/products/mic90_600x600.png?v=1571741219",
    },
    {
      id: 23,
      name: "Television",
      processor: "64 inches",
      model: "Pro",
      ssd: "1 TB",
      price: 50000,
      imageUrl: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/jioretailer/products/pictures/item/free/original/SBSKeqRUgk-bpl-32-hd-television-492166140-i-2-1200wx1200h.jpeg",
    },
    {
      id: 24,
      name: "Tablet",
      processor: "AMD Ryzen 9",
      model: "Expert",
      ssd: "1 TB",
      price: 95000,
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2024/06/besttablets-2048px-9875.jpg",
    },
   
      
  ];
  
  export default productsData;
  