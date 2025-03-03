import React from "react";

const MyOrders = () => {
  
  const orders = [
    {
      id: 1,
      productName: "Wireless Headphones",
      image: "https://media.istockphoto.com/id/1246138278/photo/silver-metallic-white-wireless-headphones-in-the-air-isolated-on-white-background-music.jpg?s=612x612&w=0&k=20&c=Xs150nT8O2jHQJ3tSA221BKFy--xHwfLd_kVYVGUgTY=",
      price: "$59.99",
      status: "Delivered",
      date: "Feb 20, 2025",
    },
    {
      id: 2,
      productName: "Smart Watch",
      image: "https://m.media-amazon.com/images/I/61GRy-zyB-L.AC_UF1000,1000_QL80.jpg",
      price: "$120.00",
      status: "Shipped",
      date: "Feb 22, 2025",
    },
    {
      id: 3,
      productName: "Gaming Mouse",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHoHiAiSQSHvs36ewynHOwVLpU6ASMaaU46lIJ0uqI686_M-JlI_Z305P8z57hTdGFdo&usqp=CAU",
      price: "$35.50",
      status: "Shipped",
      date: "Feb 25, 2025",
    },
    {
      id: 3,
      productName: "Camera",
      image: "https://rukminim2.flixcart.com/image/312/312/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70",
      price: "$35.50",
      status: "Shipped",
      date: "Feb 25, 2025",
    },
    {
      id: 3,
      productName: "Tablets",
      image: "https://rukminim2.flixcart.com/image/300/300/xif0q/tablet/f/k/b/-original-imah4rktdpdfyhbm.jpeg?q=90",
      price: "$35.50",
      status: "Processing",
      date: "Feb 25, 2025",
    },
    {
      id: 3,
      productName: "Concept Kart Kz Edx Pro Iem Earphone, Hifi",
      image: "https://m.media-amazon.com/images/I/41DBxt4bU+L.AC_SX250.jpg",
      price: "$35.50",
      status: "Processing",
      date: "Feb 25, 2025",
    },
    {
      id: 3,
      productName:" Projector" ,
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/projector/h/o/g/smart-led-4k-mini-projector-1080p-full-hd-wifi-bluetooth-5-0-180-original-imah7wuz9z9egphx.jpeg?q=70",
      price: "$35.50",
      status: "Delivered",
      date: "Feb 25, 2025",
    },
    {
      id: 3,
      productName: "6 in 1 Vlogging Kit for iPhone & Android",
      image: "https://m.media-amazon.com/images/I/41M8N3LlaSL.AC_SX250.jpg",
      price: "$35.50",
      status: "Processing",
      date: "Feb 25, 2025",
    },
    {
      id: 3,
      productName: "Printer",
      image: "https://m.media-amazon.com/images/I/71+bdkphBpL.AC_UL320.jpg",
      price: "$35.50",
      status: "Delivered",
      date: "Feb 25, 2025",
    },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto mt-32">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">My Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
           className="bg-white p-6 rounded-xl shadow-lg transition-all duration-500 border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 active:scale-105 active:z-10 focus:z-10  flex flex-col sm:flex-row items-center gap-6"

 
          >
            <img
              src={order.image}
              alt={order.productName}
              className="w-24 h-24 object-cover rounded-lg  :"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{order.productName}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Price:</span> {order.price}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-gray-400 text-sm">
                <span className="font-medium">Ordered on:</span> {order.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;