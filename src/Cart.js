import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Cart() {
  const [items, setItems] = useState([])
  useEffect(() => {
    document.getElementById('btnCart').innerHTML = "Cart: " + items.length
  }, [items]);

  return (
    <div>
      Cart
    </div>
  );
}

export default Cart;