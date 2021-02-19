"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from "react";
import useSWR from 'swr'


function PersonalizedShoppingList(props) {

    let options = [];


    for (const recipe of props.userRecipesData) {
        options.push(recipe.title);
    }


    const [selected, setSelected] = useState([]);

    const toggleRecipeSelected = ({target}) => {
        const clickedRecipe = target.value;
        setSelected((prev) => {
            if (prev.includes(clickedRecipe)) {
                return prev.filter(r => r !== clickedRecipe);
            }
            else {
                return [clickedRecipe, ...prev];
            }
        });
    };

    return (
        <div>
            {options.map(option => (
                <button value={option} onClick={toggleRecipeSelected} key={option}>
                {selected.includes(option) ? "Remove " : "Add "}
                {option}
                </button>
            ))}
            <p>Viewing your grocery list for: {selected.join(", ")}</p>
        </div>
    );
}


export {PersonalizedShoppingList};