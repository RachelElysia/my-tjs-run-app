import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import {RecipeCard} from '../components/roundedtiles'
import Fade from 'react-reveal/fade';

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

function RecipeCardContainer(props) {

  const recipeCards = [];

  for (const recipe of props.recipeData24) {
    recipeCards.push(
      <RecipeCard
      title={recipe.title}
      directions={recipe.directions}
      img={recipe.img}
      recipe_id={recipe.recipe_id}
      />
    );
  }

  return (
    <Fade bottom>
    <div className={styles['flex-container']}>
      {recipeCards}
    </div>
    </Fade>
  );
};

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {

  const fetcher3 = url => fetch(url).then(r => r.json())

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  const { data, error } = useSWR('/api/recipes', fetcher3)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <NavBar />
      <TJNavBar />
      <RecipeCardContainer recipeData24={data} />
      <Footer />
    </>
  )
}
