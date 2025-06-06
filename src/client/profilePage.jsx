import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
} from "lucide-react";
import axios from "axios";
import Footer from "../components/footer";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: " ",
    dateOfBirth: "",
    bio: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFormData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data or fetch from server
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className="md:h-[calc(100vh-80px)] bg-gray-50 pt-[80px] flex items-center justify-center">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="relative h-32 md:h-48 ">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-400 bg-opacity-20"></div>
            </div>

            <div className="relative px-6 pb-6">
              {/* Profile Picture */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-20">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-white font-bold text-2xl md:text-4xl shadow-lg border-4 border-white">
                    <img src={formData.img} alt="" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white hover:bg-amber-700 transition-colors shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 md:mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formData.firstName.toUpperCase()}{" "}
                    {formData.lastName.toUpperCase()}
                  </h1>
                  <p className="text-gray-600 mt-1">{formData.email}</p>
                </div>

                <div className="flex gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{formData.firstName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{formData.lastName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{formData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {formData.phone ? (
                        <span>formData.bio</span>
                      ) : (
                        "No phone number"
                      )}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {formData.address ? (
                        <span>{formData.address}</span>
                      ) : (
                        "No address"
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
