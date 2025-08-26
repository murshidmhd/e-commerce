import React, { useState, useEffect } from "react";
import slide1 from "../assets/slide images/1.png";
import slide2 from "../assets/slide images/2.png";
import slide3 from "../assets/slide images/3.png";

const images = [slide1, slide2, slide3];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () => setCurrent(prev => (prev + 1) % images.length);
  const goToSlide = index => setCurrent(index);

  return (
    <div className="relative w-full max-w-[1200px] h-[400px] mx-auto overflow-hidden rounded-lg">
      
      {/* Slides */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`slide-${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        />
      ))}

      {/* Prev/Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? "bg-white" : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
