"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import Link from 'next/link'

import useSWR from 'swr'

// Render ROUNDEDTILES
function RecipeCard(props) {
    // Split data on the word instead of on the letter
    let directions = props.directions;
    let recipeDirections = directions;

    if (directions.length > 135) {
      recipeDirections = directions.split(" ");
      let count = 0;
      let splitIndex = 0;
      for (let i=0; i< recipeDirections.length; i++) {
        count += recipeDirections[i].length;
          if (count>135) {
            splitIndex = i;
            recipeDirections = recipeDirections.slice(0, splitIndex).join(" ");
            break;
          };
      }
    }

    // Fetching and Rendering TAGS
    let tagItems;
  
    function tagFetch() {
      const fetcher = url => fetch(url).then(r => r.json())
    
      const { data, error } = useSWR(`/api/${props.recipe_id}/tags`, fetcher)
    
      if (error) return <div>failed to load</div>
      if (!data) return <div>loading...</div>
    
      // NEEDED EXTRA {} AROUND IT TO SAY "yo, I'm a javascript template string!"
      tagItems = data.map((tag) => <Link id={`${tag.tag_id}`} href={`/tags/${tag.tag_id}`}><a>{tag.name.toUpperCase()}</a></Link>);
    };
    
    tagFetch();
  
    return (
      <div id={styles['tile-recipe-flex']}>
        <Link href={`/recipes/${props.recipe_id}`}><a>
          <img src={props.img} id={styles['tile-recipe-img']} alt={props.title}/>
        </a></Link>
        <div id={styles['tile-recipe-info']}>
          <p id={styles['tile-recipe-title']}><Link href={`/recipes/${props.recipe_id}`}><a>{props.title}</a></Link></p>
          <p id={styles['tile-recipe-directions']}> {recipeDirections}... </p>
          <p id={styles['tile-recipe-tags']}> {tagItems} </p>
        </div>
      </div> 
    );
  }


// Used on [tag_id].js and recipes.js
export {RecipeCard};
