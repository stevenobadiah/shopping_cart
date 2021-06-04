import React from 'react';
import './App.css';
import Home from './Home';
import Nav from './Nav';
import Shop from './Shop';
import About from './About';
import ItemDetail from './ItemDetail';
import Cart from './Cart';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <header>
          <Link to="/home">
            <h2 className={"nav-link"}>Obadiah's Obscene Discounts</h2>
          </Link>
          <Nav />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/shop" exact component={Shop} />
            <Route path="/shop/:id" component={ItemDetail} />
            <Route path="/cart" exact component={Cart} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
