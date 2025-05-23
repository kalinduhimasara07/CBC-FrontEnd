import { useState } from "react";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-[600px] h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-lg">
        <div className="text-center space-y-2">
          <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 text-lg font-medium">No images available</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-[600px] space-y-6">
      {/* Main Image Display */}
      <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 to-orange-50 group">
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          } group-hover:scale-105`}
          onLoad={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
        />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
            </div>
          </div>
        )}
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center group/btn opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-amber-600 group-hover/btn:text-amber-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center group/btn opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-amber-600 group-hover/btn:text-amber-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="space-y-4">
          {/* Thumbnail Grid */}
          <div className="flex justify-center gap-3 flex-wrap">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                  currentIndex === index
                    ? "ring-4 ring-amber-500 scale-110 shadow-xl"
                    : "hover:ring-2 hover:ring-amber-300 hover:scale-105 shadow-md opacity-70 hover:opacity-100"
                }`}
                onClick={() => goToImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Active overlay */}
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20" />
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200" />
              </button>
            ))}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-amber-600 w-8"
                    : "bg-gray-300 hover:bg-amber-300"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image Info */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">High Quality Images</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Click to enlarge</span>
          </div>
        </div>
      </div>
    </div>
  );
}