import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import {PersonalizedShoppingList} from '../components/personalizemygrocerylist'
import Fade from 'react-reveal/fade';

import useSWR from 'swr'



function MyGroceriesContainer(props) {

  // const groceryCards = [];

  // for (const recipe of props.userRecipesData) {
  //   groceryCards.push(
  //     <GroceryCard
  //     recipe_id={recipe.recipe_id}
  //     title={recipe.title}
  //     directions={recipe.directions}
  //     ingredients={recipe.ingredients}
  //     img={recipe.img}
  //     tags={recipe.tags}
  //     />
  //   );
  // }

  let signedIn = true;

  if (signedIn === true) {
  return (
    <Fade right>
    <div className={styles['container']}>
    <h1> My Grocery List</h1>
      <p> Choose from your favorite recipes to generate your personalized grocery list!</p>
      <PersonalizedShoppingList userRecipesData={props.userRecipesData} />
    </div>
  </Fade>

  );

  } else {
  return (
    <div>
      <h1>Log in or create an account!</h1>
        <p>Just render log in page when you get a chance.</p>
    </div>
    );
  }
};

export default function Home(props) {
  // best place to fetch data because it's called right away

  const fetcher3 = url => fetch(url).then(r => r.json())

  let user_id = 2;
  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  const { data, error } = useSWR(`/api/users/${user_id}/recipes`, fetcher3)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <MyGroceriesContainer userRecipesData={data} />
      <Footer />
    </div>
  )
}
