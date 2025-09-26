// ColorContext.js
import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorWheelContext = ({ children }) => {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

  return (
    <ColorContext.Provider value={{ hsva, setHsva }}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook for easier usage
export const useColorWheel = () => useContext(ColorContext);
