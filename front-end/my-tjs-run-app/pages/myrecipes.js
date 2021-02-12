import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'

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
 

  return (
      <div className={styles['my-recipe-flex']}>
        <div className={styles['column']} id={styles['column-left']}>
          <p className={styles['recipe-title']}><text>{props.title}</text></p>
          <p className={styles['text_small']}>FIX ME: TAGS <text></text></p>
          <img src={props.img} className={styles['my-recipe-img']} width="400em" />
          </div>
          <div className={styles['column']}>
            <p>FIX ME: INGREDIENTS {props.ingredients}</p>
        </div>
        <div className={styles['column']} id={styles['column-right']}>
        <p>{props.directions}</p>
        </div>
      </div> 
  );
}
 

function RecipeCardContainer(props) {

  const recipeCards = [];

  for (const recipe of props.recipeData24) {
    recipeCards.push(
      <RecipeCard
      title={recipe.title}
      directions={recipe.directions}
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
      <RecipeCardContainer recipeData24={props.recipeData24} />
      <Footer />
    </>
  )
}
