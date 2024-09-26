import React, { useState, useRef } from "react";
import { BsArrowsMove } from "react-icons/bs";
import image1 from "../../assets/11.webp";
import image11 from "../../assets/1.webp";
import image3 from "../../assets/33.webp";
import image33 from "../../assets/3.webp";
import image4 from "../../assets/44.webp";
import image44 from "../../assets/4.webp";
import image5 from "../../assets/55.webp";
import image55 from "../../assets/5.webp";

const categoriesArray = ["People", "Animals", "Cars", "Graphics"];

const SliderComponent = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const [activeCategorySliderImage, setActiveCategorySliderImage] =
    useState("Graphics");

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - left;
      const newPosition = Math.min(Math.max((offsetX / width) * 100, 0), 100);
      setPosition(newPosition);
    }
  };

  const handleTouchMove = (e) => {
    const { left, width } = containerRef.current.getBoundingClientRect();
    const offsetX = e.touches[0].clientX - left;
    const newPosition = Math.min(Math.max((offsetX / width) * 100, 0), 100);
    setPosition(newPosition);
  };

  function handleCategoriesImageChanger(e) {
    setActiveCategorySliderImage(e.target.textContent);
  }

  return (
    <div>
      <h1 className="text-4xl md:text-3xl lg:text-5xl text-center font-bold text-gray-700 my-10">
        Ravishing Quality
      </h1>
      <div>
        <ul className="text-xs font-semibold gap-5 flex items-center justify-center sm:text-md  sm:gap-7 bg-indigo-600 text-gray-700 p-2 rounded-lg my-2 sm:font-semibold ">
          {categoriesArray.map((c) => {
            return (
              <li
                key={c}
                onClick={handleCategoriesImageChanger}
                className={`text-white cursor-pointer  ${
                  activeCategorySliderImage === c ? "scale-125 text-black" : ""
                }`}
              >
                {c}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        ref={containerRef}
        className="border-2 relative w-[80vw] h-[50vh]  sm:w-[80vw] sm:h-[60vh] md:w-[60vw] lg:w-[50vw] lg:h-[70vh]  rounded-xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={() => setPosition(50)}
        onMouseDown={() =>
          document.addEventListener("mousemove", handleMouseMove)
        }
        onMouseUp={() =>
          document.removeEventListener("mousemove", handleMouseMove)
        }
        onTouchStart={() =>
          document.addEventListener("touchmove", handleTouchMove)
        }
        onTouchEnd={() =>
          document.removeEventListener("touchmove", handleTouchMove)
        }
      >
        <img
          loading="lazy"
          src={
            activeCategorySliderImage === "People"
              ? image1
              : activeCategorySliderImage === "Cars"
              ? image4
              : activeCategorySliderImage === "Animals"
              ? image3
              : activeCategorySliderImage === "Graphics"
              ? image5
              : ""
          }
          alt="Background Removed"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        />
        <img
          loading="lazy"
          src={
            activeCategorySliderImage === "People"
              ? image11
              : activeCategorySliderImage === "Cars"
              ? image44
              : activeCategorySliderImage === "Animals"
              ? image33
              : activeCategorySliderImage === "Graphics"
              ? image55
              : ""
          }
          alt="Original"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div>
          <BsArrowsMove
            className="absolute top-[50%] bottom-0 w-10 h-10  hover:scale-110 p-2 bg-black bg-opacity-55 text-white rounded-xl  cursor-grab"
            style={{ left: `${position}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
