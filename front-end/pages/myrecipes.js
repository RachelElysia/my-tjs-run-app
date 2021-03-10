import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import {SignInUpContainer} from './login'
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/fade';
import {FavoriteButton} from '../components/favoritebutton'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

const listicon = <FontAwesomeIcon icon={faBook} />

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'


//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function RecipeCard(props) {

  // Split data on the word instead of on the letter
 
    //Figure out how to split directions to digestible chunks
    let directions = props.directions;


    let directionsSplit = directions.split("\n");

    const directionsForRecipe = directionsSplit.map((direction, index) => <li key={direction}>{direction}</li>);

  // directionsSplit = directionsSplit.split(". ", ".");


  // Fetching tag items and rendering with capitalized letters
  let tagItems;

  function tagFetch() {
    const fetcher = url => fetch(url).then(r => r.json())
  
    const { data, error } = useSWR(`/api/${props.recipe_id}/tags`, fetcher)
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    // NEEDED EXTRA {} AROUND IT TO SAY "yo, I'm a javascript template string!"
    tagItems = data.map((tag) => <a href={`/tags/${tag.tag_id}`}>  {tag.name.toUpperCase()}  </a>);
  };
  tagFetch();


  let ingredientItems;

  function ingredientsFetch() {
  const fetcher2 = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(`/api/${props.recipe_id}/ingredients`, fetcher2)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  ingredientItems = data.map((ingredients, index) => (<li key={index}>
      {ingredients.detailed_ingredient}
    </li>
  ));
  };
  ingredientsFetch();
  
  const backgroundStyle = {
    backgroundImage: `url(${props.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '550px'
  
  };

  return (<Fade right>
    <section className={styles['flex-container-myrecipespage']} id={`${props.recipe_id}`}>
      <div className={styles['my-recipe-flex']}
      style={backgroundStyle}>

        <div id={styles['column-left']}>
          <FavoriteButton recipeId={props.recipe_id}/>
          <p className={styles['card-recipe-title']}><a href={`/recipes/${props.recipe_id}`}>{props.title}</a><br />
          </p>
          <p className={styles['text_small']}><span>Tags: {tagItems}</span></p>
        </div>

        <div id={styles['column-middle']}>
          <p><span>Ingredients:</span></p>
          <div className={styles['scrollable']}>
            <ul className={styles['text_small']}>{ingredientItems}</ul>
          </div>
        </div>

        <div id={styles['column-right']}>
          <p><span>Directions:</span></p>
          <div className={styles['scrollable']}>
            <ol className={styles['text_small']}>{directionsForRecipe}</ol>
          </div>
        </div>

      </div>
    </section> 
    </Fade>
  );
}
 

function MyRecipesContainer(props) {

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  // const loggedInUser = localStorage.getItem('user');
  // if (loggedInUser) {
  //   setUser(loggedInUser);
  // }
  // }, []);


  const recipeCards = [];

  const leftLinks = [];

  for (const recipe of props.recipeData24) {
    recipeCards.push(
      <RecipeCard
      recipe_id={recipe.recipe_id}
      title={recipe.title}
      directions={recipe.directions}
      ingredients={recipe.ingredients}
      img={recipe.img}
      tags={recipe.tags}
      />
    );
    leftLinks.push(
      <Link href={`#${recipe.recipe_id}`} class="nav-link"><a>{recipe.title}</a></Link>
    )
  }



  return (
    <>
      <main id={styles['navbar']}><center>
      <h3>{listicon} My Recipes</h3>
      <p className={styles['text_small']}> Viewing your favorite recipes!</p>
      {leftLinks}
      </center>
    </main>
    <div className={styles['my-container']}>

      {recipeCards}
    </div>
    </>

  );

  
};

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {

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
  // console.log(user.response)
  // console.log(user.response.user_id)

  const { data, error } = useSWR(`/api/users/${user ? user.user_id : 2}/recipes`, fetcher3)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  let overrideElement = null;
  if (error) {
    overrideElement = <div>failed to load</div>;
  }
  else if (!data) {
    overrideElement = <div>loading...</div>
  }
  
  if (user === null) {
    return (
      <div id="page-container">
      <NavBar />
      <TJNavBar /><Fade bottom>
      <SignInUpContainer />
      </Fade>
      <Footer />
    </div>
      );
    }

  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      {overrideElement ? overrideElement : <MyRecipesContainer recipeData24={data} />}
      <Footer />
    </div>
  )
}
