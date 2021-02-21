"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import MyModal from './venmomodal.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faThList, faSearchLocation } from '@fortawesome/free-solid-svg-icons'


const basketicon = <FontAwesomeIcon icon={faShoppingBasket} />
const listicon = <FontAwesomeIcon icon={faThList} />
const searchlocationicon = <FontAwesomeIcon icon={faSearchLocation} />

function NavBar() {

  const user_id = 2;

  const handleLogIn = ((e) => { e.preventDefault(); window.location.href='/login'; } ); 

  const handleLogOut = (e) => {
    e.preventDefault(); window.location.href='/';
    setCurrentName({});
    setCurrentPhone("");
    localStorage.clear();
  };

  const logInOutButton = (user_id === null) ? 'Log In' : 'Log Out';
  const handleLogInOrOut = (user_id === null) ? handleLogIn : handleLogOut;

  const logInOrOut = (
    <button className={styles['right']} id={styles['get-started-button']} type="button" onClick={handleLogInOrOut}>
    {logInOutButton}
    </button>
  )




  return (
    <nav>
      <div className={styles['nav-left']}>
        <a href="/"><img src="http://localhost:5000/static/img/logo.png" alt="My TJ's Run Logo" height="60px" /></a>
        <button className={styles['left']} id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='/myrecipes'; }}>
          {listicon} My Recipes
        </button>
        <button className={styles['left']} id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='/mygrocerylist'; }}>
          {basketicon} My Grocery List
        </button>

      </div><div className={styles['nav-right']}>

      <input type="text" placeholder="Search.." className="search-bar"/>
        <button className={styles['right']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='/storelocator'; }}>
          <font size="3rem">{searchlocationicon}</font>
        </button>

        {logInOrOut}
      </div>
  </nav>
  );
}

function TJNavBar() {
  const [isShown, setIsShown] = useState(false);

  return (
<div onMouseEnter={() => setIsShown(true)}
onMouseLeave={() => setIsShown(false)}>
<div id={styles['tjbar']}>
<a href="/recipes">Trader Joe's Recipes</a>
</div>
{isShown && (



<div id={styles['tjbar-dropdown']}>
  <div id={styles['tjbar-table-div']}>
    <table id={styles['tjbar-table']}>
      <thead>
        <tr><td></td><td><center>
       <button id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='/login'; }}>
          Get Started
        </button>
   </center></td></tr>
      </thead>
      <tbody>
        <tr><td><img src="http://localhost:5000/static/img/check.png" width="18px" /></td><td>Choose your favorite recipes</td></tr>
        <tr><td><img src="http://localhost:5000/static/img/check.png" width="18px" /></td><td>Generate your grocery list</td></tr>
        <tr><td><img src="http://localhost:5000/static/img/check.png" width="18px" /></td><td>Receive your list as a text message!</td></tr>
      </tbody>
    </table>
  </div>
  <div>
  <table id={styles['tjbar-table2']}>
    <thead>
      <tr>
        <td>Party Favorites</td>
        <td>Featured</td>
      </tr>
    </thead>
    <tbody><tr>
      <td><a href="/tags/33">Baking</a></td>
      <td width="150px"><a href="/tags/102">St. Patrick's Day</a></td>
    </tr>
    <tr>
      <td><a href="/tags/16">Party</a></td>
      <td><a href="/tags/154">Easter</a></td>
    </tr>
    <tr>
      <td><a href="/tags/8">Salads</a></td>
      <td><a href="/tags/43">Spring</a></td>
    </tr>
    <tr>
      <td><a href="/tags/5">Snacks</a></td>
      <td><a href="/tags/147">Breakfast</a></td>
    </tr>
    <tr>
      <td><a href="/tags/104">Cocktails</a></td>
      <td><a href="/tags/10">Meatless</a></td>
    </tr>
    </tbody>
  </table>
  </div>
</div>
      )}
</div>
  );
}

function Footer() {

  // const Modal = ({ handleClose, show, children }) => {
  // const showHideClassName = show ? "modal display-block" : "modal display-none";
  
  let myIngredients = ['TJ\'s Avocado Oil', 'TJ\'s Garlic Spread',
    'TJ\'s Pumpkin Cranberry Crisps', 'TJ\'s Fig Butter', 'TJ\'s Bourbon Vanilla Extract',
    'Neopolitan Joe Joe\'s', 'TJ\'s Crumbled Feta', 'TJ\'s Lemon Elderflower Soda',
    'TJ\'s Panko Breadcrumbs', 'TJ\'s Freeze Dried Strawberries', 'TJ\'s Island Salsa',
    'TJ\'s Garlic Naan']
  let randomIngredient = myIngredients[Math.floor(Math.random() * myIngredients.length)]
  return (
    <footer>
      <ul>
        <li>A Project by <a href="http://www.rachelelysia.com" target="_blank">Rachel Elysia Perkins</a></li>
        <li><a href="/resources">Resources</a></li>
        <li>  
              {/* <Modal show={this.state.show} handleClose={this.hideModal}> */}
          Buy me {randomIngredient}
        {/* </Modal> */}
          </li>
        

      </ul>
    </footer>
  );
}



export {NavBar, TJNavBar, Footer};
