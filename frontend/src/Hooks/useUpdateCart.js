import { useState } from "react";
import { useCart } from "./CartContext"; // Importing cart context

const useUpdateCart = (itemId) => {
  const { updateCart } = useCart(); // Getting updateCart from context
  const [loading, setLoading] = useState(false);

  const sendOperation = async (operation) => {
    try {
      setLoading(true);

      // Send the API request with the operation
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: operation, // either 'increment' or 'decrement'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update cart based on the operation and itemId
        updateCart(operation, itemId);
      } else {
        console.error("Failed to update cart", data);
      }
    } catch (error) {
      console.error("Error while updating cart", error);
    } finally {
      setLoading(false);
    }
  };

  return { sendOperation, loading };
};

export default useUpdateCart;
