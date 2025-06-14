import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  Bell,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

const AdminHomePage = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // 🚫 Don't call API if not logged in
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // alert("You are not logged in. Please log in to access this page.");
      toast.error("You are not logged in. Please log in to access this page.");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const fetchedOrders = res.data;

        // Sort by most recent
        const sorted = [...fetchedOrders].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setOrders(fetchedOrders);
        setLatestOrder(sorted[0]);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     // alert("You are not logged in. Please log in to access this page.");
  //     window.location.href = "/login";
  //     return;
  //   }

  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     // alert("You are not logged in. Please log in to access this page.");
  //     window.location.href = "/login";
  //     return;
  //   }

  // }, []);

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      change: "+12%",
    },
    { title: "Products", value: products.length, icon: Package, change: "+3%" },
    {
      title: "Customers",
      value: users.filter((u) => u.role === "customer").length,
      icon: User,
      change: "+8%",
    },
    {
      title: "Revenue",
      value:
        "LKR " +
        orders
          .filter((o) => o.status !== "cancelled")
          .reduce((sum, order) => sum + order.grandTotal, 0)
          .toFixed(2),
      icon: TrendingUp,
      change: "+15%",
    },
  ];

  const quickActions = [
    {
      title: "Add New Product",
      icon: Package,
      description: "Add a new cosmetic product",
      link: "/admin/add-product",
    },
    {
      title: "View Orders",
      icon: ShoppingCart,
      description: "Manage customer orders",
      link: "/admin/order",
    },
    {
      title: "Customer Support",
      icon: User,
      description: "Handle customer inquiries",
      link: "/admin/support",
    },
    {
      title: "Settings",
      icon: Settings,
      description: "Manage store settings",
      link: "/admin/settings",
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 to-amber-50 overflow-scroll">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold" style={{ color: "#e17100" }}>
                Crystal Beauty Clear Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Bell size={20} />
              </button>
              {/* <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div> */}
              {!token ? (
                <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-amber-600 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md hover:scale-105 transition-transform">
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                  {/* <img src={user?.img} alt="" /> */}
                </div>
              ) : (
                <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-amber-600 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md hover:scale-105 transition-transform">
                  {/* <User className="w-4 h-4 md:w-5 md:h-5" /> */}
                  {user?.img ? (
                    <img
                      src={user.img}
                      alt="U"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-4xl font-bold mb-2">Welcome back, Admin!</h2>
            <p className="text-xl opacity-90">
              Ready to illuminate your business today?
            </p>
            <p className="text-lg opacity-75 mt-2">{currentDate}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </p>

                  {stat.value === 0 ? (
                    // Loading placeholder
                    <div className="mt-1 h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  )}
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <stat.icon size={24} style={{ color: "#e17100" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(action.link);
                }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors">
                    <action.icon size={24} style={{ color: "#e17100" }} />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h4>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {latestOrder && (
              <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-gray-900 font-medium">
                    New order received
                  </p>
                  <p className="text-gray-600 text-sm">
                    Order #{latestOrder.orderId} - $
                    {latestOrder.grandTotal.toFixed(2)}
                  </p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  {formatDistanceToNow(new Date(latestOrder.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            )}

            {/* <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div>
                <p className="text-gray-900 font-medium">
                  Product stock updated
                </p>
                <p className="text-gray-600 text-sm">
                  Rose Gold Highlighter - 15 units added
                </p>
              </div>
              <div className="ml-auto text-sm text-gray-500">1 hour ago</div>
            </div> */}

            {/* <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div>
                <p className="text-gray-900 font-medium">
                  Customer review received
                </p>
                <p className="text-gray-600 text-sm">
                  5-star review for Luminous Foundation
                </p>
              </div>
              <div className="ml-auto text-sm text-gray-500">3 hours ago</div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHomePage;
