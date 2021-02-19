"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import Fade from 'react-reveal/fade'

import useSWR from 'swr'

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function RecipeCard(props) {
    // Split data on the word instead of on the letter
     //Figure out how to split directions to digestible chunks
  
    let directionsSplit = props.directions;

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



  return (<Fade right>
    <div className={styles['my-recipe-flex']}
    style={backgroundStyle}>

      <div id={styles['column-left']}>
        <p className={styles['recipe-title']}><span>{props.title}</span></p>
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
          <p className={styles['text_small']}>{directionsSplit}</p>
        </div>
      </div>

    </div> 
    </Fade>
);
}

// Used on [tag_id].js and recipes.js
export {RecipeCard};
