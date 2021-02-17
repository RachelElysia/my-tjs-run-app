"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';

// THIS IS THE NAV BAR
function NavBar() {

  return (
    <nav>
      <div className={styles['nav-left']}>
        <a href="/"><img src="/static/logo.jpg" alt="My TJ's Run Logo" /></a>
        <a href="/myrecipes" className={styles['left']}>My Recipes</a>
        <a href="/mygrocerylist" className={styles['left']}>My Grocery List</a>

      </div><div className={styles['nav-right']}>

        Search
        <a href="/map" className={styles['right']}>Find a Store</a>
        <a href="/login" className={styles['right']}>Create Account</a>
        Log In 
        My Account
      </div>
  </nav>
  );
}

// THIS IS THE NAV BAR
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
  <table id={styles['tjbar-table']}>
  <td>
  <tr><a href="/login"><center><button>Get Started</button></center></a></tr>
  <tr><span className={styles["text_small"]}>Choose your recipes</span></tr>
  <tr><span className={styles["text_small"]}>Generate your grocery list</span></tr>
  <tr><span className={styles["text_small"]}>Receive your list as a text message!</span></tr>
</td>
  <td>
  <th>Party Favorites</th>
  <tr><a href="/tags/desserts">Desserts</a></tr>
  <tr><a href="/tags/appetizers">Appetizers</a></tr>
  <tr><a href="/tags/sides">Sides</a></tr>
  <tr><a href="/tags/salads">Salads</a></tr>
  <tr><a href="/tags/snacks">Snacks</a></tr>
</td>
    <td>
  <th>Featured</th>
  <tr><a href="/tags/stpatricksday">St. Patrick's Day</a></tr>
  <tr><a href="/tags/spring">Spring</a></tr>
  <tr><a href="/tags/breakfast">Breakfast</a></tr>
  <tr><a href="/tags/meatless">Meatless</a></tr>
  <tr><a href="/tags/cocktails">Cocktails</a></tr>
</td>
  </table>
</div>
      )}
</div>
  );
}




function Footer() {

  return (
    <footer>
      <ul>
        <li>Accessibility</li>
        <li>A Project by <a href="http://www.rachelelysia.com" target="_blank">Rachel Elysia Perkins</a></li>
        <li><a href="mailto:me@rachelelysia.com">Email Me</a></li>
        <li>Hackbright Academy Engineering 2021</li>
      </ul>
    </footer>
  );
} 

// self calling function... turn a function into an object and then call it with ()


export {NavBar, TJNavBar, Footer};
