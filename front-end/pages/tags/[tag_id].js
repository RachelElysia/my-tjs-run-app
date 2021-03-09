import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React, { useState } from 'react';
import {NavBar, TJNavBar, Footer} from '../../components/headersfooter'
import {RecipeCard} from '../../components/roundedtiles'
import Pagination from '../../components/pagination'
import Fade from 'react-reveal/fade'

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

// https://nextjs.org/docs/routing/dynamic-routes
// needed to use dynamic front-end routes
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
const tagicon = <FontAwesomeIcon icon={faTag} />


function RecipeCards(props) {
  return props.recipeData24.map(recipe => (
    <RecipeCard
    title={recipe.title}
    directions={recipe.directions}
    img={recipe.img}
    recipe_id={recipe.recipe_id}
    />
  ));
}

function RecipeCardContainer(props) {

  //State hooks for Pagination Put near top because tagNameResult renders different hooks
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const recipesPerPage = 12;

  // need next.js built in dynamic router
  // https://nextjs.org/docs/routing/dynamic-routes
  const router = useRouter()
  const {tag_id} = router.query

  const fetchTagName = url => fetch(url).then(r => r.json())
  
  // result = useSWR object that has keys {data, error} built in
  const tagNameResult = useSWR(`/api/tags/${tag_id}/name`, fetchTagName)

  if (tagNameResult.error) return <div>failed to load</div>
  if (!tagNameResult.data) return <div>loading...</div>


  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = props.recipeData24.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (number) => setCurrentPage(number);

  // refactor me your tag name rendering as a flex - yourself 1am 2/17
  return (
    <div className={styles['wide-container']}>
      <main className={styles['tag-heading']}>
          <h1>{tagicon} { tagNameResult.data }</h1>
          <p>Viewing recipes tagged with {tagNameResult.data}. </p>
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={props.recipeData24.length}
          paginate={paginate}
        />
      </main>
        <Fade bottom>
          <section className={styles['flex-container-myrecipes']}>
            <RecipeCards recipeData24={currentRecipes} />
          </section>
        </Fade>
    </div>
    
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

  // if (tagRecipesResult.error) return <div>failed to load</div>
  // if (!tagRecipesResult.data) return <div>loading...</div>

  let overrideElement = null;
  if (tagRecipesResult.error) {
    overrideElement = <div>failed to load</div>;
  }
  else if (!tagRecipesResult.data) {
    overrideElement = <div>loading...</div>
  }

  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      {overrideElement ? overrideElement : <RecipeCardContainer recipeData24={tagRecipesResult.data}/>}
      <Footer />
    </div>
  )
}
