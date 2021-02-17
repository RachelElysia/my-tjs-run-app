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
function RecipeCard(props) {
  // Split data on the word instead of on the letter
 
    //Figure out how to split directions to digestible chunks
  let directionsSplit = props.directions;
  // directionsSplit = directionsSplit.split(". ", ".");


  //need fetcher, need to pass a url to a promise and turn the response to json
  // save it as a variable and use SWR which takes in two parameters, the url and the function
  // to do behind the scenes work

  const fetcher = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(`/api/${props.recipe_id}/tagnames`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  let tags = data.join(", ")

  //Somehow make the tags clickable
  // function tagsComponent(tags) {
    
  // }

  // const fetcher2 = url => fetch(url).then(r => r.json())

  // const { data2, error } = useSWR(`/api/${props.recipe_id}/ingredients`, fetcher2)

  // if (error) return <div>failed to load</div>
  // if (!data2) return <div>loading...</div>

  // let ingredients = data.join("\n")

  
  return (
      <div className={styles['my-recipe-flex']}>
        <div className={styles['column']} id={styles['column-left']}>
          <p className={styles['recipe-title']}><text>{props.title}</text></p>
          <p className={styles['text_small']}>Tags:  {tags}<text></text></p>
          <img src={props.img} className={styles['my-recipe-img']} width="400em" />
        </div>
        <div className={styles['column']} id={styles['column-middle']}>
            <p>Ingredients: </p>
        </div>
        <div className={styles['column']} id={styles['column-right']}>
        <p>Directions:</p>
        <p>{directionsSplit}</p>
        </div>

      </div> 
  );
}
 

function MyRecipesContainer(props) {

  const recipeCards = [];

  for (const recipe of props.recipeData24) {
    recipeCards.push(
      <RecipeCard
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
    <div className={styles['container']}>
      {recipeCards}
    </div>
  );
};

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {
  return (
    <>
      <NavBar />
      <TJNavBar />
      <MyRecipesContainer recipeData24={props.recipeData24} />
      <Footer />
    </>
  )
}
