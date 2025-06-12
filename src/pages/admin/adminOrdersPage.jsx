
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from "react-modal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // or "card"
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // New state for search and sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

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
      // Sort orders by date in descending order
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setOrders(sortedOrders);
      setIsLoading(false);
    })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setIsLoading(false);
      });
  }, [isLoading]);

  // Filter and sort function
  const getFilteredAndSortedOrders = () => {
    let filteredOrders = orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.orderId.toLowerCase().includes(searchLower) ||
        order.name.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower) ||
        order.phone.toLowerCase().includes(searchLower)
      );
    });

    return filteredOrders.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "orderId":
          aValue = a.orderId.toLowerCase();
          bValue = b.orderId.toLowerCase();
          break;
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "status":
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        case "total":
          aValue = a.total;
          bValue = b.total;
          break;
        case "grandTotal":
          aValue = a.grandTotal;
          bValue = b.grandTotal;
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortOrder === "asc") {
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      } else {
        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0;
      }
    });
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      pending: orders.filter((o) => o.status === "pending").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      totalSpent: orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, order) => sum + order.grandTotal, 0),
    };
  };

  const stats = getOrderStats();

  const generatePDF = async (order) => {
    const container = document.createElement("div");
    container.style.width = "800px";
    container.style.padding = "30px";
    container.style.fontFamily = "Arial";
    container.innerHTML = `
    <div style="border: 1px solid #ccc; border-radius: 10px; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0;">🧾 Order Invoice</h1>
        <small>${new Date(order.date).toLocaleString()}</small>
      </div>

      <div style="margin-bottom: 20px;">
        <h3>👤 Customer Information</h3>
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}, ${order.city}, ${
      order.state
    }, ${order.zip}, Sri Lanka</p>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
      </div>

      <div>
        <h3>🛒 Ordered Products</h3>
        ${order.products
          .map(
            (product) => `
          <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
            <p><strong>${product.productInfo.name}</strong> (${
              product.productInfo.productId
            })</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Price: $${product.productInfo.price.toFixed(2)}</p>
          </div>
        `
          )
          .join("")}
      </div>

      <div style="margin-top: 20px; font-size: 14px;">
        <p><strong>Subtotal:</strong> $${order.total.toFixed(2)}</p>
        <p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
        <p style="font-weight: bold; font-size: 16px;">Grand Total: $${order.grandTotal.toFixed(
          2
        )}</p>
      </div>
    </div>
  `;

    document.body.appendChild(container);

    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`order_${order.orderId}.pdf`);

    document.body.removeChild(container);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to access this page.");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        { orderId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the orders list after successful update
      setIsLoading(true);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  function TableView({ orders }) {
    const [expandedOrder, setExpandedOrder] = useState(null);

    return (
      <div>

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
                  <td className="p-3 border">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.orderId, e.target.value)
                      }
                      className={`
        px-2 py-1 rounded border capitalize font-medium
        ${
          order.status === "pending"
            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
            : order.status === "confirmed"
            ? "bg-orange-100 text-orange-700 border-orange-300"
            : order.status === "shipped"
            ? "bg-blue-100 text-blue-700 border-blue-300"
            : order.status === "delivered"
            ? "bg-green-100 text-green-700 border-green-300"
            : order.status === "cancelled"
            ? "bg-red-100 text-red-700 border-red-300"
            : ""
        }
      `}
                    >
                      <option
                        value="pending"
                        className="text-yellow-700 font-bold"
                      >
                        Pending
                      </option>
                      <option
                        value="confirmed"
                        className="text-orange-700 font-bold"
                      >
                        Confirmed
                      </option>
                      <option value="shipped" className="text-blue-700 font-bold">
                        Shipped
                      </option>
                      <option
                        value="delivered"
                        className="text-green-700 font-bold"
                      >
                        Delivered
                      </option>
                      <option
                        value="cancelled"
                        className="text-red-700 font-bold"
                      >
                        Cancelled
                      </option>
                    </select>
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
                    LKR {order.total.toFixed(2)}
                  </td>
                  <td
                    className="p-3 border font-semibold"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsOpen(true);
                    }}
                  >
                    LKR {order.grandTotal.toFixed(2)}
                  </td>
                  <td className="p-3 border space-y-1">
                    <button
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === order._id ? null : order._id
                        )
                      }
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
                                {product.productInfo.description.substring(
                                  0,
                                  100
                                )}
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
                            {order.city}, {order.state}, {order.zip}, Sri Lanka
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
      </div>
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
                    <p className="text-sm font-bold text-gray-500">
                      {product.productInfo.productId}
                    </p>
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
                {order.city}, {order.state}, {order.zip}, Sri Lanka.
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-center mb-6">
        <div className="bg-gray-300 rounded-lg p-3 shadow">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-green-200 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600">
            {stats.delivered}
          </div>
          <div className="text-sm text-gray-600">Delivered</div>
        </div>
        <div className="bg-yellow-200 rounded-lg p-3">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-red-200 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-600">
            {stats.cancelled}
          </div>
          <div className="text-sm text-gray-600">Cancelled</div>
        </div>

        <div className="bg-blue-100 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600">
            {stats.shipped}
          </div>
          <div className="text-sm text-gray-600">Shipped</div>
        </div>

        <div className="bg-blue-300 rounded-lg p-3">
          <div className="text-xl text-gray-600">Total</div>
          <div className="text-2xl font-bold text-blue-600">
            LKR {stats.totalSpent.toFixed(2)}
          </div>

          <div className="text-[13px] text-red-600 font-semibold">
            <p>(without cancelled orders)</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Order Details"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
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
                ,Sri Lanka
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
            <button
              onClick={() => generatePDF(selectedOrder)}
              className="text-green-600 hover:underline block"
            >
              Download Bill
            </button>
          </div>
        ) : (
          <p>No order selected.</p>
        )}
      </Modal>

      {/* Search and Sort Controls - Only show for table view */}
      {viewMode === "table" && (
        <div className="mb-4 flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search by Order ID, Customer Name, Email, Status, or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="orderId">Order ID</option>
              <option value="name">Customer Name</option>
              <option value="email">Email</option>
              <option value="status">Status</option>
              <option value="total">Total</option>
              <option value="grandTotal">Grand Total</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

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
        <div className="w-full h-full flex  justify-center">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full border-t-blue-700 animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : viewMode === "table" ? (
        <TableView orders={getFilteredAndSortedOrders()} />
      ) : (
        <CardView orders={orders} />
      )}
    </div>
  );
}
