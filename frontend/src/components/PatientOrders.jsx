import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';

function PatientOrders({ selectedPatient }) {
  // State to store the orders for the selected patient, initialized as an empty array
  const [orders, setOrders] = useState([]);

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

  // Component rendering
  return (
    <div className={styles.someClassName}>
      <div style={{
        margin: '4vh',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          borderBottom: '2px solid #007bff',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>Patient Orders</h3>
        {orders.map(order => (
          <div key={order.order_id} style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,.1)'
          }}>
            <h6>Order ID: {order.order_id}</h6>
            <p><strong>Description:</strong> {order.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Exporting the component for use in other parts of the application
export default PatientOrders;
