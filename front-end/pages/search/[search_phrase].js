import Head from "next/head";
// React-y Things
import React, { useState } from "react";
import { useRouter } from "next/router";
// External Components
import { NavBar, TJNavBar, Footer } from "../../components/headersfooter";
import { RecipeCard } from "../../components/roundedtiles";
import Pagination from "../../components/pagination";
// Bootstrap
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {
  ssr: false,
});
const Row = dynamic(() => import("react-bootstrap/Row"), { ssr: false });
const Col = dynamic(() => import("react-bootstrap/Col"), { ssr: false });
// Client Side Data Fetching with Next.js
import useSWR from "swr";
// Styling and Icons
import styles from "../../styles/Home.module.css";
import Fade from "react-reveal/fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const searchicon = <FontAwesomeIcon icon={faSearch} />;

// For RecipeCardContainer
function RecipeCards(props) {
  return props.recipeData24.map((recipe) => (
    <RecipeCard
      title={recipe.title}
      directions={recipe.directions}
      img={recipe.img}
      recipe_id={recipe.recipe_id}
    />
  ));
}

// RecipeCard Component
function RecipeCardContainer(props) {
  //State hooks for Pagination Put near top because tagNameResult renders different hooks
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const recipesPerPage = 12;

  const router = useRouter();
  const { search_phrase } = router.query;

  const fetchSearchName = (url) => fetch(url).then((r) => r.json());

  // result = useSWR object that has keys {data, error} built in
  const searchNameResult = useSWR(
    `/api/search/${search_phrase}`,
    fetchSearchName
  );

  if (searchNameResult.error) return <div>failed to load</div>;
  if (!searchNameResult.data) return <div>loading...</div>;

  // had issue if search_phrase was blank...
  function toTitleCase(str) {
    // Used regex to find first characters and replace them with capitalization
    // and the slice after the first character to lower case
    if (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  }

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = props.recipeData24.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const numOfRecipes = props.recipeData24.length;

  const paginate = (number) => setCurrentPage(number);

  if (searchNameResult.data < 1) {
    return (
      <section className={styles["wide-container"]}>
        <div className={styles["tag-heading"]}>
          <h1>
            {searchicon} {toTitleCase(search_phrase)}
          </h1>
          <p>Sorry, there are no results matching "{search_phrase}"</p>
        </div>
      </section>
    );
  } else {
    // refactor me your tag name rendering as a flex - yourself 1am 2/17
    return (
      <>
        <main>
          <Fade>
            <Container className="pt-5 mt-5 pb-2 translate-middle d-flex justify-content-center">
              <Row className="translate-middle">
                <Col className="col-12 translate-middle" align="center">
                  <h1>
                    {searchicon} {toTitleCase(search_phrase)}
                  </h1>
                </Col>
                <Col className="col-12 translate-middle" align="center">
                  <p>
                    Viewing {numOfRecipes} recipes searched with "
                    {search_phrase}"{" "}
                  </p>
                </Col>
              </Row>
            </Container>
          </Fade>
        </main>
        <section className={styles["rachel-tile"]}>
          <Fade bottom>
            <div className={styles["flex-container-myrecipes"]}>
              <Col className="col-12 translate-middle" align="right">
                <Pagination
                  recipesPerPage={recipesPerPage}
                  totalRecipes={props.recipeData24.length}
                  paginate={paginate}
                />
              </Col>
              <RecipeCards recipeData24={currentRecipes} />
            </div>
          </Fade>
        </section>
      </>
    );
  }
}

export default function Home() {
  // need next.js built in dynamic router
  const router = useRouter();
  const { search_phrase } = router.query;

  // NEW SCHOOL FETCHING!
  const fetchRecipesBySearchFunction = (url) =>
    fetch(url).then((r) => r.json());

  const searchRecipesResult = useSWR(
    `/api/search/${search_phrase}`,
    fetchRecipesBySearchFunction
  );

  // useSWR takes 2 parameters: the URL, and how to fetch it (.then promise)
  // beneath the hood useSWR has 1 object with 2 keys returned, data and error
  // we call this destructuring :)
  // if (searchRecipesResult.error) return <div>failed to load</div>
  // if (!searchRecipesResult.data) return <div>loading...</div>

  let overrideElement = null;
  if (searchRecipesResult.error) {
    overrideElement = <div>failed to load</div>;
  } else if (!searchRecipesResult.data) {
    overrideElement = <div>loading...</div>;
  }

  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      {overrideElement ? (
        overrideElement
      ) : (
        <RecipeCardContainer recipeData24={searchRecipesResult.data} />
      )}
      <Footer />
    </div>
  );
}
