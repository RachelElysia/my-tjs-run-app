import Head from "next/head";
// External Components
import { NavBar, TJNavBar, Footer } from "../../components/headersfooter";
import { RecipeCard } from "../../components/detailedrecipe";
// React-y Things
import useSWR from "swr";
import { useRouter } from "next/router";
// Bootstrap
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {
  ssr: false,
});
const Row = dynamic(() => import("react-bootstrap/Row"), { ssr: false });
const Col = dynamic(() => import("react-bootstrap/Col"), { ssr: false });
const Button = dynamic(() => import("react-bootstrap/Button"), { ssr: false });

// Styling and Icons
import styles from "../../styles/Home.module.css";
import Fade from "react-reveal/fade";

function SingleRecipeContainer(props) {
  return (
    <section className={styles["rachel-tile"]}>
      <Fade>
        <Container className="my-5 py-5 px-5 h-75 w-100 bg-light">
          <Row className="h-75 pt-3 px-5 m-3 rounded">
            <Col className="col-12" align="center">
              <RecipeCard
                recipe_id={props.mySingleRecipeData.recipe_id}
                title={props.mySingleRecipeData.title}
                directions={props.mySingleRecipeData.directions}
                ingredients={props.mySingleRecipeData.ingredients}
                img={props.mySingleRecipeData.img}
                tags={props.mySingleRecipeData.tags}
                cookTime={props.mySingleRecipeData.cookTime}
                prepTime={props.mySingleRecipeData.prepTime}
                serves={props.mySingleRecipeData.serves}
              />
            </Col>
          </Row>
        </Container>
      </Fade>
    </section>
  );
}

// See [tag_id].js for notes
export default function Home() {
  const router = useRouter();
  const { recipe_id } = router.query;

  const fetchFunction = (url) => fetch(url).then((r) => r.json());

  const recipeIdResult = useSWR(`/api/recipes/${recipe_id}`, fetchFunction);

  // if (recipeIdResult.error) return <div>failed to load</div>
  // if (!recipeIdResult.data) return <div>loading...</div>

  let overrideElement = null;
  if (recipeIdResult.error) {
    overrideElement = <div>failed to load</div>;
  } else if (!recipeIdResult.data) {
    overrideElement = <div>loading...</div>;
  }
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      {overrideElement ? (
        overrideElement
      ) : (
        <SingleRecipeContainer mySingleRecipeData={recipeIdResult.data} />
      )}
      <Footer />
    </div>
  );
}
