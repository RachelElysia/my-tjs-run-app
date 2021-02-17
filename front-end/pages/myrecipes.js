import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

// MUST USE ABSOLUTE PATH FOR THIS TO WORK
export async function getStaticProps(context) {
  const res = await fetch('http://localhost:5000/api/recipes')
  const recipeData24 = await res.json()

  if (!recipeData24) {
    return {
      notFound: true,
    }
  }

  return {
    props: {recipeData24,}, // will be passed to the page component as props
  }
}



//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function RecipeCard(props) {
  // Split data on the word instead of on the letter
 
    //Figure out how to split directions to digestible chunks
  let directionsSplit = props.directions;

  // directionsSplit = directionsSplit.split(". ", ".");


  //need fetcher, need to pass a url to a promise and turn the response to json
  // save it as a variable and use SWR which takes in two parameters, the url and the function
  // to do behind the scenes work

  // const fetcher = url => fetch(url).then(r => r.json())

  // const { data, error } = useSWR(`/api/${props.recipe_id}/tagnames`, fetcher)

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  // const tags = data => {
  //   linkedTags = [];
  //   for (let i=0; i<data.length; i++) {
  //     let cool = '<a href="{data[i]}">{data[i]}</a>';
  //       linkedTags.push(cool);
  //   } 
  //   return linkedTags.join(", ");
  // }
  
  //Somehow make the tags clickable

  // function tagsComponent(tags) {
    
  // }

  // https://nextjs.org/docs/routing/introduction FIGURE OUT DYNAMIC LINKS!!!!! 

  // https://dev.to/ryanccn/data-fetching-with-next-js-38b6
  // https://nextjs.org/docs/basic-features/data-fetching
  // https://swr.vercel.app/
  const fetcher2 = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(`/api/${props.recipe_id}/ingredients`, fetcher2)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const ingredientItems = data.map((ingredients) =>
  <li key={ingredients.recipe_id}>
    {ingredients.detailed_ingredient}
  </li>
);
  
  //background image
  // https://stackoverflow.com/questions/48288176/set-background-image-to-full-screen-in-reactjs/50769188
  // https://www.w3schools.com/cssref/css3_pr_background-size.asp
  const backgroundStyle = {
    backgroundImage: `url(${props.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '500px'
  };

  return (
      <div className={styles['my-recipe-flex']}
      style={backgroundStyle}>

        <div id={styles['column-left']}>
          <p className={styles['recipe-title']}><span>{props.title}</span></p>
          <p className={styles['text_small']}><span>Tags: </span></p>
          {/* <img src={props.img} className={styles['my-recipe-img']} alt={props.title}/> */}
        </div>

        <div id={styles['column-middle']}>
          <p><span>Ingredients:</span></p>
          <div className={styles['scrollable']}>
            <ul className="styles['text_small']">{ingredientItems}</ul>
          </div>
        </div>

        <div id={styles['column-right']}>
          <p><span>Directions:</span></p>
          <div className={styles['scrollable']}>
            <p className={styles['text_small']}>{directionsSplit}</p>
          </div>
        </div>

      </div> 
  );
}
 

function MyRecipesContainer(props) {

  const recipeCards = [];

  for (const recipe of props.recipeData24) {
    recipeCards.push(
      <RecipeCard
      recipe_id={recipe.recipe_id}
      title={recipe.title}
      directions={recipe.directions}
      ingredients={recipe.ingredients}
      img={recipe.img}
      tags={recipe.tags}
      />
    );
  }

  return (
    <div className={styles['container']}>
      {recipeCards}
    </div>
  );
};

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {
  return (
    <>
      <NavBar />
      <TJNavBar />
      <MyRecipesContainer recipeData24={props.recipeData24} />
      <Footer />
    </>
  )
}
