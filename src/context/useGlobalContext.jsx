import { createContext, useContext, useState } from "react";

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const addToCart = () => {};

  const removeProductItem = (id) => {
    const newProductList = cartList.filter(
      (eachProduct) => eachProduct.id !== id
    );
    setCartList(newProductList);
  };
  const removeAllCartItems = () => {};

  return (
    <GlobalContext.Provider
      value={{ cartList, setCartList, addToCart, removeProductItem }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
