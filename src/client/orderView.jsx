import axios from "axios";
import { useState, useEffect } from "react";
import { 
  FaCheck, 
  FaClock, 
  FaTruck, 
  FaBox, 
  FaEye,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaShoppingBag 
} from "react-icons/fa";
import Loading from "../components/loading";

// Mock orders data - replace with actual API call
const mockOrders = [
  {
    orderId: "ORD-2024-001234",
    email: "john.doe@email.com",
    name: "John Doe",
    status: "shipped",
    total: 120.00,
    grandTotal: 139.59,
    date: "2024-12-15T10:30:00.000Z",
    itemCount: 2,
    products: [
      {
        productInfo: {
          name: "Premium Wireless Headphones",
          images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
          price: 79.99
        },
        quantity: 1
      },
      {
        productInfo: {
          name: "Smart Phone Case",
          images: ["https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400"],
          price: 39.99
        },
        quantity: 1
      }
    ]
  },
  {
    orderId: "ORD-2024-001235",
    email: "john.doe@email.com",
    name: "John Doe",
    status: "delivered",
    total: 89.99,
    grandTotal: 97.58,
    date: "2024-12-10T14:20:00.000Z",
    itemCount: 1,
    products: [
      {
        productInfo: {
          name: "Bluetooth Speaker",
          images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"],
          price: 89.99
        },
        quantity: 1
      }
    ]
  },
  {
    orderId: "ORD-2024-001236",
    email: "john.doe@email.com",
    name: "John Doe",
    status: "pending",
    total: 199.99,
    grandTotal: 219.58,
    date: "2024-12-18T09:15:00.000Z",
    itemCount: 3,
    products: [
      {
        productInfo: {
          name: "Laptop Stand",
          images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"],
          price: 59.99
        },
        quantity: 1
      },
      {
        productInfo: {
          name: "Wireless Mouse",
          images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"],
          price: 29.99
        },
        quantity: 2
      }
    ]
  },
  {
    orderId: "ORD-2024-001237",
    email: "john.doe@email.com",
    name: "John Doe",
    status: "cancelled",
    total: 149.99,
    grandTotal: 164.49,
    date: "2024-12-05T16:45:00.000Z",
    itemCount: 1,
    products: [
      {
        productInfo: {
          name: "Gaming Keyboard",
          images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400"],
          price: 149.99
        },
        quantity: 1
      }
    ]
  },
  {
    orderId: "ORD-2024-001238",
    email: "john.doe@email.com",
    name: "John Doe",
    status: "confirmed",
    total: 79.99,
    grandTotal: 87.59,
    date: "2024-12-20T11:30:00.000Z",
    itemCount: 2,
    products: [
      {
        productInfo: {
          name: "USB Cable",
          images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400"],
          price: 19.99
        },
        quantity: 2
      },
      {
        productInfo: {
          name: "Power Bank",
          images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400"],
          price: 39.99
        },
        quantity: 1
      }
    ]
  }
];

export default function AllOrdersView() {
  const handleViewOrder = (orderId) => {
    // Navigate to order details - replace with your routing logic
    console.log('Navigate to order:', orderId);
    // Example: window.location.href = `/orders/${orderId}`;
  };
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Simulate API call
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { 
        color: "text-yellow-600 bg-yellow-100", 
        icon: FaClock, 
        text: "Pending"
      },
      confirmed: { 
        color: "text-blue-600 bg-blue-100", 
        icon: FaCheck, 
        text: "Confirmed"
      },
      shipped: { 
        color: "text-purple-600 bg-purple-100", 
        icon: FaTruck, 
        text: "Shipped"
      },
      delivered: { 
        color: "text-green-600 bg-green-100", 
        icon: FaBox, 
        text: "Delivered"
      },
      cancelled: { 
        color: "text-red-600 bg-red-100", 
        icon: FaClock, 
        text: "Cancelled"
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredAndSortedOrders = () => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.products.some(product => 
                             product.productInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.grandTotal - a.grandTotal;
        case "lowest":
          return a.grandTotal - b.grandTotal;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return filtered;
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      pending: orders.filter(o => o.status === 'pending').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      totalSpent: orders.reduce((sum, order) => sum + order.grandTotal, 0)
    };
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  const stats = getOrderStats();
  const filteredOrders = filteredAndSortedOrders();

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gray-50">
      <div className="mt-[100px] w-[95%] lg:w-[90%] max-w-7xl mb-[100px]">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FaShoppingBag className="text-[#e17100]" />
                My Orders
              </h1>
              <p className="text-gray-600 mt-1">View and manage all your orders</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
                <div className="text-sm text-gray-600">Delivered</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">${stats.totalSpent.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e17100] focus:border-transparent"
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e17100] focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            {/* Sort */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e17100] focus:border-transparent appearance-none bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <FaShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria." 
                : "You haven't placed any orders yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={order.orderId} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">Order #{order.orderId}</h3>
                            <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.color} w-fit`}>
                            <StatusIcon className="text-sm" />
                            <span className="font-semibold text-sm">{statusInfo.text}</span>
                          </div>
                        </div>
                        
                        {/* Product Preview */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex -space-x-2">
                            {order.products.slice(0, 3).map((product, index) => (
                              <img
                                key={index}
                                src={product.productInfo.images[0]}
                                alt={product.productInfo.name}
                                className="w-10 h-10 rounded-full border-2 border-white object-cover"
                              />
                            ))}
                            {order.products.length > 3 && (
                              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                                <span className="text-xs font-semibold text-gray-600">
                                  +{order.products.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {order.itemCount} item{order.itemCount > 1 ? 's' : ''}
                          </div>
                        </div>
                        
                        {/* Product Names */}
                        <div className="text-sm text-gray-700 mb-2">
                          {order.products.slice(0, 2).map(product => product.productInfo.name).join(', ')}
                          {order.products.length > 2 && ` and ${order.products.length - 2} more...`}
                        </div>
                      </div>
                      
                      {/* Order Total and Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center lg:flex-col lg:items-end gap-3 lg:w-48">
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-800">
                            ${order.grandTotal.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total Paid
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleViewOrder(order.orderId)}
                          className="flex items-center justify-center gap-2 bg-[#e17100] hover:bg-[#c5610a] text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto"
                        >
                          <FaEye className="text-sm" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button (for pagination) */}
        {filteredOrders.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors">
              Load More Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}