"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';

import useSWR from 'swr'

// Render ROUNDEDTILES
function RecipeCard(props) {
    // Split data on the word instead of on the letter
    let directions = props.directions;
    let recipeDirections = directions.split(" ");
    
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


    // Fetching and Rendering TAGS
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
  
    return (
        <div className={styles['recipe-flex']}>
            <a href={`/recipes/${props.recipe_id}`}>
                <img src={props.img} className={styles['recipe-img']} />
            </a>
                <div className={styles['info']}>
                <a href={`/recipes/${props.recipe_id}`}>
                {props.title}
                </a>
                <br />
              <span className={styles['text_small']}>
                {recipeDirections}...<br />
                {tagItems}
                </span>
          </div>
        </div> 
    );
  }

// Used on [tag_id].js and recipes.js
export {RecipeCard};