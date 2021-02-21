"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import Fade from 'react-reveal/fade'

import useSWR from 'swr'

// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

const addFavorite = <FontAwesomeIcon icon={faHeart} />
const remove = <FontAwesomeIcon icon={faHeartBroken} />

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function RecipeCard(props) {
    // Split data on the word instead of on the letter
     //Figure out how to split directions to digestible chunks
  
    let directions = props.directions;


    let directionsSplit = directions.split("\n");

    const directionsForRecipe = directionsSplit.map((direction) => <li key={props.title}>{direction}</li>);

  //need fetcher, need to pass a url to a promise and turn the response to json
  // save it as a variable and use SWR which takes in two parameters, the url and the function
  // to do behind the scenes work
  // https://nextjs.org/docs/routing/introduction FIGURE OUT DYNAMIC LINKS!!!!! 

  // https://dev.to/ryanccn/data-fetching-with-next-js-38b6
  // https://nextjs.org/docs/basic-features/data-fetching
  // https://swr.vercel.app/
    // Fetching tag items and rendering with capitalized letters
    let tagItems;
  
    (function selfCall() {
    const fetchTagsFunction = url => fetch(url).then(r => r.json())
  
    const tagsData = useSWR(`/api/${props.recipe_id}/tags`, fetchTagsFunction)
  
    if (tagsData.error) return <div>failed to load</div>
    if (!tagsData.data) return <div>loading...</div>
  
    // NEEDED EXTRA {} AROUND IT TO SAY "yo, I'm a javascript template string!"
    tagItems = tagsData.data.map((tag) => <a href={`/tags/${tag.tag_id}`}>  {tag.name.toUpperCase()}  </a>);
    })();
  
    let ingredientItems;

    (function selfCall2() {
    const fetchIngredientsFunction = url => fetch(url).then(r => r.json())
  
    const ingredientsData = useSWR(`/api/${props.recipe_id}/ingredients`, fetchIngredientsFunction)
  
    if (ingredientsData.error) return <div>failed to load</div>
    if (!ingredientsData.data) return <div>loading...</div>
  
    ingredientItems = ingredientsData.data.map((ingredients) => (<li key={ingredients.recipe_id}>
        {ingredients.detailed_ingredient}
      </li>
    ));
    })();

      //background image
  // https://stackoverflow.com/questions/48288176/set-background-image-to-full-screen-in-reactjs/50769188
  // https://www.w3schools.com/cssref/css3_pr_background-size.asp
  const backgroundStyle = {
    backgroundImage: `url(${props.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '550px'
  
  };

// THINGS I NEED TO MAKE FAVORITE AND UNFAVORITE TOGGLE BUTTON:
// 1. Favorite and unfavorite Icons : faHeart and faHeartBroken (DONE)
        // Import icons to detailedrecipe.js (DONE)
// 2. A way to reach crud to add or delete from the database
//      - My add/delete crud functions on the backend (DONE)
//        - crud.create_user_recipe(user_id, recipe_id) (DONE)
//        - crud.delete_user_recipe(user_id, recipe_id) (DONE)
//    How to I call them on a button or from the front end?
//      - Do I need to route through server.py with dynamic routing?
// 3. A button that toggles on selected (WORKING ON)
// 4. The button shows the default icon based on boolean if a user/recipe relationship exists
//      - Crud function on the backend: crud.get_favorite_boolean(user_id, recipe_id) (DONE)
//      - useState defaults to boolean of query if the favorite already exists
//          - favorite, setFavorite
// 5. The button adds or deletes from the database on click
//      - The button setFavorite on the front end toggle
//      - The button adds or deletes from database, using dynamic routing?



  // this toggles my button
  const [favorite, setFavorite] = useState(true);
  //WRITE TO BE BOOLEAN OF QUERY INTO USER RECIPE DATABASE


  const toggleFavorite = ({target}) => {
      const clickedRecipe = target.value;

      // this sets the state for my selected recipes (adds/ removes)
      setFavorite((prev) => {
          return !prev;
      });
  }


  return (<Fade right>
    <div className={styles['my-recipe-flex']} style={backgroundStyle}>
      <div id={styles['column-left']}>
        <p className={styles['card-recipe-title']}><span>{props.title}</span></p>

        <button value={props.recipe_id} onClick={toggleFavorite} key={props.recipe_id}>
                    {favorite ? removeFavorite : addFavorite} 
                    {option}
                    </button>

        {/* <p className={styles['text_small']}><span>Prep & Cook Time: {props.prepTime} {props.cookTime}</span></p> */}
        <p className={styles['text_small']}><span>Serves: {props.serves}</span></p>
        <p className={styles['text_small']}><span>{tagItems}</span></p>
        {/* <img src={props.img} className={styles['my-recipe-img']} alt={props.title}/> */}
      </div>

      <div id={styles['column-middle']}>
        <p><span>Ingredients:</span></p>
        <div className={styles['scrollable']}>
          <ul className="styles['text_small']">{ingredientItems}</ul>
        </div>
      </div>

      <div id={styles['column-right']}>
        <p><span>Directions:</span></p>
        <div className={styles['scrollable']}>
          <ol className={styles['text_small']}>{directionsForRecipe}</ol>
        </div>
      </div>

    </div> 
    </Fade>
);
}

// Used on [tag_id].js and recipes.js
export {RecipeCard};
