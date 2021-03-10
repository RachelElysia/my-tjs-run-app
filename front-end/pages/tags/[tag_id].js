import Head from 'next/head'
// React-y Things
import React, { useState } from 'react';
import { useRouter } from 'next/router'
// External Components
import {NavBar, TJNavBar, Footer} from '../../components/headersfooter'
import {RecipeCard} from '../../components/roundedtiles'
import Pagination from '../../components/pagination'
// Bootstrap 
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {ssr: false,});
const Row = dynamic(() => import("react-bootstrap/Row"), {ssr: false,});
const Col = dynamic(() => import("react-bootstrap/Col"), {ssr: false,});
// Client Side Data Fetching with Next.js
import useSWR from 'swr';
// Styling and Icons
import styles from '../../styles/Home.module.css'
import Fade from 'react-reveal/fade'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
const tagicon = <FontAwesomeIcon icon={faTag} />

// For RecipeCardContainer
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

// RecipeCardContainer Component
function RecipeCardContainer(props) {

  //State hooks for Pagination Put near top because tagNameResult renders different hooks
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const recipesPerPage = 12;

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
    <>
    <main>
    <Fade>
      <Container className="pt-5 mt-5 pb-2 translate-middle d-flex justify-content-center">
        <Row className="translate-middle">
          <Col className="col-12 translate-middle" align="center">
        <h1>{tagicon} { tagNameResult.data }</h1>
          </Col>
        <Col className="col-12 translate-middle" align="center">
      <p>Viewing recipes tagged with {tagNameResult.data}.</p>
        </Col>
        </Row>
      </Container>
    </Fade>
  </main>
    <section className={styles['rachel-tile']}>
    <Fade bottom>
      <div className={styles['flex-container-myrecipes']}>
      <Col className="col-12 translate-middle" align="right">
      <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={props.recipeData24.length}
          paginate={paginate}
      />
      </Col>
        <RecipeCards recipeData24={currentRecipes} />
      </div>
    </Fade>
    </section>
    </>
    
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
