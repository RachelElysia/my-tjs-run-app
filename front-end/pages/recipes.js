import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import {RecipeCard} from '../components/roundedtiles'
import Fade from 'react-reveal/fade';

import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {ssr: false,});
const Row = dynamic(() => import("react-bootstrap/Row"), {ssr: false,});
const Col = dynamic(() => import("react-bootstrap/Col"), {ssr: false,});

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

function RecipeCardContainer(props) {

  const recipeCards = props.recipeData24.map(recipe => (
    <RecipeCard
    title={recipe.title}
    directions={recipe.directions}
    img={recipe.img}
    recipe_id={recipe.recipe_id}
    />
  ));

  return (
<>
<main>
<Fade>
  <Container className="pt-5 mt-5 pb-2 translate-middle d-flex justify-content-center">
    <Row className="translate-middle">
      <Col className="col-12 translate-middle" align="center">
    <h1>Trader Joe's Recipes</h1>
      </Col>
    <Col className="col-12 translate-middle" align="center">
  <p>Viewing recipes for Trader Joe's. </p>
    </Col>
    </Row>
  </Container>
</Fade>
</main>
<div className={styles['rachel-tile']}>
<Fade bottom>
  <div className={styles['flex-container-myrecipes']}>
  {recipeCards}
  </div>
</Fade>
</div>
</>
  );
};

export default function Home() {

  const fetchRecipesFunction = url => fetch(url).then(r => r.json())

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  const recipes = useSWR('/api/recipes/random', fetchRecipesFunction)

  let overrideElement = null;
  if (recipes.error) {
    overrideElement = <div>failed to load</div>;
  }
  else if (!recipes.data) {
    overrideElement = <div>loading...</div>
  }
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      {overrideElement ? overrideElement : <RecipeCardContainer recipeData24={recipes.data} />}
      <Footer />
    </div>
  )
}
