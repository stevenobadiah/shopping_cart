import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function ItemDetail({match}) {
    const [item, setItem] = useState({})
    useEffect(() => {
        fetchItem();
        //console.log(match);
    }, []);

    const [count, setCount] = useState(0)
    useEffect(() => {
        document.getElementById('tax').innerHTML = "Tax (8.75%): " + ((count * item.price) * .0875).toFixed(2)
        document.getElementById('totalCost').innerHTML = "Total: " + ((count * item.price) * 1.0875).toFixed(2)
    }, [count]);

    const fetchItem = async () => {
        const fetchItem = await fetch (
            `https://fakestoreapi.com/products/${match.params.id}`
        );
        const item = await fetchItem.json();
        setItem(item);
        setCount(1);
    }

    const downInterval = () => {
        if (count > 0) {
            setCount(count  -1)
        }
    }

    const upInterval = () => {
        setCount(count + 1)
    }

    return (
        <div id="itemContainer">
            <img src={item.image} alt={item.title} id="imgItemDetail"/>
            <div id="purchasePanel">
                <h1 id="itemTitle">{item.title}</h1>
                <p id="itemDescription">{item.description}</p>
                <h2 id="itemPrice">{item.price}</h2>
                <div id="quantityController">
                    <button id="downButton" onClick={downInterval}>-</button>
                    <h5>{count}</h5>
                    <button id="upButton" onClick={upInterval}>+</button>
                </div>
                <button id="btnAddItem">Add To Cart</button>
                <h4 id="tax">Tax (8.75%): </h4>
                <h3 id="totalCost">Cost: </h3>
            </div>
        </div>
    )
}

export default ItemDetail;