import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Mock data based on your user schema

// Mock icons

const FaBan = ({ className, onClick }) => (
  <span className={`${className} select-none`} onClick={onClick}>
    🚫
  </span>
);

const FaCheck = ({ className, onClick }) => (
  <span className={`${className} select-none`} onClick={onClick}>
    ✅
  </span>
);

const FaTimes = ({ className, onClick }) => (
  <span className={`${className} select-none text-xl`} onClick={onClick}>
    ✕
  </span>
);

const FaUserPlus = ({ className, onClick }) => (
  <span className={`${className} select-none`} onClick={onClick}>
    👤+
  </span>
);

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to access this page.");
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setIsLoading(false);
      });
  }, [isLoading]);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // function deleteUser(userId) {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     setUsers(users.filter((user) => user._id !== userId));
  //     alert(`User deleted successfully`);
  //   }
  // }

  function toggleBlockUser(email, status) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to access this action.");
      window.location.href = "/login";
      return;
    }

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + `/api/users/`,
        { email: email, status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(true);
        toast.success(`User ${status ? "unblocked" : "blocked"} successfully`);
      })
      .catch((err) => {
        console.error("Error updating user status:", err);
        toast.error("Failed to update user status");
      });
  }

  function handleRowClick(user, event) {
    // Prevent modal from opening when clicking on action buttons
    if (event.target.closest(".action-buttons")) {
      return;
    }
    setSelectedUser(user);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedUser(null);
  }

  // function handleEditUser(user) {
  //   alert(`Edit user: ${user.firstName} ${user.lastName}`);
  //   // In real implementation: navigate to edit user page
  // }

  function handleAddUser() {
    // alert("Navigate to add user page");
    toast(
      (t) => (
        <span className="flex flex-col gap-2">
          <strong>You can add only Admin users</strong>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                navigate("/admin/adduser");
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Ok!
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-black px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      {
        duration: 10000,
      }
    );
    // In real implementation: navigate("/admin/add-user");
  }

  function getRoleBadgeColor(role) {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "moderator":
        return "bg-yellow-100 text-yellow-800";
      case "customer":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getStatusBadgeColor(isBlocked) {
    return isBlocked
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";
  }

  // Filter and search functions
  const filteredAndSortedUsers = users
    .filter((user) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === "" ||
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchLower);

      // Role filter
      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !user.isBlocked) ||
        (statusFilter === "blocked" && user.isBlocked);

      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "role":
          aValue = a.role.toLowerCase();
          bValue = b.role.toLowerCase();
          break;
        case "status":
          aValue = a.isBlocked ? "blocked" : "active";
          bValue = b.isBlocked ? "blocked" : "active";
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  function clearFilters() {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
    setSortBy("name");
    setSortOrder("asc");
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Users Management
      </h2>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="role">Role</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* Sort Order & Clear Button */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
              title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
            <button
              onClick={clearFilters}
              className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition text-sm"
              title="Clear all filters"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedUsers.length} of {users.length} users
          {searchTerm && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded">
              Search: "{searchTerm}"
            </span>
          )}
          {roleFilter !== "all" && (
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded">
              Role: {roleFilter}
            </span>
          )}
          {statusFilter !== "all" && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded">
              Status: {statusFilter}
            </span>
          )}
        </div>
      </div>

      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition z-40"
        onClick={handleAddUser}
      >
        <FaUserPlus /> Add User
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-y-auto h-[400px]">
          <table className="min-w-full table-fixed border-collapse overflow-scroll">
            <thead className="bg-gray-300 text-gray-700 text-sm uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="py-3 px-6 text-left w-[12%]">Avatar</th>
                <th className="py-3 px-6 text-left w-[20%]">Name</th>
                <th className="py-3 px-6 text-left w-[25%]">Email</th>
                <th className="py-3 px-6 text-left w-[12%]">Role</th>
                <th className="py-3 px-6 text-left w-[12%]">Status</th>
                <th className="py-3 px-6 text-center w-[19%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6">
                    <div className="flex items-center justify-center h-[200px]">
                      <div className="w-[80px] h-[80px] bg-amber-50 border-4 border-blue-300 rounded-full border-t-blue-600 animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredAndSortedUsers.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
                      <div className="text-4xl mb-4">🔍</div>
                      <div className="text-lg font-medium">No users found</div>
                      <div className="text-sm">
                        Try adjusting your search or filters
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-200 transition hover:shadow-sm cursor-pointer"
                    onClick={(e) => handleRowClick(user, e)}
                    title="Click to view full details"
                  >
                    <td className="py-3 px-6 text-left">
                      <img
                        src={user.img}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="font-medium text-gray-800">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left text-gray-700">
                      {user.email}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                          user.isBlocked
                        )}`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="py-3 px-6 flex gap-3 items-center justify-center text-xl action-buttons">
                        {user.isBlocked ? (
                          <div
                            onClick={() => toggleBlockUser(user.email, false)}
                            className="flex items-center text-green-600 cursor-pointer hover:text-green-800 transition"
                            title="Unblock User"
                          >
                            <FaCheck className="mr-1" />
                            <span className="text-sm font-bold">Unblock</span>
                          </div>
                        ) : (
                          <div
                            onClick={() => toggleBlockUser(user.email, true)}
                            className="flex items-center text-yellow-600 cursor-pointer hover:text-yellow-800 transition"
                            title="Block User"
                          >
                            <FaBan className="mr-1" />
                            <span className="text-sm font-bold">Block</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-[#00000090] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                User Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              {/* User Avatar and Basic Info */}
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={selectedUser.img}
                  alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                />
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h4>
                  <p className="text-gray-600 text-lg">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRoleBadgeColor(
                        selectedUser.role
                      )}`}
                    >
                      {selectedUser.role}
                    </span>
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeColor(
                        selectedUser.isBlocked
                      )}`}
                    >
                      {selectedUser.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    User ID
                  </label>
                  <p className="text-gray-800 font-mono text-sm bg-gray-50 p-2 rounded border">
                    {selectedUser._id}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <p className="text-lg text-gray-800">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email Address
                  </label>
                  <p className="text-lg text-gray-800">{selectedUser.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    User Role
                  </label>
                  <p className="text-lg text-gray-800 capitalize">
                    {selectedUser.role}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Account Status
                  </label>
                  <p
                    className={`text-lg font-semibold ${
                      selectedUser.isBlocked ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {selectedUser.isBlocked ? "Blocked" : "Active"}
                  </p>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Profile Image
                  </label>
                  <p className="text-sm text-gray-600 break-all">
                    {selectedUser.img}
                  </p>
                </div> */}
              </div>

              {/* Action Buttons in Modal */}
              <div className="mt-8 flex gap-4 justify-end border-t border-gray-200 pt-4">
                <button
                  onClick={() => {
                    toggleBlockUser(
                      selectedUser.email,
                      !selectedUser.isBlocked
                    );
                    closeModal();
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                    selectedUser.isBlocked
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-yellow-600 hover:bg-yellow-700 text-white"
                  }`}
                >
                  {selectedUser.isBlocked ? <FaCheck /> : <FaBan />}
                  {selectedUser.isBlocked ? "Unblock User" : "Block User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold text-gray-800">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
          <p className="text-2xl font-bold text-green-600">
            {users.filter((u) => !u.isBlocked).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Blocked Users</h3>
          <p className="text-2xl font-bold text-red-600">
            {users.filter((u) => u.isBlocked).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Admins</h3>
          <p className="text-2xl font-bold text-purple-600">
            {users.filter((u) => u.role === "admin").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">
            Filtered Results
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {filteredAndSortedUsers.length}
          </p>
        </div>
      </div>
    </div>
  );
}
