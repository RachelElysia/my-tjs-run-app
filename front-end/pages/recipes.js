import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import {RecipeCard} from '../components/roundedtiles'
// import Fade from '../react-reveal/fade';

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
    // <Fade bottom>
    <div className={styles['container']}><center>
      <div className={styles['container-flex']}>
        {recipeCards}
      </div></center>
    </div>
    // </Fade>
  );
};

export default function Home() {

  const fetchRecipesFunction = url => fetch(url).then(r => r.json())

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  const recipes = useSWR('/api/recipes/random', fetchRecipesFunction)

  if (recipes.error) return <div>failed to load</div>
  if (!recipes.data) return <div>loading...</div>

  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <RecipeCardContainer recipeData24={recipes.data} />
      <Footer />
    </div>
  )
}
