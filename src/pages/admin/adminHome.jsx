import React from 'react';
import { User, Package, ShoppingCart, TrendingUp, Settings, Bell } from 'lucide-react';

const AdminHomePage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const stats = [
    { title: 'Total Orders', value: '1,247', icon: ShoppingCart, change: '+12%' },
    { title: 'Products', value: '86', icon: Package, change: '+3%' },
    { title: 'Customers', value: '2,341', icon: User, change: '+8%' },
    { title: 'Revenue', value: '$15,892', icon: TrendingUp, change: '+15%' }
  ];

  const quickActions = [
    { title: 'Add New Product', icon: Package, description: 'Add a new cosmetic product' },
    { title: 'View Orders', icon: ShoppingCart, description: 'Manage customer orders' },
    { title: 'Customer Support', icon: User, description: 'Handle customer inquiries' },
    { title: 'Settings', icon: Settings, description: 'Manage store settings' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 to-amber-50 overflow-scroll">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold" style={{color: '#e17100'}}>
                Lumineé Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Bell size={20} />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
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
            <p className="text-xl opacity-90">Ready to illuminate your business today?</p>
            <p className="text-lg opacity-75 mt-2">{currentDate}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-green-600 text-sm font-medium mt-1">{stat.change}</p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <stat.icon size={24} style={{color: '#e17100'}} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors">
                    <action.icon size={24} style={{color: '#e17100'}} />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-gray-900 font-medium">New order received</p>
                <p className="text-gray-600 text-sm">Order #1248 - $89.99</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">2 minutes ago</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div>
                <p className="text-gray-900 font-medium">Product stock updated</p>
                <p className="text-gray-600 text-sm">Rose Gold Highlighter - 15 units added</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">1 hour ago</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div>
                <p className="text-gray-900 font-medium">Customer review received</p>
                <p className="text-gray-600 text-sm">5-star review for Luminous Foundation</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">3 hours ago</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHomePage;