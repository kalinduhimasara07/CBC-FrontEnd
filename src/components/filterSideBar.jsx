import React, { useState } from "react";
import { X, ChevronDown, ChevronUp, Filter, Search } from "lucide-react";

export default function CBCFilterSidebar({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    category: false,
    priceRange: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: [0, 50000],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [priceInputs, setPriceInputs] = useState({
    min: 0,
    max: 50000,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (type, value) => {
    const updatedFilters = { ...selectedFilters };
    updatedFilters[type] = updatedFilters[type].includes(value)
      ? updatedFilters[type].filter((item) => item !== value)
      : [...updatedFilters[type], value];

    setSelectedFilters(updatedFilters);
  };

  const handlePriceRangeChange = (type, value) => {
    const updatedPriceRange = [...selectedFilters.priceRange];
    updatedPriceRange[type] = value;

    setSelectedFilters({ ...selectedFilters, priceRange: updatedPriceRange });

    // Update price inputs to match slider
    if (type === 0) {
      setPriceInputs((prev) => ({ ...prev, min: value }));
    } else {
      setPriceInputs((prev) => ({ ...prev, max: value }));
    }
  };

  const handlePriceInputChange = (type, value) => {
    const numValue = parseInt(value) || 0;

    if (type === "min") {
      setPriceInputs((prev) => ({ ...prev, min: numValue }));
      const updatedPriceRange = [numValue, selectedFilters.priceRange[1]];
      setSelectedFilters({ ...selectedFilters, priceRange: updatedPriceRange });
    } else {
      setPriceInputs((prev) => ({ ...prev, max: numValue }));
      const updatedPriceRange = [selectedFilters.priceRange[0], numValue];
      setSelectedFilters({ ...selectedFilters, priceRange: updatedPriceRange });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearAllFilters = () => {
    const defaultFilters = { categories: [], priceRange: [0, 50000] };
    setSelectedFilters(defaultFilters);
    setSearchQuery("");
    setPriceInputs({ min: 0, max: 50000 });

    // Automatically apply filters after clearing
    onFilterChange({
      categories: [],
      priceRange: [0, 50000],
      searchQuery: "",
    });
  };

  const handleApplyFilters = () => {
    // Apply the filters
    onFilterChange({
      categories: selectedFilters.categories,
      priceRange: selectedFilters.priceRange,
      searchQuery: searchQuery,
    });
  };

  const categories = [
    "Face Care",
    "Eye Care",
    "Lip Care",
    "Body Care",
    "Hair Care",
    "Makeup",
    "Fragrance",
    "Sun Care",
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-25 z-50 bg-white shadow-lg rounded-lg p-3 border hover:shadow-xl transition-shadow"
        style={{ borderColor: "#e17100" }}
      >
        <Filter size={24} style={{ color: "#e17100" }} />
      </button>
    );
  }

  return (
    <div className="xl:w-80 h-auto bg-white shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="p-6 border-b border-gray-200 pt-25"
        style={{ borderBottomColor: "#e17100" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#e17100" }}>
              Crystal Beauty Clear
            </h1>
            <p className="text-sm text-gray-600 mt-1">Product Filters</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <button
          onClick={clearAllFilters}
          className="mt-4 text-sm font-medium hover:underline transition-colors"
          style={{ color: "#e17100" }}
        >
          Clear All Filters
        </button>
      </div>

      {/* Search Filter */}
      <div className="border-b border-gray-100 p-4">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Search Products
        </label>
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-sm"
            style={{ focusRingColor: "#e17100" }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-900">Category</span>
          {expandedSections.category ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>
        {expandedSections.category && (
          <div className="px-4 pb-4 space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(category)}
                  onChange={() => handleCheckboxChange("categories", category)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2 mr-3"
                  style={{ accentColor: "#e17100" }}
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleSection("priceRange")}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-900">Price Range</span>
          {expandedSections.priceRange ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>
        {expandedSections.priceRange && (
          <div className="px-4 pb-4">
            <div className="space-y-4">
              {/* Manual Price Input */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50000"
                    value={priceInputs.min}
                    onChange={(e) =>
                      handlePriceInputChange("min", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:border-transparent"
                    style={{ focusRingColor: "#e17100" }}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50000"
                    value={priceInputs.max}
                    onChange={(e) =>
                      handlePriceInputChange("max", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:border-transparent"
                    style={{ focusRingColor: "#e17100" }}
                  />
                </div>
              </div>

              {/* Range Display */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${selectedFilters.priceRange[0]}</span>
                <span>${selectedFilters.priceRange[1]}</span>
              </div>

              {/* Range Sliders */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Minimum Price
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={selectedFilters.priceRange[0]}
                    onChange={(e) =>
                      handlePriceRangeChange(0, parseInt(e.target.value))
                    }
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${
                        (selectedFilters.priceRange[0] / 50000) * 100
                      }%, #e17100 ${
                        (selectedFilters.priceRange[0] / 50000) * 100
                      }%, #e17100 100%)`,
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Maximum Price
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={selectedFilters.priceRange[1]}
                    onChange={(e) =>
                      handlePriceRangeChange(1, parseInt(e.target.value))
                    }
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #e17100 0%, #e17100 ${
                        (selectedFilters.priceRange[1] / 50000) * 100
                      }%, #e5e7eb ${
                        (selectedFilters.priceRange[1] / 50000) * 100
                      }%, #e5e7eb 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Apply Filters Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 px-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#e17100" }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
