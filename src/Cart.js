import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div>
      {groupedItems.map(array => (
        <div>
          <h1 className={"item-title"}>{array[0].title}</h1>
          <img className={'item-image'} src={array[0].image} alt={array[0].title}/>
            <div id="quantityController">
              <button id="downButton" onClick={decreaseItem.bind(this, array[0])}>-</button>
              <h5>{array.length}</h5>
              <button id="upButton" onClick={addItem.bind(this, array[0])}>+</button>
              <button id="delete" onClick={deleteItem.bind(this, array)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;