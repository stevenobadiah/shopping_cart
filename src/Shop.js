import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './App.css';

function Shop() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetchItems();
  }, []);

  const [filteredItems, setFilteredItems] = useState([])

  const [filter, setFilter] = useState("all")
  useEffect(() => {
    if (filter !== "all") {
      //Below line's triple dot copies array rather than setting them equal to each other
      let tempFilteredItems = [...items]
      for (var i = tempFilteredItems.length - 1; i >= 0; --i) {
        if (tempFilteredItems[i].category !== filter) {
          tempFilteredItems.splice(i,1);
        }
      }
      setFilteredItems(tempFilteredItems)
    } else {
      setFilteredItems(items)
    }
  }, [filter]);

  const filterItems = () => {
    setFilter(document.getElementById('filters').value)
  }

  const fetchItems = async () => {
    const data = await fetch('https://fakestoreapi.com/products');
    const items = await data.json()

    //Set up item images
    items[0].image = "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    items[1].image = "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    items[2].image = "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
    items[3].image = "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
    items[4].image = "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
    items[5].image = "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
    items[6].image = "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
    items[7].image = "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
    items[8].image = "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
    items[9].image = "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
    items[10].image = "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"
    items[11].image = "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"
    items[12].image = "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
    items[13].image = "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
    items[14].image = "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
    items[15].image = "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
    items[16].image = "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
    items[17].image = "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"
    items[18].image = "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
    items[19].image = "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"

    console.log(items)
    setItems(items)
    setFilteredItems(items)
  };

  return (
    <div>
      <h1>Shop</h1>
      <div id="filterDropDown">
        <label for="filters">Category:</label>
        <select name="filters" id="filters" onChange={filterItems}>
            <option value="all">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
        </select>
      </div>
      <div id="itemsContainer">
        {filteredItems.map(item => (
          <Link to={`/shop/${item.id}`} key={item.id} className="item-div">
            <h1 className={"item-title"}>{item.title}</h1>
            <img className={'item-image'} src={item.image} alt={item.title}/>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Shop;