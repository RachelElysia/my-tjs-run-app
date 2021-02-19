import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../../components/headersfooter'
import Fade from 'react-reveal/fade';
import {RecipeCard} from '../../components/detailedrecipe'


// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

// https://nextjs.org/docs/routing/dynamic-routes
// needed to use dynamic front-end routes
import { useRouter } from 'next/router'


function MyRecipesContainer(props) {

  let signedIn = true;

  if (signedIn === true) {

  console.log(props)

  return (
    <Fade>
    <div className={styles['container']}>
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
        <p>Just render log in page when you get a chance.</p>
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

  console.log("PRINT PRINT PRINT HELLO" + recipe_id)

  if (recipeIdResult.error) return <div>failed to load</div>
  if (!recipeIdResult.data) return <div>loading...</div>

  return (
    <>
      <NavBar />
      <TJNavBar />
      <MyRecipesContainer mySingleRecipeData={recipeIdResult.data} />
      <Footer />
    </>
  )
}
