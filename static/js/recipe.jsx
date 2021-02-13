"use strict";

let recipeData;

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function RecipeCard(props) {

  return (
    <div className="recipe recipe-flex">
      <img src={props.img} className="recipe-img-1" />
      <div className="info">
        <p className="center strong">{props.title}</p>
        <p className="center text_small">Serves: {props.serves}</p>       
        <p className="center text_small">Directions: {props.directions}</p>
        <p className="center text_small">Prep Time: {props.prepTime}</p>
        <p className="center text_small">Cooking Time: {props.cookingTime}</p>
      </div>
  </div>
  );
}

function RecipeDetailsContainer() {

  const recipeCards = [];

  recipeCards.push(
    <RecipeCard
    cookingTime={recipeData.cookingTime}
    directions={recipeData.directions}
    img={recipeData.img}
    prepTime={recipeData.prepTime}
    recipe_id={recipeData.recipe_id}
    serves={recipeData.serves}
    />
  );
  

  return (
    <React.Fragment>
      {recipeCards}
    </React.Fragment>
  );
};



// self calling function... turn a function into an object and then call it with ()


(async () => {
  const response = await fetch(`/api/recipes/${recipe_id}`);

  // When it's fetched, it will load into this variable recipeData.
  recipeData = await response.json();

  debugger

// Good to go.
ReactDOM.render(<RecipeDetailsContainer />,
  document.querySelector('#container')
);
})();