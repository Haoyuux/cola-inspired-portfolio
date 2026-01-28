// ProductThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProductThemeContextType {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

const ProductThemeContext = createContext<ProductThemeContextType | undefined>(
  undefined,
);

export const ProductThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeColor, setActiveColor] = useState("#e31e24"); // Default red

  return (
    <ProductThemeContext.Provider value={{ activeColor, setActiveColor }}>
      {children}
    </ProductThemeContext.Provider>
  );
};

export const useProductTheme = () => {
  const context = useContext(ProductThemeContext);
  if (!context) {
    throw new Error("useProductTheme must be used within ProductThemeProvider");
  }
  return context;
};
