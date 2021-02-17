import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

// MUST USE ABSOLUTE PATH FOR THIS TO WORK
export async function getStaticProps(context) {
  const res = await fetch('http://localhost:5000/api/recipes')
  const recipeData24 = await res.json()

  if (!recipeData24) {
    return {
      notFound: true,
    }
  }

  return {
    props: {recipeData24,}, // will be passed to the page component as props
  }
}



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
  <tr>
  <td className={styles['table-wide']}>{ingredients.abridged_ingredient}</td>
  <td className={styles['text_small']}>{ingredients.detailed_ingredient}</td>
  </tr> 
  );
  };

  ingredients();

  let tagItems;

  function tagFetch() {
    const fetcher = url => fetch(url).then(r => r.json())
  
    const { data, error } = useSWR(`/api/${props.recipe_id}/tagnames`, fetcher)
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    tagItems = data.map((tag) => <a href='/recipes'>  {tag.toUpperCase()}  </a>);
  };
  
  tagFetch();
  

  return (
      <div className={styles['my-ingredient-flex']}>

        <div id={styles['column-left-ingredients']}>

          <p className={styles['recipe-title']}><span>{props.title}</span></p>
          <p className={styles['text_small']}><span>Tags {tagItems} </span></p>
          <img src={props.img} className={styles['my-recipe-img']} alt={props.title}/>
        </div>

        <div id={styles['column-ingredients']}>
          <table id={styles['ingredients-table']}>
            <tr>
              <th>My Grocery List</th>
              <th>Details</th>
            </tr>
              {ingredientsTable}
          </table>
        </div>

      </div> 
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

  return (
    <div className={styles['flex-container']}>
      {groceryCards}
    </div>
  );
};

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {
  return (
    <>
      <NavBar />
      <TJNavBar />
      <MyGroceriesContainer recipeData24={props.recipeData24} />
      <Footer />
    </>
  )
}
