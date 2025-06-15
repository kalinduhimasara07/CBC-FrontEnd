import { useEffect, useRef, useState } from "react";
import mediaUpload from "../utils/mediaUpload";
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
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: " ",
    img: "",
  });
  const token = localStorage.getItem("token");

  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    // If you're only sending a URL, you could upload this to a service like Cloudinary here,
    // but for now, we'll use the local URL temporarily:
    setFormData((prev) => ({
      ...prev,
      img: imageUrl, // Update preview
    }));

    // Optionally: store the file for uploading when user clicks "Save"
    setSelectedImage(file);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFormData(res.data);
        // console.log(res.data);
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

  const handleSave = async () => {
    if (!formData._id) {
      console.error("User ID is missing");
      return;
    }

    try {
      let imageUrl = formData.img;

      // Upload only if a new image was selected
      if (selectedImage) {
        imageUrl = await mediaUpload(selectedImage);
      }

      // Update user data
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${formData._id}`,
        { ...formData, img: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditing(false);
      setSelectedImage(null);
      setFormData((prev) => ({
        ...prev,
        img: imageUrl,
      }));

      // Optional: reload from server if you want fully fresh data
      // Or just update state locally
    } catch (err) {
      console.error("Error during save:", err);
    }
  };

  const handleCancel = () => {
    // Reset form data or fetch from server
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className=" bg-gray-100 pt-[80px] flex items-center justify-center">
        <div className="max-w-6xl mx-auto p-4 md:p-6  pt-[80px]">
          {/* Profile Header */}
          {/* Modern Profile Header */}
          <div className="relative bg-gradient-to-br from-amber-600 to-yellow-400 pt-[50px] h-48 md:h-64 rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Cover Overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between p-6 md:p-8 h-full">
              {/* Avatar */}
              <div className="flex items-center gap-4 -mt-16 md:-mt-20">
                <div className="relative">
                  <img
                    src={formData.img || "/user.png"}
                    alt=""
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageSelect}
                  />

                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCameraClick}
                      className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 hover:shadow transition cursor-pointer"
                    >
                      <Camera className="w-6 h-6 text-amber-600" />
                    </button>
                  )}
                </div>

                <div>
                  <h1 className="text-white text-2xl md:text-3xl font-semibold drop-shadow">
                    {formData.firstName?.toUpperCase()}{" "}
                    {formData.lastName?.toUpperCase()}
                  </h1>
                  <p className="text-white/90 text-sm md:text-base">
                    {formData.email}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 md:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-amber-600 rounded-full hover:bg-gray-100 shadow font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 shadow font-medium"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
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
                        <span>{formData.phone}</span>
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
