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
      if (count>125) {
        splitIndex = i;
        break;
      };
  }
  recipeDirections = directionsSplit.slice(0, splitIndex).join(" ");

  // Split title on the word if awkward 2 liner
  let recipeTitle = props.title;
  if (recipeTitle.length > 35 && recipeTitle.length < 48) {
    let titleSplit = recipeTitle.split(" ");
    let count = 0;
    let spliceIndex = 0;
    for (let i=0; i< titleSplit.length; i++) {
      count += titleSplit[i].length;
      if (count>35) {
        spliceIndex = i-1;
        break;
      }
    }
    titleSplit.splice(spliceIndex, 0, '{"\n"}');
    recipeTitle = titleSplit.join(" ");
  }


  return (
      <div className="recipe recipe-flex">
          <img src={props.img} className="recipe-img" />
          <div className="info">
            <p className=""><text>hello?{recipeTitle}</text></p>
            <p className={styles['text_small']}>WHAT THE?{recipeDirections}...</p>
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