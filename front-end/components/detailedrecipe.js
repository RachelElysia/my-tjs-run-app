"use strict";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Fade from "react-reveal/fade";
import useSWR from "swr";
import { FavoriteButton } from "./favoritebutton";
import Link from "next/link";

function RecipeCard(props) {
  let directions = props.directions;
  let directionsSplit = directions.split("\n");
  const directionsForRecipe = directionsSplit.map((direction, index) => (
    <li key={direction}>{direction}</li>
  ));

  let tagItems;

  (function selfCall() {
    const fetchTagsFunction = (url) => fetch(url).then((r) => r.json());

    const tagsData = useSWR(`/api/${props.recipe_id}/tags`, fetchTagsFunction);

    if (tagsData.error) return <div>failed to load</div>;
    if (!tagsData.data) return <div>loading...</div>;

    // NEEDED EXTRA {} AROUND IT TO SAY "yo, I'm a javascript template string!"
    tagItems = tagsData.data.map((tag) => (
      <Link href={`/tags/${tag.tag_id}`}>
        <a> {tag.name.toUpperCase()} </a>
      </Link>
    ));
  })();

  let ingredientItems;

  (function selfCall2() {
    const fetchIngredientsFunction = (url) => fetch(url).then((r) => r.json());

    const ingredientsData = useSWR(
      `/api/${props.recipe_id}/ingredients`,
      fetchIngredientsFunction
    );

    if (ingredientsData.error) return <div>failed to load</div>;
    if (!ingredientsData.data) return <div>loading...</div>;

    ingredientItems = ingredientsData.data.map((ingredients, index) => (
      <li key={index}>{ingredients.detailed_ingredient}</li>
    ));
  })();

  //background image
  const backgroundStyle = {
    backgroundImage: `url(${props.img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "550px",
  };

  return (
    <Fade right>
      <div className={styles["my-recipe-flex"]} style={backgroundStyle}>
        <div id={styles["column-left"]}>
          <FavoriteButton recipeId={props.recipe_id} />
          <h5 className={styles["card-recipe-title"]}>
            <span>{props.title}</span>
          </h5>

          {/* <p className={styles['text_small']}><span>Prep & Cook Time: {props.prepTime} {props.cookTime}</span></p> */}
          <p className={styles["text_small"]}>
            <span>Serves: {props.serves}</span>
          </p>
          <p className={styles["text_small"]}>
            <span>{tagItems}</span>
          </p>
          {/* <img src={props.img} className={styles['my-recipe-img']} alt={props.title}/> */}
        </div>

        <div id={styles["column-middle"]}>
          <p>
            <span>Ingredients:</span>
          </p>
          <div className={styles["scrollable"]}>
            <ul className="styles['text_small']">{ingredientItems}</ul>
          </div>
        </div>

        <div id={styles["column-right"]}>
          <p>
            <span>Directions:</span>
          </p>
          <div className={styles["scrollable"]}>
            <ol className={styles["text_small"]}>{directionsForRecipe}</ol>
          </div>
        </div>
      </div>
    </Fade>
  );
}

// Used on [tag_id].js and recipes.js
export { RecipeCard };
