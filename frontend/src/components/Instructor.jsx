import React, { useContext } from 'react';
import { OrdersContext } from './OrdersContext';

function Instructor() {
  const { orders, toggleVisibility } = useContext(OrdersContext);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.order_id}>
          <p><strong>Description:</strong> {order.description}</p>
          <button onClick={() => toggleVisibility(order.order_id)}>
            {order.isVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      ))}
    </div>
  );
}