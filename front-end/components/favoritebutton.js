"use strict";
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/fade'
import useSWR from 'swr'
// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'


// Separate all fetches because render hooks has an issue with rendering
// hooks a different amount of times in the same component
function CheckUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    setUser(JSON.parse(loggedInUser));
    }
    }, []);

    // IF USER IS NOT IN LOCAL STORAGE, ASKED TO LOG IN INSTEAD
    if (user == null) {
        return (
            <p className={styles['text_small']}><span><a href="/login">Log in to favorite this recipe!</a></span></p>        );
    }
}

function FetchUserRecipeBool() {
    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error } = useSWR(`/api/users/${user.user_id}/recipes/${props.recipe_id}`, fetcher)
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    favBool = data;
}

// THIS IS THE FAVORITE BUTTON
function FavoriteButton(props) {
    const currentlyAFavorite = <FontAwesomeIcon icon={faHeart} />
    const notCurrentlyAFavorite = <FontAwesomeIcon icon={faHeartBroken}/>

    console.log(props)

    {CheckUser}

    let favBool;
    {FetchUserRecipeBool}

    const [favorite, setFavorite] = useState(favBool);
  
    // this toggles my button
    const toggleFavorite = (props) => {
        // const clickedRecipe = target.value; //don't need target as argument either??
  
        // this sets the state for my selected recipes (adds/ removes)
        setFavorite((favorite) => {
          if (favorite == true) {
            console.log("This was a favorited recipe, but now it isnt!")
            console.log(props)
            console.log("TESTING 1, 2, 1, 2")
          }
          if (favorite == false) {
            console.log("This was not a favorited recipe. Now it is!")
          }
          return !favorite;
        });
    }

        return (
            <button
                className={styles['favorite-button']}
                onClick={() => toggleFavorite(props.recipe_id)}
                key={props.recipe_id}>
            { favorite === true ? currentlyAFavorite : notCurrentlyAFavorite} 
            </button>
        );
}


export {FavoriteButton};
