import Head from 'next/head';
// React-y Things
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
// External Components
import {NavBar, TJNavBar, Footer} from '../components/headersfooter';
import {RecipeCard} from '../components/roundedtiles';
// Bootstrap 
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {ssr: false,});
const Row = dynamic(() => import("react-bootstrap/Row"), {ssr: false,});
const Col = dynamic(() => import("react-bootstrap/Col"), {ssr: false,});
const Button = dynamic(() => import("react-bootstrap/Button"), {ssr: false,});
// Client Side Data Fetching with Next.js
import useSWR from 'swr';
// Styling and Icons
import styles from '../styles/Home.module.css';
import Fade from 'react-reveal/fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faBook, faSms } from '@fortawesome/free-solid-svg-icons';
const basketicon = <FontAwesomeIcon icon={faShoppingBasket} />
const bookicon = <FontAwesomeIcon icon={faBook} />
const smsicon = <FontAwesomeIcon icon={faSms} />


// For TileHomepage Component
function RecipeTile(props) {

  return (
    <Col className="p-0 m-0 col-6 col-md-4 col-lg-3 col-xl-2">
      <div className={styles['main-tiles-flex']}>
        <Link href={`/recipes/${props.recipe_id}`}><a>
        <img src={props.img} className={styles['main-tile-img']} alt={props.title}/>
        <div className={styles['overlay']}>
          <div className={styles['main-img-caption']}>
            {props.title}
          </div>
        </div>
        </a></Link>
      </div>
    </Col>
  );
}

// TileHomepage Component
function TileHomepage(props) {

  const recipeCards = props.recipeData48.map(recipe => (
    <RecipeTile
    title={recipe.title}
    directions={recipe.directions}
    img={recipe.img}
    recipe_id={recipe.recipe_id}
    />
  ));

  const [user, setUser] = useState(null);

  useEffect(() => {
  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    setUser(JSON.parse(loggedInUser));
  }
}, []);

  const [isShown, setIsShown] = useState(false);
  const router = useRouter()

  return (
    <>
    <main>
      <Fade>
        <Container className="pt-5 mt-5 pb-5 translate-middle">
          <Row>
          {recipeCards}
          </Row>
        </Container>
      </Fade>
    </main>
    </>
  );
};

// Instructions Component
function Instructions() {

  return (

    <section className={styles['rachel-tile']}>
      <Container className="mt-4 mb-4 pb-4 pt-4">
        <Fade bottom>
        <Row className="w-100">
          <Col className="col-12 col-md-4 p-3 bg-light" align="center">
            <h3>{bookicon} Choose Your Favorite Recipes</h3>
            <p>Browse through over 400 recipes. Favorite recipes
              for easy access under My Recipes.
            </p>
          </Col>
          <Col className="col-12 col-md-4 p-3 bg-white" align="center">
              <h3>{basketicon} Generate Your Grocery List</h3>
              <p>Choose from your favorite recipes to view a simple grocery list.
                See your grocery list and detailed ingredient information side-by-side.
              </p>
          </Col>
            <Col className="col-12 col-md-4 p-3 bg-light" align="center">
              <h3>{smsicon} Receive Your List as a Text Message</h3>
              <p>Text your grocery list straight to your phone for easy shopping.</p>
          </Col>
          </Row>
          <Row className="w-100 h-25 mb-3 mt-5" align="center">
            <Col className="col-12 pb-5" align="center">
              <Button id={styles['get-started-button']} type="button" onClick={(e) => { e.preventDefault(); router.push(`${user === null ? '/login' : 'recipes'}`); }}>
                Get Started
              </Button>
            </Col>
          </Row>
        </Fade>
        </Container>
    </section>
  )
}

// For PopularRecipes Component
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

// PopularRecipes Component
function PopularRecipes() {

  const fetchPopularRecipes = url => fetch(url).then(r => r.json())
  
  // result = useSWR object that has keys {data, error} built in
  const mostPopularResult = useSWR('/api/popular', fetchPopularRecipes)

  if (mostPopularResult.error) return <div>failed to load</div>
  if (!mostPopularResult.data) return <div>loading...</div>

  return (
    <section className={styles['wide-container']}>
          <h1>Most Popular Recipes</h1>
        <Fade bottom>
          <section className={styles['flex-container-myrecipes']}>
            <RecipeCards recipeData24={mostPopularResult.data} />
          </section>
        </Fade>
    </section>
    
  );
};


// Home WILL RENDER AT INDEX
export default function Home() {

  const fetch24Recipes = url => fetch(url).then(r => r.json());
  const { data, error } = useSWR(('/api/recipes_hungry'), fetch24Recipes);

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  let overrideElement = null;
  if (error) {
    overrideElement = <div>failed to load</div>;
  }
  else if (!data) {
    overrideElement = <div>loading...</div>
  }
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      {overrideElement ? overrideElement : <TileHomepage recipeData48={data} />}
      <Instructions />
      <PopularRecipes />
      <Footer />
    </div>
  )
};
