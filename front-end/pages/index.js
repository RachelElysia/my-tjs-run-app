import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade';

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'


function RecipeTile(props) {

  return (
    <div className={styles['tiles-flex']}>
      <a href={`/recipes/${props.recipe_id}`}>
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
    <div className={styles['flex-container']}>
      {recipeCards}
    </div>
  );
};

//THIS IS TELLING ME THAT Home IS THE INDEX / ROUTE
export default function Home() {

  const fetch48Recipes = url => fetch(url).then(r => r.json());

  const { data, error } = useSWR(('/api/recipes_hungry'), fetch48Recipes);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <Fade><IndexContainerYay recipeData48={data} /></Fade>
      <Footer />
    </div>
  )
};
