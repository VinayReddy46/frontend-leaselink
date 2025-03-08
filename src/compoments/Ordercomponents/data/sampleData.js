export const orders = [
  {
    orderId: "ORD001",
    lenderId: "L006",
    renterId: "R001",
    product: {
      brand: "Apple",
      name: "MacBook Pro 16",
      description: "Latest MacBook Pro with M1 Pro chip",
      specifications: "16GB RAM, 512GB SSD, 16-inch Retina Display",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      condition: "Excellent",
      serialNumber: "MXAP2LL/A",
      additionalInfo: "Includes charger and protective case"
    },
    insurance: true,
    orderStatus: "accepted",
    paymentStatus: "success",
    deliveryOtp: "123456",
    returnOtp:null,
    deliveryStatus:"pending",
    returnStatus: "pending",
    rentStartTime: null,
    rentEndTime:null,
    renter: {
      name: "John Doe",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      document: "ID12345",
      idProofPhoto: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=500",
      idProofType: "Aadhar Card",
      idProofNumber: "XXXX-XXXX-1234"
    },
    rental: {
      duration: 24,
      startDate: "2024-03-15T10:00:00",
      endDate: "2024-03-16T10:00:00",
      hourlyRate: 25,
      lateFee: 35,
      deposit: 500,
      totalAmount: 600
    }
  },
  {
    orderId: "ORD002",
    lenderId: "L001",
    renterId: "R002",
    product: {
      brand: "Canon",
      name: "EOS R5",
      description: "Professional Mirrorless Camera",
      specifications: "45MP Full-Frame Sensor, 8K Video",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      condition: "Like New",
      serialNumber: "CR5001234",
      additionalInfo: "Includes 24-70mm lens and battery grip"
    },
    insurance: true,
    orderStatus: "accepted",
    paymentStatus: "success",
    deliveryOtp: null,
    returnOtp: null,
    deliveryStatus: "pending",
    returnStatus: "pending",
    rentStartTime: null,
    rentEndTime: null,
    renter: {
      name: "Jane Smith",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      document: "ID67890",
      idProofPhoto: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=500",
      idProofType: "Aadhar Card",
      idProofNumber: "XXXX-XXXX-5678"
    },
    rental: {
      duration: 48,
      startDate: "2024-03-16T14:00:00",
      endDate: "2024-03-18T14:00:00",
      hourlyRate: 35,
      lateFee: 45,
      deposit: 1000,
      totalAmount: 1680
    }
  },
  {
    orderId: "ORD003",
    lenderId: "L001",
    renterId: "R001",
    product: {
      brand: "DJI",
      name: "Mavic 3 Pro",
      description: "Professional Drone with Hasselblad Camera",
      specifications: "4/3 CMOS Sensor, 5.1K Video, 46min Flight Time",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
      condition: "Excellent",
      serialNumber: "DJM3001",
      additionalInfo: "Includes extra batteries and ND filters"
    },
    insurance: true,
    orderStatus: "accepted",
    paymentStatus: "success",
    deliveryOtp: "789012",
    returnOtp: "345678",
    deliveryStatus: "delivered",
    returnStatus: "pending",
    rentStartTime: "2024-03-14T15:30:00",
    rentEndTime: null,
    renter: {
      name: "John Doe",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      document: "ID12345",
      idProofPhoto: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=500",
      idProofType: "Aadhar Card",
      idProofNumber: "XXXX-XXXX-1234"
    },
    rental: {
      duration: 12,
      startDate: "2024-03-14T15:00:00",
      endDate: "2024-03-15T03:00:00",
      hourlyRate: 50,
      lateFee: 65,
      deposit: 1500,
      totalAmount: 600
    }
  },
  {
    orderId: "ORD004",
    lenderId: "L001",
    renterId: "R003",
    product: {
      brand: "Sony",
      name: "PlayStation 5",
      description: "Latest Gaming Console with Controller",
      specifications: "825GB SSD, 4K@120Hz, Ray Tracing",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
      condition: "Good",
      serialNumber: "PS5001ABC",
      additionalInfo: "Includes 2 controllers and 3 games"
    },
    insurance: false,
    orderStatus: "accepted",
    paymentStatus: "success",
    deliveryOtp: "901234",
    returnOtp: "567890",
    deliveryStatus: "returned",
    returnStatus: "returned",
    rentStartTime: "2024-03-10T14:00:00",
    rentEndTime: "2024-03-12T16:00:00",
    renter: {
      name: "Mike Johnson",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      document: "ID34567",
      idProofPhoto: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=500",
      idProofType: "Aadhar Card",
      idProofNumber: "XXXX-XXXX-9012"
    },
    rental: {
      duration: 48,
      startDate: "2024-03-10T14:00:00",
      endDate: "2024-03-12T14:00:00",
      hourlyRate: 15,
      lateFee: 25,
      deposit: 300,
      totalAmount: 720
    }
  },
  {
    orderId: "ORD005",
    lenderId: "L001",
    renterId: "R001",
    product: {
      brand: "GoPro",
      name: "HERO11 Black",
      description: "Advanced Action Camera",
      specifications: "5.3K Video, 27MP Photos, HyperSmooth 5.0",
      image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500",
      condition: "Like New",
      serialNumber: "GP11001XYZ",
      additionalInfo: "Includes mounting accessories and waterproof case"
    },
    insurance: true,
    orderStatus: "declined",
    paymentStatus: "pending",
    deliveryOtp: null,
    returnOtp: null,
    deliveryStatus: "pending",
    returnStatus: "pending",
    rentStartTime: null,
    rentEndTime: null,
    renter: {
      name: "John Doe",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      document: "ID12345",
      idProofPhoto: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=500",
      idProofType: "Aadhar Card",
      idProofNumber: "XXXX-XXXX-1234"
    },
    rental: {
      duration: 72,
      startDate: "2024-03-20T09:00:00",
      endDate: "2024-03-23T09:00:00",
      hourlyRate: 10,
      lateFee: 15,
      deposit: 200,
      totalAmount: 720
    }
  }
];

export const currentUser = {
  id: "L001",
  type: "lender",
  name: "Tech Rentals"
};