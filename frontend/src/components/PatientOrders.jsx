import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';


function PatientOrders({ selectedPatient }) {
  // State to store the orders for the selected patient, initialized as an empty array
  const [orders, setOrders] = useState([]);
  const [visibleOrders, setVisibleOrders] = useState(new Set()); // New state to track visible orders

  // useEffect hook to fetch orders data when selectedPatient changes
  useEffect(() => {
    if (selectedPatient) {
      // Making an HTTP GET request to fetch orders
      axios.get(`http://localhost:3001/patients/${selectedPatient.id}/orders`)
        .then(response => {
          setOrders(response.data); // Updating state with fetched orders
        })
        .catch(error => {
          console.error('Failed to fetch orders:', error);
          toast.error('Failed to fetch orders.'); // Display error notification
        });
    }
  }, [selectedPatient]); // Dependency array includes selectedPatient

  // Conditional rendering to show a message if no orders are found
  if (!orders.length) return <p>No orders found for this patient.</p>;


  // Toggle visibility of an order
  const toggleOrderVisibility = (orderId) => {
    setVisibleOrders((prevVisibleOrders) => {
      const newVisibleOrders = new Set(prevVisibleOrders);
      if (newVisibleOrders.has(orderId)) {
        newVisibleOrders.delete(orderId);
      } else {
        newVisibleOrders.add(orderId);
      }
      return newVisibleOrders;
    });
  };

  if (!orders.length) return <p>No orders found for this patient.</p>;

  return (
    <div className={styles.someClassName}>
      {/* ... existing JSX ... */}
      {orders.map((order) => (
        <div key={order.order_id} style={{
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,.1)'
        }}>
    
          
          {/* Only display order description if it's in the visibleOrders set */}
          {visibleOrders.has(order.order_id) && (
            <p><strong>Description:</strong> {order.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default PatientOrders;