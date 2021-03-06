import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade';
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link'

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faBook, faMapMarkedAlt, faSms, faSearch } from '@fortawesome/free-solid-svg-icons'
const basketicon = <FontAwesomeIcon icon={faShoppingBasket} />
const bookicon = <FontAwesomeIcon icon={faBook} />
const smsicon = <FontAwesomeIcon icon={faSms} />

function RecipeTile(props) {

  return (
      <div className={styles['main-tiles-flex']}>
        <Link href={`/recipes/${props.recipe_id}`}><a>
        <img src={props.img} className={styles['main-tile-img']} alt={props.title}/>
        <div className={styles['overlay']}>
          <div className={styles['main-img-caption']}>
            {props.title}
          </div>
        </div>
        </a></Link>
      </div>
  );
}

//this is the container that will rendor
//notice the syntax is we input recipe info
function IndexContainerYay(props) {

  const recipeCards = props.recipeData48.map(recipe => (
    <RecipeTile
    title={recipe.title}
    directions={recipe.directions}
    img={recipe.img}
    recipe_id={recipe.recipe_id}
    />
  ));

  const [user, setUser] = useState(null);

  useEffect(() => {
  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    setUser(JSON.parse(loggedInUser));
  }
}, []);

  const [isShown, setIsShown] = useState(false);
  const router = useRouter()

  return (
    <>
      <Fade>
        <div className={styles['flex-container']}>
          {recipeCards}
        </div>
      </Fade>
      <Fade bottom>

        <div className={styles['instructions-container']}>

        <div className={[styles['instructions-row']]}>
          <div className={[styles['instructions']]}></div>
          <div className={[styles['instructions']]}>
            <h3>{bookicon} Choose Your Favorite Recipes</h3>
            <p>Browse through over 400 recipes. Favorite recipes
              for easy access under My Recipes.
            </p>
          </div>
        </div>

          <div className={[styles['instructions-row']]}>
            <div className={[styles['instructions']]}></div>
            <div>
              <h3>{basketicon} Generate Your Grocery List</h3>
              <p>Choose from your favorite recipes to view a simple grocery list.
                See your grocery list and detailed ingredient information side-by-side.
              </p>
            </div>
          </div>
          
          <div className={[styles['instructions-row']]}>
            <div className={[styles['instructions']]}></div>
            <div>
              <h3>{smsicon} Receive Your List as a Text Message</h3>
              <p>Text your grocery list straight to your phone for easy shopping.</p>
            </div>
          </div>
            <div className={styles['get-started-container']}>
              <button id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); router.push(`${user === null ? '/login' : 'recipes'}`); }}>
                Get Started
              </button>
              <h1>Cool Beans</h1>
            </div>
        </div>
      </Fade>

    </>
  );
};

//THIS IS TELLING ME THAT Home IS THE INDEX / ROUTE
export default function Home() {

  const fetch24Recipes = url => fetch(url).then(r => r.json());
  const { data, error } = useSWR(('/api/recipes_hungry'), fetch24Recipes);

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  let overrideElement = null;
  if (error) {
    overrideElement = <div>failed to load</div>;
  }
  else if (!data) {
    overrideElement = <div>loading...</div>
  }
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      {overrideElement ? overrideElement : <IndexContainerYay recipeData48={data} />}
      <Footer />
    </div>
  )
};
