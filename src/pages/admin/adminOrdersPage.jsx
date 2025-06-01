import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from "react-modal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // or "card"
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to access this page.");
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setIsLoading(false);
      });
  }, []);

  function TableView({ orders }) {
    const [expandedOrder, setExpandedOrder] = useState(null);

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
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td
                  className="p-3 border"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                >
                  {order.orderId}
                </td>
                <td
                  className="p-3 border"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                >
                  {order.name}
                </td>
                <td
                  className="p-3 border"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                >
                  {order.email}
                </td>
                <td
                  className="p-3 border"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                >
                  {new Date(order.date).toLocaleString()}
                </td>
                <td
                  className="p-3 border capitalize"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                >
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                    {order.status}
                  </span>
                </td>
                <td
                  className="p-3 border"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                >
                  {order.products.length}
                </td>
                <td
                  className="p-3 border"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                >
                  ${order.total.toFixed(2)}
                </td>
                <td
                  className="p-3 border font-semibold"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                >
                  ${order.grandTotal.toFixed(2)}
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order._id ? null : order._id
                      )
                    }
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {expandedOrder === order._id ? "Hide" : "View"}
                  </button>
                </td>
              </tr>

              {expandedOrder === order._id && (
                <tr>
                  <td colSpan="9" className="p-4 border bg-gray-50">
                    <div className="grid gap-4">
                      <h3 className="font-semibold text-gray-700">Products:</h3>
                      {order.products.map((product) => (
                        <div
                          key={product._id}
                          className="flex gap-4 items-start border rounded p-3 bg-white"
                        >
                          <img
                            src={product.productInfo.images[0]}
                            alt={product.productInfo.name}
                            className="w-16 h-16 rounded object-cover border"
                          />
                          <div>
                            <p className="font-semibold text-sm text-gray-500">
                              {product.productInfo.productId}
                            </p>
                            <p className="font-semibold text-sm">
                              {product.productInfo.name}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Quantity: {product.quantity}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Price: ${product.productInfo.price.toFixed(2)}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {product.productInfo.description.substring(0, 100)}
                              {product.productInfo.description.length > 100
                                ? "..."
                                : ""}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="mt-4 grid gap-1 text-sm text-gray-700">
                        <p>
                          <strong>Shipping:</strong> $
                          {order.shipping.toFixed(2)}
                        </p>
                        <p>
                          <strong>Tax:</strong> ${order.tax.toFixed(2)}
                        </p>
                        <p>
                          <strong>Total:</strong> ${order.total.toFixed(2)}
                        </p>
                        <p className="font-semibold">
                          <strong>Grand Total:</strong> $
                          {order.grandTotal.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 text-sm text-gray-700">
                        <h4 className="font-semibold">Shipping Address:</h4>
                        <p>{order.address}</p>
                        <p>
                          {order.city}, {order.state}, {order.zip}
                        </p>
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

  function CardView({ orders }) {
    return (
      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-6 shadow-md bg-white"
          >
            <div className="mb-2 text-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Order ID: {order.orderId}
                </h2>
                <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 capitalize">
                  {order.status}
                </span>
              </div>
              <p className="text-sm mt-1">
                Placed on: {new Date(order.date).toLocaleString()}
              </p>
            </div>

            <div className="mt-4 space-y-4">
              {order.products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={product.productInfo.images[0]}
                    alt={product.productInfo.name}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-500">{product.productInfo.productId}</p>
                    <p className="font-medium">{product.productInfo.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Unit Price: ${product.productInfo.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Shipping: ${order.shipping.toFixed(2)}</p>
              <p>Tax: ${order.tax.toFixed(2)}</p>
              <p className="font-bold text-black">
                Grand Total: ${order.grandTotal.toFixed(2)}
              </p>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                <span className="font-medium">Customer:</span> {order.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.email}
              </p>
              <p>
                <span className="font-medium">Address:</span> {order.address},{" "}
                {order.city}, {order.state}, {order.zip}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full p-4 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Orders Page</h1>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Order Details"
        ariaHideApp={false}
        style={{
          content: {
            maxWidth: "700px",
            margin: "auto",
            borderRadius: "16px",
            padding: "30px",
            border: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            backgroundColor: "#fff",
            fontFamily: "Arial, sans-serif",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>🧾 Order Details</h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: "#888",
            }}
          >
            ✖
          </button>
        </div>

        {selectedOrder ? (
          <div style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "20px", lineHeight: "1.6" }}>
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>
              <p>
                <strong>Name:</strong> {selectedOrder.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.phone}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.address},{" "}
                {selectedOrder.city}, {selectedOrder.state}, {selectedOrder.zip}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span style={{ color: "#007bff" }}>{selectedOrder.status}</span>
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.date).toLocaleString()}
              </p>
            </div>

            <hr />

            <h3 style={{ marginTop: "20px" }}>🛍️ Products</h3>
            <div>
              {selectedOrder.products?.length > 0 ? (
                selectedOrder.products.map((product, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "15px",
                      marginBottom: "20px",
                      border: "1px solid #eee",
                      borderRadius: "12px",
                      padding: "15px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <img
                      src={product.productInfo.images?.[0]}
                      alt={product.productInfo.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p className="text-sm text-gray-500">
                        {product.productInfo.productId}
                      </p>
                      <p>
                        <strong>{product.productInfo.name}</strong>
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#666" }}>
                        {product.productInfo.description.substring(0, 60)}
                              {product.productInfo.description.length > 60
                                ? "..."
                                : ""}
                      </p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ${product.productInfo.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>

            <hr />

            <h3 style={{ marginTop: "20px" }}>💰 Totals</h3>
            <div style={{ lineHeight: "1.6" }}>
              <p>
                <strong>Subtotal:</strong> ${selectedOrder.total.toFixed(2)}
              </p>
              <p>
                <strong>Shipping:</strong> ${selectedOrder.shipping.toFixed(2)}
              </p>
              <p>
                <strong>Tax:</strong> ${selectedOrder.tax.toFixed(2)}
              </p>
              <p style={{ fontSize: "1.1rem" }}>
                <strong>Grand Total:</strong> $
                {selectedOrder.grandTotal.toFixed(2)}
              </p>
            </div>
          </div>
        ) : (
          <p>No order selected.</p>
        )}
      </Modal>

      <div className="flex justify-end mb-4">
        <select
          className="border px-3 py-1 rounded"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <option value="table">Table View</option>
          <option value="card">Card View</option>
        </select>
      </div>

      {isLoading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : viewMode === "table" ? (
        <TableView orders={orders} />
      ) : (
        <CardView orders={orders} />
      )}
    </div>
  );
}
