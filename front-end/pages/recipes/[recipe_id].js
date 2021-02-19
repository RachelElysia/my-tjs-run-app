import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../../components/headersfooter'
import Fade from 'react-reveal/fade';


// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

// https://nextjs.org/docs/routing/dynamic-routes
// needed to use dynamic front-end routes
import { useRouter } from 'next/router'


//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function RecipeCard(props) {
  // Split data on the word instead of on the letter
 
    //Figure out how to split directions to digestible chunks
  let directionsSplit = props.directions;

  //need fetcher, need to pass a url to a promise and turn the response to json
  // save it as a variable and use SWR which takes in two parameters, the url and the function
  // to do behind the scenes work

  // Fetching tag items and rendering with capitalized letters
  let tagItems;

  function tagFetch() {
    const fetcher = url => fetch(url).then(r => r.json())
  
    const { data, error } = useSWR(`/api/${props.recipe_id}/tags`, fetcher)
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    // NEEDED EXTRA {} AROUND IT TO SAY "yo, I'm a javascript template string!"
    tagItems = data.map((tag) => <a href={`/tags/${tag.tag_id}`}>  {tag.name.toUpperCase()}  </a>);
  };
  
  tagFetch();

  // https://nextjs.org/docs/routing/introduction FIGURE OUT DYNAMIC LINKS!!!!! 

  // https://dev.to/ryanccn/data-fetching-with-next-js-38b6
  // https://nextjs.org/docs/basic-features/data-fetching
  // https://swr.vercel.app/

  let ingredientItems;

  function fetch2() {
  const fetcher2 = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(`/api/${recipe_id}/ingredients`, fetcher2)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  ingredientItems = data.map((ingredients) => (<li key={ingredients.recipe_id}>
      {ingredients.detailed_ingredient}
    </li>
  ));
  };

  fetch2()
  
  //background image
  // https://stackoverflow.com/questions/48288176/set-background-image-to-full-screen-in-reactjs/50769188
  // https://www.w3schools.com/cssref/css3_pr_background-size.asp
  const backgroundStyle = {
    backgroundImage: `url(${props.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '500px'
  
  };

  return (<Fade right>
      <div className={styles['my-recipe-flex']}
      style={backgroundStyle}>

        <div id={styles['column-left']}>
          <p className={styles['recipe-title']}><span>{props.title}</span></p>
          <p className={styles['text_small']}><span>Tags: {tagItems}</span></p>
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
      </Fade>
  );
}
 

function MyRecipesContainer(props) {

      <RecipeCard
      recipe_id={props.recipe_id}
      title={props.title}
      directions={props.directions}
      ingredients={props.ingredients}
      img={props.img}
      tags={props.tags} />

  let signedIn = true;

  if (signedIn === true) {
  return (
    <div className={styles['container']}>
      {recipeCards}
    </div>
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

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {

  // need next.js built in dynamic router
  const router = useRouter()
  const {recipe_id} = router.query

  const fetcher3 = url => fetch(url).then(r => r.json())

  const recipeResult = useSWR(`/api/recipes/${recipe_id}`, fetcher3)

  if (recipeResult.error) return <div>failed to load</div>
  if (!recipeResult.data) return <div>loading...</div>

  return (
    <>
      <NavBar />
      <TJNavBar />
      <MyRecipesContainer mySingleRecipeData={recipeResult.data} />
      <Footer />
    </>
  )
}
