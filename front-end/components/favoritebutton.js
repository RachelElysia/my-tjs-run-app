"use strict";

import React, { useState, useEffect } from 'react';
import useSWR from 'swr'
import Link from 'next/link'
import Tada from 'react-reveal/Tada'

import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

// Separate all fetches because render hooks has an issue with rendering
// hooks a different amount of times in the same component

// THIS IS THE FAVORITE BUTTON
function FavoriteButton(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    // IF USER IS NOT IN LOCAL STORAGE, ASKED TO LOG IN INSTEAD
    if (user === null) {
        return (
            <p className={styles['text_small']}><span>
                <Link href="/login"><a>Log in to favorite this recipe!</a></Link>
            </span></p>
        );
    }
    return <FindInitialState userId={user.user_id} recipeId={props.recipeId}/>
}

function FindInitialState(props) {

    let favBool;

    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error } = useSWR(`/api/users/${props.userId}/recipes/${props.recipeId}`, fetcher)
    
    if (error) return <div>failed to load</div>
    if (data === undefined) return <div>loading...</div>

    favBool = data;

    return <SetStateAndToggle favBool={favBool} userId={props.userId} recipeId={props.recipeId}/>
}

function SetStateAndToggle(props) {
    const currentlyAFavorite = <FontAwesomeIcon icon={faHeart} />
    const notCurrentlyAFavorite = <FontAwesomeIcon icon={faHeartBroken}/>

    const [favorite, setFavorite] = useState(props.favBool);

    const toggleFavorite = (recipeId) => {

        setFavorite((favorite) => {
            if (favorite == true) {
                fetch(`/api/users/${props.userId}/recipes/${recipeId}/remove`, { method: 'POST' })
                .then(console.log("I clicked unfavorite. This was a favorited recipe, but now it isnt!"));
            }
            if (favorite == false) {
                fetch(`/api/users/${props.userId}/recipes/${recipeId}/add`, { method: 'POST' })
                .then(console.log("I clicked favorite. This was not a favorited recipe. Now it is!"));
            }
            return !favorite;
        });
    }

    return (
        <Tada spy={favorite}>
            <button
                className={styles['favorite-button']}
                onClick={() => toggleFavorite(props.recipeId)}
                key={props.recipeId}>
            { favorite === true ? currentlyAFavorite : notCurrentlyAFavorite} 
            </button>
        </Tada>
    );
}

export {FavoriteButton};
