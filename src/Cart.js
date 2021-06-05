import React, { useState, useEffect } from 'react';
import './App.css';

function Cart() {
  const [cart, setCart] = useState([])
  useEffect(() => {
    let tempCart = JSON.parse(window.localStorage.getItem('cart'));
    if (tempCart === undefined) {
      setCart([])
    } else {
      setCart(tempCart);
    }
  }, []);

  useEffect(() => {
    document.getElementById('btnCart').innerHTML = "Cart: " + cart.length
    window.localStorage.setItem('cart', JSON.stringify(cart));
    calculateTotal()
  }, [cart]);

  const [groupedItems, setGroupedItems] = useState([])
  useEffect(() => {
    setGroupedItems(groupItems())
  }, [cart]);

  const groupItems = () => {
    let groupedItemsTemp = []
    cart.forEach(
      item => {
        if (!groupedItemsTemp[item.id]) {
          groupedItemsTemp[item.id] = [];
        }
        groupedItemsTemp[item.id].push(item)
      }
    )
    //filters undefined values
    let newGroupedItems = groupedItemsTemp.filter(Boolean)
    return newGroupedItems
  }

  function filterItemFromCart(item) {
    let tempFilteredCart = [...cart]
    for (var i = tempFilteredCart.length - 1; i >= 0; --i) {
      if (tempFilteredCart[i].id === item.id) {
        tempFilteredCart.splice(i,1);
      }
    }
    setCart(tempFilteredCart)
  }

  function deleteItem(itemArray) {
    let groupedItemsTemp = [...groupedItems]
    let index = groupedItems.indexOf(itemArray);
    if (index > -1) {
      groupedItemsTemp.splice(index, 1);
    }
    setGroupedItems(groupedItemsTemp)
    filterItemFromCart(itemArray[0])
  }

  function decreaseItem(item) {
    let tempCart = [...cart]
    let index = tempCart.indexOf(item);
    if (index > -1) {
      tempCart.splice(index, 1);
    }
    setCart(tempCart)
  }

  function addItem(item) {
    let tempCart = [...cart]
    tempCart.push(item)
    setCart(tempCart)
  }

  const calculateTotal = () => {
    let beforeTax = 0;
    cart.forEach(function add(item) {
      beforeTax = beforeTax + item.price;
    })
    let tax = beforeTax * 0.0875
    let total = beforeTax + tax
    document.getElementById('beforeTax').innerHTML = "Total Before Tax: $" + beforeTax.toFixed(2)
    document.getElementById('tax').innerHTML = "Tax (8.75%): $" + tax.toFixed(2)
    document.getElementById('total').innerHTML = "Total: $" + total.toFixed(2)
  }

  return (
    <div id="checkoutPage">
      <div id="cartDiv">
        {groupedItems.map(array => (
          <div className={"itemDiv"}>
            <img className={'cart-item-image'} src={array[0].image} alt={array[0].title}/>
            <div className={"cart-item-info"}>
              <h1 className={"cart-item-title"}>{array[0].title}</h1>
              <div className={"cart-quantity-controller"}>
                <button className={"down-button"} onClick={decreaseItem.bind(this, array[0])}>-</button>
                <h5>{array.length}</h5>
                <button className={"up-button"} onClick={addItem.bind(this, array[0])}>+</button>
                <button className={"delete"} onClick={deleteItem.bind(this, array)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="checkout">
        <h1 id="checkoutHeader">Order Summary</h1>
        <h2 id="beforeTax">Total Before Tax: </h2>
        <h2 id="tax">Tax (8.75%): </h2>
        <h2 id="total">Total: </h2>
        <button>Submit Order</button>
      </div>
    </div>
  );
}

export default Cart;