import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, Footer} from '../components/headersfooter'

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
// function RecipeCard(props) {


//   return (

//   );
// }
 
// function RecipeCardContainer(props) {



//   return (

//   );
// };

// LEARN HOW TO DO AN IFRAME AND PUT IT IN HERE!

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {
  return (
     <NavBar />
     <RecipeCardContainer recipeData24={props.recipeData24} />
     <Footer />
     )
}
