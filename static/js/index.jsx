"use strict";

// initialize this variable
let recipesData;

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.

// this is the recipe cards themselves
function RecipeCard(props) {

  return (
    <div className="tiles-flex">
      <a href="/recipes/{recipe.recipe_id}">
        <img src={props.img} className="tile-img" />
      </a>
  </div>
  );
}

//this is the container that will rendor
//notice the syntax is we input recipe info
function RecipeTileContainer() {

  const recipeCards = [];

  for (const recipe of recipesData) {
    recipeCards.push(
      <RecipeCard
      title={recipe.title}
      directions={recipe.directions}
      recipe_id={recipe.recipe_id}
      img={recipe.img}
      />
    );
  }

  return (
    <React.Fragment>
      {recipeCards}
    </React.Fragment>
  );
};




// self calling function... turn a function into an object and then call it with ()


(async () => {
  const response = await fetch('api/recipes_hungry');

  // When it's fetched, it will load into this variable recipesData.
  recipesData = await response.json();

  debugger

// Good to go.
ReactDOM.render(<RecipeTileContainer />,
  document.querySelector('#container')
);

})();