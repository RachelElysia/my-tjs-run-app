"use strict";

let recipesData;

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
    console.log(directionsSplit[i]);
      if (count>120) {
        splitIndex = i;
        break;
      };
  }
  recipeDirections = directionsSplit.slice(0, splitIndex).join(" ");

  return (
    <div className="recipe recipe-flex">
      <img src={props.img} className="recipe-img" />
      <div className="info">
        <p className="center strong">{props.title}</p>
        <p className="center text_small">{recipeDirections}...</p>
      </div>
  </div>
  );
}

function RecipeCardContainer() {

  const recipeCards = [];

  for (const recipe of recipesData) {
    recipeCards.push(
      <RecipeCard
      title={recipe.title}
      directions={recipe.directions}
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
  const response = await fetch('api/recipes');

  // When it's fetched, it will load into this variable recipesData.
  recipesData = await response.json();

  debugger

// Good to go.
ReactDOM.render(<RecipeCardContainer />,
  document.querySelector('#container')
);

})();