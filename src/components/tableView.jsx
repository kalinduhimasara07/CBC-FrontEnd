import { useState } from "react";
import axios from "axios";

function TableView({ orders, refreshOrders }) {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        orderId,
        status: newStatus,
      });
      if (refreshOrders) refreshOrders(); // re-fetch order list if needed
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update order status.");
    }
  };

  return (
    <table className="min-w-full bg-white border rounded-xl shadow-sm text-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3 border">Order ID</th>
          <th className="p-3 border">Customer</th>
          <th className="p-3 border">Email</th>
          <th className="p-3 border">Date</th>
          <th className="p-3 border">Status</th>
          <th className="p-3 border">Products</th>
          <th className="p-3 border">Total</th>
          <th className="p-3 border">Grand Total</th>
          <th className="p-3 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <React.Fragment key={order._id}>
            <tr className="hover:bg-gray-200 cursor-pointer">
              {/* Basic fields */}
              <td className="p-3 border" onClick={() => { setSelectedOrder(order); setIsOpen(true); }}>{order.orderId}</td>
              <td className="p-3 border" onClick={() => { setSelectedOrder(order); setIsOpen(true); }}>{order.name}</td>
              <td className="p-3 border" onClick={() => { setSelectedOrder(order); setIsOpen(true); }}>{order.email}</td>
              <td className="p-3 border" onClick={() => { setSelectedOrder(order); setIsOpen(true); }}>
                {new Date(order.date).toLocaleString()}
              </td>

              {/* ✅ Status dropdown */}
              <td className="p-3 border capitalize">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>

              {/* Other fields */}
              <td className="p-3 border" onClick={() => { setSelectedOrder(order); setIsOpen(true); }}>
                {order.products.length}
              </td>
              <td className="p-3 border" onClick={() => { setSelectedOrder(order); setIsOpen(true); }}>
                ${order.total.toFixed(2)}
              </td>
              <td className="p-3 border font-semibold" onClick={() => { setSelectedOrder(order); setIsOpen(true); }}>
                ${order.grandTotal.toFixed(2)}
              </td>

              {/* Actions */}
              <td className="p-3 border space-y-1">
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  className="text-blue-600 hover:underline block"
                >
                  {expandedOrder === order._id ? "Hide" : "View"}
                </button>
                <button
                  onClick={() => generatePDF(order)}
                  className="text-green-600 hover:underline block"
                >
                  Download Bill
                </button>
              </td>
            </tr>

            {/* Expanded product details */}
            {expandedOrder === order._id && (
              <tr>
                <td colSpan="9" className="p-4 border bg-gray-50">
                  <div className="grid gap-4">
                    <h3 className="font-semibold text-gray-700">Products:</h3>
                    {order.products.map((product) => (
                      <div key={product._id} className="flex gap-4 items-start border rounded p-3 bg-white">
                        <img
                          src={product.productInfo.images[0]}
                          alt={product.productInfo.name}
                          className="w-16 h-16 rounded object-cover border"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-500">{product.productInfo.productId}</p>
                          <p className="font-semibold text-sm">{product.productInfo.name}</p>
                          <p className="text-gray-600 text-sm">Quantity: {product.quantity}</p>
                          <p className="text-gray-600 text-sm">Price: ${product.productInfo.price.toFixed(2)}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {product.productInfo.description.substring(0, 100)}
                            {product.productInfo.description.length > 100 ? "..." : ""}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 grid gap-1 text-sm text-gray-700">
                      <p><strong>Shipping:</strong> ${order.shipping.toFixed(2)}</p>
                      <p><strong>Tax:</strong> ${order.tax.toFixed(2)}</p>
                      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                      <p className="font-semibold"><strong>Grand Total:</strong> ${order.grandTotal.toFixed(2)}</p>
                    </div>

                    <div className="mt-4 text-sm text-gray-700">
                      <h4 className="font-semibold">Shipping Address:</h4>
                      <p>{order.address}</p>
                      <p>{order.city}, {order.state}, {order.zip}, Sri Lanka</p>
                      <p>Phone: {order.phone}</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default TableView;
