// import Head from 'next/head'
import styles from "../../styles/Home.module.css";
import { NavBar, TJNavBar, Footer } from "../../components/headersfooter";

import useSWR from 'swr' //this is needed to fetch data
import Link from 'next/link' //this is needed to get a dynamic link going

// this is needed to fetch data
function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.recipe_id}>
          <Link href={`/recipes/${encodeURIComponent(post.recipe_id)}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts

function Profile() {
  const { data, error } = useSWR('/api/user/${}', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.title}!</div>
}

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function RecipeCard(props) {
  // Split data on the word instead of on the letter

  return (
    <div className={styles["recipe-flex"]}>
      <div className={styles["column"]} id={styles["column-left"]}>
        <p className={styles["recipe-title"]}>
          <text>{props.title}</text>
        </p>
        <p className={styles["text_small"]}>
          FIX ME: TAGS <text></text>
        </p>
        <img
          src={props.img}
          className={styles["my-recipe-img"]}
          width="400em"
        />
      </div>
      <div className={styles["column"]}>
        <p>FIX ME: INGREDIENTS {props.ingredients}</p>
      </div>
      <div className={styles["column"]} id={styles["column-right"]}>
        <p>{props.directions}</p>
      </div>
    </div>
  );
}

function MyRecipesContainer(props) {
  const recipeCards = [];

  for (const recipe of props.recipeDataById) {
    recipeCards.push(
      <RecipeCard
        title={recipe.title}
        directions={recipe.directions}
        ingredients={recipe.ingredients}
        img={recipe.img}
        tags={recipe.tags}
      />
    );
  }

  return <div className={styles["container"]}>{recipeCards}</div>;
}

// self calling function... turn a function into an object and then call it with ()

// export default function Home(props) {
//   return (
//     <>
//       <NavBar />
//       <TJNavBar />
//       {/* <MyRecipesContainer recipeDataById={props.recipeDataById} /> */}
//       <Profile />
//       <Footer />
//     </>
//   );
// }
