"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from "react";
import useSWR from 'swr'


function PersonalizedShoppingList(props) {

    let options = [];

    let usersRecipesSelected = [];

    for (const recipe of props.userRecipesData) {
        options.push(recipe.title);
    }

    const [selected, setSelected] = useState([]);

    // this toggles my button
    const toggleRecipeSelected = ({target}) => {
        const clickedRecipe = target.value;

        // this sets the state for my selected recipes (adds/ removes)
        setSelected((prev) => {
            if (prev.includes(clickedRecipe)) {
                return prev.filter(r => r !== clickedRecipe);
            }
            else {
                return [clickedRecipe, ...prev];
            }
        });
    }

    return (
        <>
            <div>
                {options.map(option => (
                    <button value={option} onClick={toggleRecipeSelected} key={option}>
                    {selected.includes(option) ? "Remove " : "Add "}
                    {option}
                    </button>
                ))}
                <p>WRITE THE CODE FOR PUTTING THIS INTO A LIST WHEN YOUR LESS FRUSTRATED Viewing your grocery list for: {selected.join(", ")}</p>



            </div>
            <div className={styles['container-flex']}>
                <div className={styles['my-ingredient-flex']}>
                    {/* {groceryCards} */}
                    <PersonalizedGroceryCards userRecipesSelected={props.userRecipesData.filter(recipe => selected.includes(recipe.title))} />
                </div>
            </div>
        </>
    );
};

// I WANT TO SHOW ONLY RECIPEDATA OF SELECTED Recipes

// I HAVE ALL RECIPES 

// I WANT TO USE A . FILTER TO ONLY SHOW THE RECIPES THAT MATCH SELECTED

// {selected} is a list that includes recipe titles

// LOOK AT ALL RECIPE data
// {props.userRecipesData}

// FILTER ONLY RECIPE.TITLES THAT ARE INCLUDED IN SELECTED

// props.userRecipesData.filter( recipe => selected.includes(recipe.title))

function PersonalizedGroceryCards(props) {
    const groceryCards = [];

    for (const recipe of props.userRecipesSelected) {
      groceryCards.push(
        <GroceryCard
        recipe_id={recipe.recipe_id}
        title={recipe.title}
        directions={recipe.directions}
        ingredients={recipe.ingredients}
        img={recipe.img}
        tags={recipe.tags}
        />
      );
    }

    return (
        <>
        {groceryCards}
        </>
    )

}

function GroceryCard(props) {

    let ingredientsTable;
  
    function ingredients() {
    const fetcher2 = url => fetch(url).then(r => r.json())
  
    const { data, error } = useSWR(`/api/${props.recipe_id}/ingredients`, fetcher2)
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    ingredientsTable = data.map((ingredients) =>
    <tbody>
    <td className={styles['table-wide']}>{ingredients.abridged_ingredient}</td>
    <td className={styles['text_small']}>{ingredients.detailed_ingredient}</td>
    </tbody> 
    );
    };
  
    ingredients();


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

    // My main div
    return (
        <>
            <div id={styles['column-left-ingredients']}>
            <p className={styles['recipe-title']}><a href={`/recipes/${props.recipe_id}`}>{props.title}</a></p>
            <p className={styles['text_small']}><span>{tagItems} </span></p>
            <img src={props.img} className={styles['my-recipe-img']} alt={props.title}/>
            </div>

            <div id={styles['column-ingredients']}>
            <table id={styles['ingredients-table']}>
                <thead>
                <tr>
                    <th>My Grocery List</th>
                    <th>Details</th>
                </tr>
                </thead>
                {ingredientsTable}
            </table>
            </div>
        </>
    );
}



export {PersonalizedShoppingList};