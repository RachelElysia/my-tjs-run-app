"use strict";
import styles from '../styles/Home.module.css';

// THIS IS THE NAV BAR
function NavBar() {

  return (
    <nav>
      <div className={styles['nav-left']}>
        <img src="/static/logo.jpg" alt="My TJ's Run Logo" />
        <a href="cool.com" className={styles['left']}>My Recipes</a>
        <a href="" className={styles['left']}>My Grocery List</a>

      </div><div className={styles['nav-right']}>

        Search
        <a href="" className={styles['right']}>Find a Store</a>
        <a href="" className={styles['right']}>Create Account</a>
        Log In 
        My Account
      </div>
  </nav>
  );
}

// THIS IS THE NAV BAR
function TJNavBar() {

  return (
<div id={styles['tjbar']}>
<a href="/recipes">Trader Joe's Recipes</a>
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
