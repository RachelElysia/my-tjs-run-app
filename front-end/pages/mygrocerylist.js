import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade';

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

// MUST USE ABSOLUTE PATH FOR THIS TO WORK
// fetch returns a promise to get the data
// data is an http Response object promise <> Response
// await is keyword to allow you to await a promise
// This is the static way to fetch data, Today is Day 9 on this project
// Need to evolve.
// export async function getStaticProps(context) {
//   const res = await fetch('http://localhost:5000/api/recipes')
//   const recipeData24 = await res.json()

//   if (!recipeData24) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {recipeData24} // will be passed to the page component as props
//   }
// }


//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
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
              <th>My Grocery List</th>
              <th>Details</th>
            </thead>
              {ingredientsTable}
          </table>
        </div>
    </>
  );

}
 

function MyGroceriesContainer(props) {

  const groceryCards = [];

  for (const recipe of props.recipeData24) {
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
    <div className={styles['container']}>
      <Fade right>
        <div className={styles['my-ingredient-flex']}>
        {groceryCards}
      </div>
      </Fade>
    </div>
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


// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {
  // best place to fetch data because it's called right away

  const fetcher3 = url => fetch(url).then(r => r.json())

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  const { data, error } = useSWR('/api/users/1/recipes', fetcher3)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // DON'T EVEN NEED THIS
  // // return object with key props and value recipe data so you can just use props. from now on
  // return {
  //   props: {recipeData24}
  // };
  // // I self called this so I won't have to call it right afterward. :)

  return (
    <>
      <NavBar />
      <TJNavBar />
      <MyGroceriesContainer recipeData24={data} />
      <Footer />
    </>
  )
}
