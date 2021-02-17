import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'

// MUST USE ABSOLUTE PATH FOR THIS TO WORK
export async function getStaticProps(context) {
  const res = await fetch('http://localhost:5000/recipes')
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
  let recipeDirections = props.directions;
  let directionsSplit = recipeDirections.split(" ");
  
  let count = 0;
  let splitIndex = 0;
  for (let i=0; i< directionsSplit.length; i++) {
    count += directionsSplit[i].length;
      if (count>100) {
        splitIndex = i;
        break;
      };
  }
  recipeDirections = directionsSplit.slice(0, splitIndex).join(" ");

  // Split title on the word if awkward 2 liner
  let recipeTitle = props.title;
  if (recipeTitle.length > 31 && recipeTitle.length < 43) {
    let titleSplit = recipeTitle.split(" ");
    let count = 0;
    let spliceIndex = 0;
    for (let i=0; i< titleSplit.length; i++) {
      count += titleSplit[i].length;
      if (count>20) {
        spliceIndex = i;
        break;
      }
    }
    titleSplit.splice(spliceIndex, 0, '{"\n"}');
    recipeTitle = titleSplit.join(" ");
  }


  return (
      <div className={styles['recipe-flex']}>
          <img src={props.img} className={styles['recipe-img']} />
          <div className={styles['info']}>
            <p className={styles['recipe-title']}><text>{recipeTitle}</text></p>
            <p className={styles['text_small']}>{recipeDirections}...</p>
        </div>
      </div> 
  );
}
 

function RecipeCardContainer(props) {

  const recipeCards = [];

  for (const recipe of props.recipeData24) {
    recipeCards.push(
      <RecipeCard
      title={recipe.title}
      directions={recipe.directions}
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

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {
  return (
    <>
      <NavBar />
      <TJNavBar />
      <RecipeCardContainer recipeData24={props.recipeData24} />
      <Footer />
    </>
  )
}
