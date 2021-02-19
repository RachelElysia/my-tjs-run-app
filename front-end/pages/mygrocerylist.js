import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import {PersonalizedShoppingList} from '../components/textme'
import Fade from 'react-reveal/fade';

import useSWR from 'swr'






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


function MyGroceriesContainer(props) {

  const groceryCards = [];

  for (const recipe of props.userRecipesData) {
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

  let signedIn = true;

  if (signedIn === true) {
  return (
    <Fade right>
    <div className={styles['container']}>
    <h1> My Grocery List</h1>
      <p> Choose from your favorite recipes to generate your personalized grocery list!</p>
      <PersonalizedShoppingList userRecipeData={props.userRecipesData} />
      <div className={styles['container-flex']}>
      <div className={styles['my-ingredient-flex']}>
        {groceryCards}
      </div>
      </div>
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

  let user_id = 1;
  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  const { data, error } = useSWR(`/api/users/${user_id}/recipes`, fetcher3)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <NavBar />
      <TJNavBar />
      <MyGroceriesContainer userRecipesData={data} />
      <Footer />
    </>
  )
}
