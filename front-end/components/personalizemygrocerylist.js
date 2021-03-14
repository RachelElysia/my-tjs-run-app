"use strict";

// React-y Things
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Client Side Data Fetching with Next.js
import useSWR from "swr";
// Bootstrap
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {
  ssr: false,
});
const Row = dynamic(() => import("react-bootstrap/Row"), { ssr: false });
const Col = dynamic(() => import("react-bootstrap/Col"), { ssr: false });
// Styling & Icons
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faSms,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
const basketicon = <FontAwesomeIcon icon={faShoppingBasket} />;
const add = <FontAwesomeIcon icon={faPlusSquare} />;
const remove = <FontAwesomeIcon icon={faMinusSquare} />;
const smsicon = <FontAwesomeIcon icon={faSms} />;

function PersonalizedShoppingList(props) {
  const options = props.userRecipesData.map((recipe) => recipe.title);

  const [selected, setSelected] = useState([]);

  // this toggles my button
  const toggleRecipeSelected = ({ target }) => {
    const clickedRecipe = target.value;

    // this sets the state for my selected recipes (adds/ removes)
    setSelected((prev) => {
      if (prev.includes(clickedRecipe)) {
        return prev.filter((r) => r !== clickedRecipe);
      } else {
        return [clickedRecipe, ...prev];
      }
    });
  };

  // THIS IS ALL TO TEXT THE GROCERIES
  const router = useRouter();

  const [formData, setFormData] = useState({
    user: {},
    loggedIn: false,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleText = (event) => {
    event.preventDefault();

    const data = {
      user_phone: "+1" + `${user.phone}`,
      user_name: `${user.fname}`,
      user_recipes: `${selected}`,
    };

    const result = confirm(
      `${user.fname}, Do you want to text this grocery list to ${user.phone}?`
    );
    if (result) {
      fetch("/api/sms", {
        method: "POST",
        body: JSON.stringify({
          user_phone: "+1" + `${user.phone}`,
          user_fname: `${user.fname}`,
          user_recipes: `${selected}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.warn("Something went wrong.", error);
        });
    }
  };

  return (
    <>
      <main id={styles["navbar"]}>
        <center>
          <h3>{basketicon} My Grocery List</h3>
          <p className={styles["text_small"]}>
            {" "}
            Choose from your favorite recipes to generate your personalized
            grocery list!
          </p>
          {options.map((option) => (
            <button
              value={option}
              onClick={toggleRecipeSelected}
              key={option}
              className={styles["add-remove-grocery-button"]}
            >
              {selected.includes(option) ? remove : add} {option}
            </button>
          ))}

          <Row className="mt-5" >
            <Col className="col-12" align="center">
              {" "}
              <h3>
              { smsicon } {selected.length === 0
                  ? "No Recipes Added"
                  : selected.length === 1
                  ? "Recipe Added"
                  : "Recipes Added"}
              </h3>
            </Col>
          </Row>
          {selected.map((item, index) => (
            <Row className={styles['text_small']} align="center">
              <Col className="ml-2" align="left">
                
                {item}
              </Col>
            </Row>
          ))}
          <Row>
            <Col className="col-12">
              <form onSubmit={handleText}>
                <button type="submit">Text Me My Grocery List</button>
              </form>
            </Col>
          </Row>
        </center>
      </main>
      <div className={styles["flex-container-myrecipespage"]}>
        <div className={styles["my-ingredient-flex"]}>
          <PersonalizedGroceryCards
            userRecipesSelected={props.userRecipesData.filter((recipe) =>
              selected.includes(recipe.title)
            )}
          />
        </div>
      </div>
    </>
  );
}

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
        key={recipe.recipe_id}
      />
    );
  }

  return <>{groceryCards}</>;
}

function GroceryCard(props) {
  let ingredientsTable;

  function ingredients() {
    const fetcher2 = (url) => fetch(url).then((r) => r.json());

    const { data, error } = useSWR(
      `/api/${props.recipe_id}/ingredients`,
      fetcher2
    );

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    ingredientsTable = data.map((ingredients) => (
      <tr className="border-bottom">
        <td className={styles["table-wide"]}>
          {ingredients.abridged_ingredient}
        </td>
        <td className={styles["text_small"]}>
          {ingredients.detailed_ingredient}
        </td>
      </tr>
    ));
  }

  ingredients();

  // Fetching tag items and rendering with capitalized letters
  let tagItems;

  function tagFetch() {
    const fetcher = (url) => fetch(url).then((r) => r.json());

    const { data, error } = useSWR(`/api/${props.recipe_id}/tags`, fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    // NEEDED EXTRA {} AROUND IT TO SAY "yo, I'm a javascript template string!"
    tagItems = data.map((tag) => (
      <a href={`/tags/${tag.tag_id}`}> {tag.name.toUpperCase()} </a>
    ));
  }

  tagFetch();

  // My main div
  return (
    <>
      <div id={styles["column-left-ingredients"]}>
        <p className={styles["recipe-title"]}>
          <a href={`/recipes/${props.recipe_id}`}>{props.title}</a>
        </p>
        <p className={styles["text_small"]}>
          <span>{tagItems} </span>
        </p>
        <img
          src={props.img}
          className={styles["my-recipe-img"]}
          alt={props.title}
        />
      </div>

      <div id={styles["column-ingredients"]}>
        <table id={styles["ingredients-table"]}>
          <thead>
            <tr>
              <th>My Grocery List</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{ingredientsTable}</tbody>
        </table>
      </div>
    </>
  );
}

export { PersonalizedShoppingList };
