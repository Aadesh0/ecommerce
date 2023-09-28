import product from "@/sanity/schemas/product";
import { createContext, useContext, useState, useEffect } from "react";
import React, { ReactNode } from "react";

import { toast } from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  // Add other properties as needed
}

interface StateContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalQuantites: number;
  setTotalQuantites: React.Dispatch<React.SetStateAction<number>>;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
  onRemove: (product: Product) => void;
}

const Context = createContext<StateContextType | undefined>(undefined);
export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantites, setTotalQuantites] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  let foundProduct: Product | undefined; // Specify Product | undefined type
  let index: number | undefined;

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantites((prevQuantites) => prevQuantites + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product: Product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);

    if (foundProduct) {
      const newCartItems = cartItems.filter((item) => item._id !== product._id);

      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice -
          (foundProduct?.price || 0) * (foundProduct?.quantity || 0)
      );
      setTotalQuantites(
        (prevTotalQuantites) =>
          prevTotalQuantites - (foundProduct?.quantity || 0)
      );
      setCartItems(newCartItems);
    }
  };

  const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
    const foundProductIndex = cartItems.findIndex((item) => item._id === id);

    if (foundProductIndex === -1) {
      return; // Product not found, exit early
    }

    const newCartItems = [...cartItems];
    const foundProduct = newCartItems[foundProductIndex];

    if (value === "inc") {
      newCartItems[foundProductIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantites((prevTotalQuantites) => prevTotalQuantites + 1);
    } else if (value === "dec" && foundProduct.quantity > 1) {
      newCartItems[foundProductIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity - 1,
      };
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantites((prevTotalQuantites) => prevTotalQuantites - 1);
    }

    setCartItems(newCartItems);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantites,
        setTotalQuantites,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};
