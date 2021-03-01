"use strict";
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
// import MyModal from './venmomodal.js';
import Link from 'next/link'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faBook, faMapMarkedAlt, faSms, faSearch } from '@fortawesome/free-solid-svg-icons'
const basketicon = <FontAwesomeIcon icon={faShoppingBasket} />
const bookicon = <FontAwesomeIcon icon={faBook} />
const searchlocationicon = <FontAwesomeIcon icon={faMapMarkedAlt} />
const smsicon = <FontAwesomeIcon icon={faSms} />
const searchicon = <FontAwesomeIcon icon={faSearch} />

function NavBar() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    setUser(JSON.parse(loggedInUser));
  }
}, []);

  const handleLogIn = ((e) => { e.preventDefault(); router.push('/login'); } ); 

  const handleLogOut = (e) => {
    e.preventDefault(); router.push('/');
    setUser(null);
    localStorage.clear();
  };

  const welcome = (user === null) ? '' : `Welcome, ${user.fname}!`;
  const logInOutButton = (user === null) ? 'Log In' : 'Log Out';
  const handleLogInOrOut = (user === null) ? handleLogIn : handleLogOut;

  const logInOrOut = (
    <button className={styles['right']} id={styles['get-started-button']} type="button" onClick={handleLogInOrOut}>
    {logInOutButton}
    </button>
  )

  const router = useRouter()
  
  const handleSearch = (e) => {
    e.preventDefault();

    // hey form is the html event and target is the field that references the 
    // html element that triggered the event
    const form = e.target;
    const formData = new FormData(form);

    const searchString = formData.get('search_string');
    const encodedString = encodeURIComponent(searchString);
    router.push(`/search/${encodedString}`);
  }


  return (
    <nav>
      <div className={styles['nav-left']}>
        <Link href="/"><img src="http://localhost:5000/static/img/logo.png" alt="My TJ's Run Logo" height="60px" /></Link>
        <button className={styles['left']} id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); router.push('/myrecipes'); }}>
          {bookicon} My Recipes
        </button>
        <button className={styles['left']} id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); router.push('/mygrocerylist'); }}>
          { basketicon } { smsicon } My Grocery List
        </button>
      </div>
      <div className={styles['nav-right']}>
        <form onSubmit={handleSearch} className={styles['search-form']}>
          <input type="text"
            placeholder="Search"
            name="search_string"
            autocomplete="off"
            required />
          <button className={styles['search-button']} type="submit">
            {searchicon}
          </button>
        </form>
        <button className={styles['right']} type="button" onClick={(e) => { e.preventDefault(); router.push('/storelocator'); }}>
        { searchlocationicon }
        </button>
        { welcome }
        { logInOrOut }
      </div>
  </nav>
  );
}

function TJNavBar() {
  const [isShown, setIsShown] = useState(false);
  const router = useRouter()

  return (
<div onMouseEnter={() => setIsShown(true)}
onMouseLeave={() => setIsShown(false)}>
<div id={styles['tjbar']}>
<Link href="/recipes">Trader Joe's Recipes</Link>
</div>
{isShown && (


<div id={styles['tjbar-dropdown']}>
  <div id={styles['tjbar-table-div']}>
    <table id={styles['tjbar-table']}>
      <thead>
        <tr><td></td><td><center>
       <button id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); router.push('/login'); }}>
          Get Started
        </button>
   </center></td></tr>
      </thead>
      <tbody>
        <tr><td className={styles['checkicon']}>{ bookicon }</td><td>Choose your favorite recipes</td></tr>
        <tr><td className={styles['checkicon']}>{ basketicon }</td><td>Generate your grocery list</td></tr>
        <tr><td className={styles['checkicon']}>{ smsicon }</td><td>Receive your list as a text message!</td></tr>
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
      <td><Link href="/tags/33">Baking</Link></td>
      <td width="150px"><Link href="/tags/102">St. Patrick's Day</Link></td>
    </tr>
    <tr>
      <td><Link href="/tags/16">Party</Link></td>
      <td><Link href="/tags/154">Easter</Link></td>
    </tr>
    <tr>
      <td><Link href="/tags/8">Salads</Link></td>
      <td><Link href="/tags/43">Spring</Link></td>
    </tr>
    <tr>
      <td><Link href="/tags/5">Snacks</Link></td>
      <td><Link href="/tags/147">Breakfast</Link></td>
    </tr>
    <tr>
      <td><Link href="/tags/104">Cocktails</Link></td>
      <td><Link href="/tags/10">Meatless</Link></td>
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
        <li>A Project by <Link href="http://www.rachelelysia.com" target="_blank">Rachel Elysia Perkins</Link></li>
        <li><Link href="/resources">Resources</Link></li>
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
