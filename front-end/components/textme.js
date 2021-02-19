"use strict";
import styles from '../styles/Home.module.css';
import React, { useState } from "react";


const options = USERRECIPE QUERY FOR FAVORITES STORED WRITTEN AS A LIST OF NAMES

function PersonalizedShoppingList() {
    const [selected, setSelected] = useState([]);

    const toggleRecipeSelected = ({target}) => {
        const clickedRecipe = target.value;
        setSelected((prev) => {
            if prev.includes(clickedRecipe) {
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
            <button value={option} onClick={toggleRecipe} key={option}>
              {selected.includes(option) ? "Remove " : "Add "}
              {option}
            </button>
          ))}
          <p>Viewing your grocery list for: {selected.join(", ")}.</p>
        </div>
      );
    }
 