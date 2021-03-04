"use strict";
import Head from 'next/head'
import Modal from './venmomodal'
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link'

import styles from '../styles/Home.module.css';
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
    <>
      <div>
      <Head>
        <title>My TJ Run</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      </div>
      <nav>
        <div className={styles['nav-left']}>
          <Link href="/"><a><img src="http://localhost:5000/static/img/logo.png" alt="My TJ's Run Logo" height="40px" /></a></Link>
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
              autoComplete="off"
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
  </>
  );
}

function TJNavBar() {
  const [isShown, setIsShown] = useState(false);
  const router = useRouter()

  return (
<div onMouseEnter={() => setIsShown(true)}
onMouseLeave={() => setIsShown(false)}>
<div id={styles['tjbar']}>
<Link href="/recipes"><a>Trader Joe's Recipes</a></Link>
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
      <td><Link href="/tags/33"><a>Baking</a></Link></td>
      <td width="150px"><Link href="/tags/102"><a>St. Patrick's Day</a></Link></td>
    </tr>
    <tr>
      <td><Link href="/tags/16"><a>Party</a></Link></td>
      <td><Link href="/tags/154"><a>Easter</a></Link></td>
    </tr>
    <tr>
      <td><Link href="/tags/8"><a>Salads</a></Link></td>
      <td><Link href="/tags/43"><a>Spring</a></Link></td>
    </tr>
    <tr>
      <td><Link href="/tags/5"><a>Snacks</a></Link></td>
      <td><Link href="/tags/147"><a>Breakfast</a></Link></td>
    </tr>
    <tr>
      <td><Link href="/tags/104"><a>Cocktails</a></Link></td>
      <td><Link href="/tags/10"><a>Meatless</a></Link></td>
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

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  const router = useRouter()

  let myIngredients = ['TJ\'s Avocado Oil', 'TJ\'s Garlic Spread',
    'TJ\'s Pumpkin Cranberry Crisps', 'TJ\'s Fig Butter', 'TJ\'s Bourbon Vanilla Extract',
    'Neopolitan Joe Joe\'s', 'TJ\'s Crumbled Feta', 'TJ\'s Lemon Elderflower Soda',
    'TJ\'s Panko Breadcrumbs', 'TJ\'s Freeze Dried Strawberries', 'TJ\'s Island Salsa',
    'TJ\'s Garlic Naan']
  let randomIngredient = myIngredients[Math.floor(Math.random() * myIngredients.length)]
  
  
  return (
    <>
    <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
    <footer>
      <ul>
        <li>A Project by <button onClick={(e) => { e.preventDefault(); router.push('http://www.rachelelysia.com');}}>Rachel Elysia Perkins</button></li>
        <li><button onClick={(e) => { e.preventDefault(); router.push('/login'); }}>Resources</button></li>
        <li><button onClick={openModal}>Buy me {randomIngredient}</button></li>
      </ul>
    </footer>
    </>
  );
}



export {NavBar, TJNavBar, Footer};
