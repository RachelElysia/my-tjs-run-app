import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../../components/headersfooter'
import Fade from 'react-reveal/fade';
import {RecipeCard} from '../../components/detailedrecipe'

import useSWR from 'swr'

import { useRouter } from 'next/router'


function MyRecipesContainer(props) {

  let signedIn = true;

  if (signedIn === true) {

  return (
    <Fade>
    <div className={styles['flex-container']}>
      <RecipeCard
      recipe_id={props.mySingleRecipeData.recipe_id}
      title={props.mySingleRecipeData.title}
      directions={props.mySingleRecipeData.directions}
      ingredients={props.mySingleRecipeData.ingredients}
      img={props.mySingleRecipeData.img}
      tags={props.mySingleRecipeData.tags}
      cookTime={props.mySingleRecipeData.cookTime}
      prepTime={props.mySingleRecipeData.prepTime}
      serves={props.mySingleRecipeData.serves}/>
    </div>
    </Fade>
  );

  } else {
  
  return (
    <div>
      <h1>Log in or create an account!</h1>
    </div>
    );
  }
};

// See [tag_id].js for notes
export default function Home(props) {

  const router = useRouter()
  const {recipe_id} = router.query

  const fetchFunction = url => fetch(url).then(r => r.json())

  const recipeIdResult = useSWR(`/api/recipes/${recipe_id}`, fetchFunction)

  if (recipeIdResult.error) return <div>failed to load</div>
  if (!recipeIdResult.data) return <div>loading...</div>

  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <MyRecipesContainer mySingleRecipeData={recipeIdResult.data} />
      <Footer />
    </div>
  )
}
