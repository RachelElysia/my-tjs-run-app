"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';

function NavBar() {

  const user_id = 1;

  const logInOutButton = (user_id === null) ? 'Log In' : 'Log Out';
  const logInOutUrl = (user_id === null) ? '/login' : '/logout';

  const logInOrOut = (
    <button className={styles['right']} id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='{`${logInOutUrl}`}'; }}>
    {logInOutButton}
  </button>
  )

  return (
    <nav>
      <div className={styles['nav-left']}>
        <a href="/"><img src="http://localhost:5000/static/img/logo.png" alt="My TJ's Run Logo" height="60px" /></a>
        <button className={styles['left']} id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='/myrecipes'; }}>
          My Recipes
        </button>
        <button className={styles['left']} id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='/mygrocerylist'; }}>
          My Grocery List
        </button>

      </div><div className={styles['nav-right']}>

      <input type="text" placeholder="Search.." className="search-bar"/>
        <button className={styles['right']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='/map'; }}>
          Find A Store
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
        <tr><center>
       <button id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); window.location.href='/login'; }}>
          Get Started
        </button>
   </center><br /></tr>
      </thead>
      <tbody>
        <tr><img src="http://localhost:5000/static/img/check.png" width="18px" /> Choose your recipes</tr>
        <tr><img src="http://localhost:5000/static/img/check.png" width="18px" /> Generate your grocery list</tr>
        <tr><img src="http://localhost:5000/static/img/check.png" width="18px" /> Receive your list as a text message!</tr>
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


export {NavBar, TJNavBar, Footer};
