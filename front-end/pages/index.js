import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade';

// MUST USE ABSOLUTE PATH FOR THIS TO WORK
export async function getStaticProps(context) {
  const res = await fetch('http://localhost:5000/api/recipes_hungry')
  const recipeData48 = await res.json()

  if (!recipeData48) {
    return {
      notFound: true,
    }
  }

  return {
    props: {recipeData48,}, // will be passed to the page component as props
  }
}

function RecipeTile(props) {

  return (
    <div className={styles['tiles-flex']}>
      <a href="/recipes/{recipe.recipe_id}">
        <img src={props.img} className={styles['tile-img']} />
      </a>
  </div>
  );
}

//this is the container that will rendor
//notice the syntax is we input recipe info
function IndexContainerYay(props) {

  const recipeCards = [];

  for (const recipe of props.recipeData48) {
    recipeCards.push(
      <RecipeTile
      title={recipe.title}
      directions={recipe.directions}
      recipe_id={recipe.recipe_id}
      img={recipe.img}
      />
    );
  }

  return (
    <div className={styles['container']}>
      {recipeCards}
    </div>
  );
};

//THIS IS TELLING ME THAT Home IS THE INDEX / ROUTE
export default function Home(props) {
  return (
    <>
      <NavBar />
      <TJNavBar />
      <Fade><IndexContainerYay recipeData48={props.recipeData48} /></Fade>
      <Footer />
    </>
  )
}
