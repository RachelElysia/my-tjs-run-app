import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../../components/headersfooter'
import {RecipeCard} from '../../components/roundedtiles'
import Fade from 'react-reveal/fade'

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

// https://nextjs.org/docs/routing/dynamic-routes
// needed to use dynamic front-end routes
import { useRouter } from 'next/router'


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

  // THIS ERRORS OUT IF YOU PUT MORE THAN ONE USE SWR IN THE SAME COMPONENT
  // WITH TWO OF THEM, IT SOMEHOW COMPLAINS THERES MORE THAN ONE HOOK SO 
  // THE PREVIOUS RENDER RENDERED MORE HOOKS, IT MIGHT EARLY EXIT AND NOT LOAD CORRECTLY
  
  // COME BACK THIS WEEKEND AND SIT DOWN WITH STEVEN TO MAKE IT SO THE USE SWR WON'T LOAD
  // UNTIL ALL USE SWR's LOAD. THIS CAN BE A WEEKEND PROJECT

  // need next.js built in dynamic router
  // https://nextjs.org/docs/routing/dynamic-routes
  const router = useRouter()
  const {tag_id} = router.query

  const fetchTagName = url => fetch(url).then(r => r.json())
  
  // result = useSWR object that has keys {data, error} built in
  const tagNameResult = useSWR(`/api/tags/${tag_id}/name`, fetchTagName)

  if (tagNameResult.error) return <div>failed to load</div>
  if (!tagNameResult.data) return <div>loading...</div>


  // refactor me your tag name rendering as a flex - yourself 1am 2/17
  return (
    <Fade bottom>
    <div className={styles['flex-container']}>
      <div className={styles['tag-heading']}>
        <h1>{tagNameResult.data}</h1>
      </div>
      {recipeCards}
    </div>
    </Fade>
    
  );
};


export default function Home(props) {

  // need next.js built in dynamic router
  const router = useRouter()
  const {tag_id} = router.query

  // NEW SCHOOL FETCHING!
  const fetchRecipesByTagFunction = url => fetch(url).then(r => r.json())

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  // const { data, error } = useSWR(`/api/tags/${tag_id}`, fetcherRecipeIdsByTag)
    // result = useSWR object that has keys {data, error} built in
  const tagRecipesResult = useSWR(`/api/tags/${tag_id}`, fetchRecipesByTagFunction)

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  if (tagRecipesResult.error) return <div>failed to load</div>
  if (!tagRecipesResult.data) return <div>loading...</div>


  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <RecipeCardContainer recipeData24={tagRecipesResult.data}/>
      <Footer />
    </div>
  )
}
