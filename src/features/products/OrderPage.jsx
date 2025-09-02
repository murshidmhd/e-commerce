// import React, { useState } from "react";

// const sampleOrders = [
//   {
//     id: "order1",
//     date: "2025-08-01",
//     status: "Pending",
//     total: 350,
//     items: [
//       { id: "1", name: "The Great Gatsby", quantity: 2, price: 150 },
//       { id: "3", name: "The Hobbit", quantity: 1, price: 50 },
//     ],
//   },
//   {
//     id: "order2",
//     date: "2025-07-28",
//     status: "Delivered",
//     total: 120,
//     items: [
//       { id: "2", name: "The Catcher in the Rye", quantity: 1, price: 120 },
//     ],
//   },
//   {
//     id: "order3",
//     date: "2025-07-15",
//     status: "Cancelled",
//     total: 200,
//     items: [
//       { id: "4", name: "To Kill a Mockingbird", quantity: 1, price: 200 },
//     ],
//   },
// ];

// function OrderPage() {
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Orders</h1>
//           <p className="text-gray-600">View and manage your order history</p>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
//         </div>

//         {/* Order Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//           {sampleOrders.map((order) => (
//             <div
//               key={order.id}
//               className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
//                 selectedOrder?.id === order.id
//                   ? "ring-2 ring-blue-500 border-blue-500"
//                   : "border border-gray-200"
//               }`}
//               onClick={() => setSelectedOrder(order)}
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       Order #{order.id}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">{order.date}</p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       order.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : order.status === "Delivered"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//                   <div className="text-sm text-gray-600">
//                     {order.items.length} item
//                     {order.items.length !== 1 ? "s" : ""}
//                   </div>
//                   <div className="text-lg font-bold text-blue-600">
//                     ₹{order.total}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Details Panel */}
//         {selectedOrder && (
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fade-in">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Order Details: #{selectedOrder.id}
//               </h2>
//               <button
//                 onClick={() => setSelectedOrder(null)}
//                 className="text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                 <div>
//                   <p className="text-gray-600">Order Date</p>
//                   <p className="font-medium">{selectedOrder.date}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Status</p>
//                   <p
//                     className={`font-medium ${
//                       selectedOrder.status === "Pending"
//                         ? "text-yellow-600"
//                         : selectedOrder.status === "Delivered"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {selectedOrder.status}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Items</p>
//                   <p className="font-medium">
//                     {selectedOrder.items.length} item
//                     {selectedOrder.items.length !== 1 ? "s" : ""}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Total Amount</p>
//                   <p className="font-medium text-blue-600">
//                     ₹{selectedOrder.total}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Items</h3>
//             <div className="divide-y divide-gray-100">
//               {selectedOrder.items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="py-4 flex justify-between items-center"
//                 >
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-800">{item.name}</h4>
//                     <p className="text-sm text-gray-600">
//                       Quantity: {item.quantity}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-gray-800">₹{item.price}</p>
//                     <p className="text-sm text-gray-600">
//                       Subtotal: ₹{item.price * item.quantity}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//               <div>
//                 <p className="text-gray-600">Thank you for your order!</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-lg font-bold text-gray-800">
//                   Total: ₹{selectedOrder.total}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Empty State (if no orders) */}
//         {sampleOrders.length === 0 && (
//           <div className="text-center py-16 bg-white rounded-xl shadow">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 mx-auto text-gray-400 mb-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//               />
//             </svg>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No orders yet
//             </h3>
//             <p className="text-gray-500 mb-6">
//               Your order history will appear here once you make a purchase.
//             </p>
//             <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//               Start Shopping
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Add custom animation */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default OrderPage;

import React from "react";

function OrderPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚀 Coming Soon
        </h1>
        <p className="text-gray-600 text-lg">
          We’re working hard to bring this page to life. Stay tuned!
        </p>
      </div>
    </div>
  );
}

export default OrderPage;
