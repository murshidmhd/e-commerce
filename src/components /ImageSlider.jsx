import React, { useState, useEffect } from "react";
import slide1 from "../assets/slide images/1.png";
import slide2 from "../assets/slide images/2.png";
import slide3 from "../assets/slide images/3.png";

const images = [slide1, slide2, slide3];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-8xl mx-auto h-[500px] overflow-hidden rounded-xl shadow-lg">
      {/* Slides */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`slide-${idx + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
