"use strict";
import styles from '../styles/Home.module.css';
// import React, { useState } from 'react';

// THIS IS THE FAVORITE BUTTON
function FavoriteButton() {

  return (
<div class="flex">
  <div>
    <input id="favorite" type="checkbox">
    <label for="favorite">
      <svg class="favorite-button" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="50" height="50">
          <rect width="50" height="50" rx="3" fill="white"/>
        </mask>
        <g mask="url(#mask0)">
          <circle cx="25" cy="25" r="35" fill="white"/>
          <circle class="fill" cx="25" cy="25" r="35" fill="#F86379"/>
        </g>
        <rect class="stroke" x="0.5" y="0.5" width="49" height="49" rx="2.5" stroke="#8CA6A6"/>
        <path class="heart" d="M25 36.7C25 36.7 38 26.8192 38 20.3172C38 13.8151 29.8851 9.88834 25 17.3803C20.1149 9.88834 12 13.8151 12 20.3172C12 26.8192 25 36.7 25 36.7Z" fill="white"/>
      </svg>
    </label>  
  </div>
  <div>
    <input id="favorite2" type="checkbox">
    <label for="favorite2">
      <svg class="favorite-button favorite-button--small" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
          <circle cx="18" cy="18" r="18" fill="white"/>
        </mask>
        <g mask="url(#mask2)">
          <circle cx="18" cy="18" r="20" fill="white"/>
          <circle class="fill" cx="18" cy="18" r="20" fill="#F86379"/>
        </g>
        <path class="heart" d="M18 26C18 26 27 19.2439 27 14.798C27 10.3522 21.382 7.66721 18 12.7899C14.618 7.66721 9 10.3522 9 14.798C9 19.2439 18 26 18 26Z" fill="white"/>
      </svg>
    </label>  
  </div>
</div>

  );
}


export {FavoriteButton};
