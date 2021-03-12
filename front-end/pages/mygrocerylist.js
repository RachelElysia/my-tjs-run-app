
// External Components
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import {SignInUpContainer} from './login'
import {PersonalizedShoppingList} from '../components/personalizemygrocerylist'
// React-y Things
import React, { useState, useEffect } from 'react';
// Client Side Data Fetching Next.js
import useSWR from 'swr'
// Styling and Icons
import styles from '../styles/Home.module.css'
import Fade from 'react-reveal/fade';

// MyGroceryContainerComponent
function MyGroceriesContainer(props) {

  return (
      <main className={styles['my-container']}>
        <div>
          <center>
            <PersonalizedShoppingList userRecipesData={props.userRecipesData} />
          </center>
        </div>
      </main>
  );

};

// Default Component
export default function Home() {
  // best place to fetch data because it's called right away

  const fetcher3 = url => fetch(url).then(r => r.json())

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  const { data, error } = useSWR(`/api/users/${user ? user.user_id : 2}/recipes`, fetcher3)

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>
  
  let overrideElement = null;
  if (error) {
    overrideElement = <div>failed to load</div>;
  }
  else if (!data) {
    overrideElement = <div>loading...</div>
  }


  if (user === null) {
    return (
      <div id="page-container">
        <NavBar />
        <TJNavBar /><Fade bottom>
        <SignInUpContainer />
        </Fade>
        <Footer />
      </div>
    );
  }
    
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      {overrideElement ? overrideElement : <MyGroceriesContainer userRecipesData={data} />}
      <Footer />
    </div>
  )
}
