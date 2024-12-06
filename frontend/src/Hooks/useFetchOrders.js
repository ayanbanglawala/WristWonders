import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const useFetchOrders = () => {
  const [loading, setLoading] = useState(false);
  const [allorders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        
        return;
      }

      const data = await response.json();

      const enrichedOrders = await Promise.all(
        data.map(async (order) => {
          const enrichedOrderItems = await Promise.all(
            order.orderItems.map(async (item) => {
              try {
                const productResponse = await fetch(`/api/products/${item.product}`);
                if (!productResponse.ok) {
                  console.error(`Failed to fetch product: ${item.product}`);
                  return { ...item, product: 'Unknown Product' };
                }

                const productData = await productResponse.json();
                return { ...item, product: productData.name }; // Replace product ID with name
              } catch (error) {
                console.error(`Error fetching product: ${error}`);
                return { ...item, product: 'Unknown Product' };
              }
            })
          );

          return { ...order, orderItems: enrichedOrderItems };
        })
      );

      // Reverse the order before updating state
      setOrders(enrichedOrders.reverse());
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency ensures `fetchOrders` reference is stable

  return { loading, allorders, fetchOrders };
};

export default useFetchOrders;
