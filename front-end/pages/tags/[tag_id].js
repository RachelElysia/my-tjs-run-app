import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../../components/headersfooter'

// needed for client side data fetching, see next.js docs
import useSWR from 'swr'

// needed to use dynamic front-end routes
import { useRouter } from 'next/router'


// MUST USE ABSOLUTE PATH FOR THIS TO WORK
// export async function getStaticProps(context) {
//   const res = await fetch('http://localhost:5000/api/recipes')
//   const recipeData24 = await res.json()

//   if (!recipeData24) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {recipeData24,}, // will be passed to the page component as props
//   }
// }

  //self calling function to work around useSWR issues with using it twice

  // let data2;

  // (function ok(){

  //   const router = useRouter()
  //   const {tag_id} = router.query
  
  // const { data2, error2 } = useSWR(`/api/tags/${tag_id}/name`, fetchTagName)

  // if (error2) return <div>failed to load</div>
  // if (!data2) return <div>loading...</div>
  // })();

  // let tag_name = data2;

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
            <p className={styles['recipe-title']}>{recipeTitle}</p>
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

  // THIS ERRORS OUT IF YOU PUT MORE THAN ONE USE SWR IN THE SAME COMPONENT
  // WITH TWO OF THEM, IT SOMEHOW COMPLAINS THERES MORE THAN ONE HOOK SO 
  // THE PREVIOUS RENDER RENDERED MORE HOOKS, IT MIGHT EARLY EXIT AND NOT LOAD CORRECTLY
  
  // COME BACK THIS WEEKEND AND SIT DOWN WITH STEVEN TO MAKE IT SO THE USE SWR WON'T LOAD
  // UNTIL ALL USE SWR's LOAD. THIS CAN BE A WEEKEND PROJECT

  // need next.js built in dynamic router
  const router = useRouter()
  const {tag_id} = router.query

  const fetchTagName = url => fetch(url).then(r => r.json())
  
  // result = useSWR object that has keys {data, error} built in
  const tagNameResult = useSWR(`/api/tags/${tag_id}/name`, fetchTagName)

  if (tagNameResult.error) return <div>failed to load</div>
  if (!tagNameResult.data) return <div>loading...</div>


  // refactor me your tag name rendering as a flex - yourself 1am 2/17
  return (
    <div className={styles['flex-container']}>
      <h1>{tagNameResult.data}</h1>
      {recipeCards}
    </div>
    
  );
};

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {

  // need next.js built in dynamic router
  const router = useRouter()
  const {tag_id} = router.query

  // let data2;

  // (function ok(){

  //   const router = useRouter()
  //   const {tag_id} = router.query
  
  // const { data2, error2 } = useSWR(`/api/tags/${tag_id}/name`, fetchTagName)

  // if (error2) return <div>failed to load</div>
  // if (!data2) return <div>loading...</div>
  // })();

  // let tag_name = data2;



  // NEW SCHOOL FETCHING!
  const fetcherRecipesByTag = url => fetch(url).then(r => r.json())

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  // const { data, error } = useSWR(`/api/tags/${tag_id}`, fetcherRecipeIdsByTag)
    // result = useSWR object that has keys {data, error} built in
  const tagRecipesResult = useSWR(`/api/tags/${tag_id}`, fetcherRecipesByTag)

  if (tagRecipesResult.error) return <div>failed to load</div>
  if (!tagRecipesResult.data) return <div>loading...</div>

  

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)

  return (
    <>
      <NavBar />
      <TJNavBar />
      <RecipeCardContainer recipeData24={tagRecipesResult.data}/>
      <Footer />
    </>
  )
}
