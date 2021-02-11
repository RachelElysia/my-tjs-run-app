"use strict";

let recipesData;
// const recipesData = [
//   {
//     title: 'Balloonicorn',
//     description: 'This is a really long description to see what is happening to my sentence',
//     img: '/static/img/balloonicorn.jpg'
//   },

//   {
//     title: 'Float',
//     description: 'I never knew that everything was on a cue. To turn around when all I needed was the truth.',
//     img: '/static/img/float.jpg'
//   },

//   {
//     title: 'Llambda',
//     description: 'knitting scarves',
//     img: '/static/img/llambda.jpg'
//   },


//   {
//     title: 'Off-By-One',
//     description: 'climbing mountains',
//     img: '/static/img/off-by-one.jpg'
//   },

//   {
//     title: 'Seed.py',
//     description: 'making curry dishes',
//     img: '/static/img/seedpy.jpg'
//   },

//   {
//     title: 'Polymorphism',
//     description: 'costumes',
//     img: '/static/img/polymorphism.jpg'
//   },

//   {
//     title: 'Short Stack Overflow',
//     description: 'ocean animal trivia',
//     img: '/static/img/shortstack-overflow.jpg'
//   },

//   {
//     title: 'Merge',
//     description: 'bullet journaling',
//     img: '/static/img/merge.jpg'
//   }
// ];

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function RecipeCard(props) {

  return (
    <div className="card">
      <img src={props.img} />
      <h2 className="center">{props.title}</h2>
      <h2 className="center">{props.description.slice(0, 50)}...</h2>
    </div>
  );
}

function RecipeCardContainer() {

  const recipeCards = [];

  for (const recipe of recipesData){
    recipeCards.push(
      <RecipeCard
      title={recipe.title}
      description={recipe.description}
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
  const response = await fetch('/recipes_data');

  // When it's fetched, it will load into this variable recipesData.
  recipesData = await response.json();

  debugger

// Good to go.
ReactDOM.render(<RecipeCardContainer />,
  document.querySelector('#container')
);

})();
