import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import {SignInUp} from './login'
import {PersonalizedShoppingList} from '../components/personalizemygrocerylist'
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/fade';

import useSWR from 'swr'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
const basketicon = <FontAwesomeIcon icon={faShoppingBasket} />


function MyGroceriesContainer(props) {

  // const groceryCards = [];

  // for (const recipe of props.userRecipesData) {
  //   groceryCards.push(
  //     <GroceryCard
  //     recipe_id={recipe.recipe_id}
  //     title={recipe.title}
  //     directions={recipe.directions}
  //     ingredients={recipe.ingredients}
  //     img={recipe.img}
  //     tags={recipe.tags}
  //     />
  //   );
  // }

  let signedIn = true;

  if (signedIn === true) {
  return (
    <Fade right>
    <div className={styles['flex-container']}>
    <div><center><h1>{basketicon} My Grocery List</h1>
      <p> Choose from your favorite recipes to generate your personalized grocery list!</p>
      <PersonalizedShoppingList userRecipesData={props.userRecipesData} /></center>
    </div>
    </div>
  </Fade>

  );

  } else {
  return (
    <div>
      <h1>Log in or create an account!</h1>
        <p>Just render log in page when you get a chance.</p>
    </div>
    );
  }
};

export default function Home(props) {
  // best place to fetch data because it's called right away

  const fetcher3 = url => fetch(url).then(r => r.json())


  const [user, setUser] = useState(null);

  useEffect(() => {
  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    setUser(JSON.parse(loggedInUser));
  }
  }, []);

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  const { data, error } = useSWR(`/api/users/${user ? user.user_id : 2}/recipes`, fetcher3)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (user === null) {
    return (
      <div id="page-container">
      <NavBar />
      <TJNavBar /><Fade bottom>
      <SignInUp />
      </Fade>
      <Footer />
    </div>
      );
    }
    
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <MyGroceriesContainer userRecipesData={data} />
      <Footer />
    </div>
  )
}
