import axios from "axios";
import React, { createContext, useEffect } from "react";
import { toast } from "react-toastify";
import $ from "jquery";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import BASE_URL from "../Components/Utils/baseUrl";

export let CartContext = createContext(0);

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const [numOfWishlist, setNumOfWishlist] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [cartId, setCartId] = useState(null);

  async function addProductToCart(proId) {
    try {
      const { data } = await axios.post(
        `${BASE_URL}cart`,
        {
          productId: proId,
        },
        {
          headers: { token: localStorage.getItem("ahmedToken") },
        }
      );
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        getCartProducts();
        toast.success(data.message, {
          duration: 1000,
          className: " text-success",
        });
        $("#addBtn").fadeOut(500);
        $("#delBtn").fadeIn(500);
        return true;
      } else {
        toast.error(data.message, {
          duration: 1000,
          className: "bg-black text-white",
        });
        return false;
      }
    } catch (error) {
      // console.log("Error : ", error);
    }
  }

  async function getCartProducts() {
    try {
      const { data } = await axios.get(`${BASE_URL}cart`, {
        headers: { token: localStorage.getItem("ahmedToken") },
      });
      // console.log(data);
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setCartId(data.data._id);
        localStorage.setItem("cartId", data.data._id);
      }
    } catch (error) {
      if (error.response.numOfCartItems === 0) {
        toast.error("No Cart exist for this User", {
          duration: 2000,
          className: "text-danger px-4 fw-bolder",
        });
        <Navigate to={"/home"} />;
      }
    }
  }

  async function removeCartItem(id) {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}cart/${id}`,
        {
          headers: { token: localStorage.getItem("ahmedToken") },
        }
      );
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        getCartProducts();
        toast.success("Product removed successfully from your cart", {
          duration: 3000,
          className: " text-danger",
          iconTheme: {
            primary: "#dc3545",
            secondary: "#fff",
          },
        });
        $("#delBtn").fadeOut(500);
        $("#addBtn").fadeIn(500);
        return true;
      } else {
        toast.error(data.message, {
          duration: 3000,
          className: "bg-black text-white",
        });
        return false;
      }
    } catch (error) {
      // console.log("Error : ", error);
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete(`${BASE_URL}cart`, {
        headers: { token: localStorage.getItem("ahmedToken") },
      });
        // console.log(data);
      if (data.message === "success") {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setCartProducts([]);
        getCartProducts();
        toast.success("Cart cleared successfully", {
          duration: 3000,
          className: " text-success",
        });
        return true;
      } else {
        toast.error(data.message, {
          duration: 3000,
          className: "bg-black text-white",
        });
        return false;
      }
    } catch (error) {
      // console.log("Error: ", error);
    }
  }
  

  async function updateCount(id, numCount) {
    try {
      const { data } = await axios.put(
        `${BASE_URL}cart/${id}`,
        {
          count: numCount,
        },
        {
          headers: { token: localStorage.getItem("ahmedToken") },
        }
      );
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        getCartProducts();
      }
    } catch (error) {
      // console.log("Error : ", error);
    }
  }

  async function getWishlist() {
    try {
      const { data } = await axios.get(`${BASE_URL}wishlist`, {
        headers: { token: localStorage.getItem("ahmedToken") },
      });
      if (data.status === "success") {
        setNumOfWishlist(data.count);
        setWishlistProducts(data.data);
      }
      return true;
    } catch (error) {
      // console.log("Error : ", error);
    }
  }

  async function addToWishlist(id) {
    try {
      const { data } = await axios.post(
        `${BASE_URL}wishlist`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("ahmedToken") },
        }
      );
      if (data.status === "success") {
        setNumOfWishlist(data.count);
        setWishlistProducts(data.data);
        getWishlist();
        toast.success(data.message, {
          duration: 3000,
          className: " text-success",
        });
        return true;
      } else {
        toast.error(data.message, {
          duration: 3000,
          className: "bg-black text-white",
        });
        return false;
      }
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.statusMsg === "fail"
      ) {
        toast.error("You are not logged in. Please login");
      }
      // console.log("Error : ", error);
    }
  }

  async function removeWishlist(id) {
    try {
      const { data } = await axios.delete(`${BASE_URL}wishlist/${id}`, {
        headers: { token: localStorage.getItem("ahmedToken") },
      });
      if (data.status === "success") {
        setNumOfWishlist(data.count);
        setWishlistProducts(data.data);
        getWishlist();
        toast.success(data.message, {
          duration: 3000,
          className: " text-danger",
          iconTheme: {
            primary: "#dc3545",
            secondary: "#fff",
          },
        });
        $("#delWishlist").fadeOut(100);
        $("#addWishlist").fadeIn(100);
        // console.log(data);
        return true;
      } else {
        toast.error(data.message, {
          duration: 3000,
          className: "bg-black text-white",
        });
        return false;
      }
    } catch (error) {
      // console.log("Error : ", error);
    }
  }

  useEffect(function () {
    getWishlist();
  }, []);

  useEffect(function () {
    getCartProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        cartProducts,
        clearCart,
        removeCartItem,
        updateCount,
        addToWishlist,
        removeWishlist,
        numOfWishlist,
        wishlistProducts,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
