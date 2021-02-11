"use strict";
const recipeData = [
  {
    title: 'Balloonicorn',
    tags: 'video games',
    img: '/static/img/balloonicorn.jpg'
  },

  {
    title: 'Float',
    tags: 'baking pretzels',
    img: '/static/img/float.jpg'
  },

  {
    title: 'Llambda',
    tags: 'knitting scarves',
    img: '/static/img/llambda.jpg'
  },


  {
    title: 'Off-By-One',
    tags: 'climbing mountains',
    img: '/static/img/off-by-one.jpg'
  },

  {
    title: 'Seed.py',
    tags: 'making curry dishes',
    img: '/static/img/seedpy.jpg'
  },

  {
    title: 'Polymorphism',
    tags: 'costumes',
    img: '/static/img/polymorphism.jpg'
  },

  {
    title: 'Short Stack Overflow',
    tags: 'ocean animal trivia',
    img: '/static/img/shortstack-overflow.jpg'
  },

  {
    title: 'Merge',
    tags: 'bullet journaling',
    img: '/static/img/merge.jpg'
  }
];

function RecipeFunction(props) {
  return (
    <div classtitle="recipe">
      <img src={props.img} />
      <h2 classtitle="center">{props.title}</h2>
      <h2 classtitle="center">Tags: {props.tags} </h2>
    </div>
  );
}

function RecipeContainer() {

  const recipes_list = [];

  for (const recipe of recipeData){
    recipes_list.push(
      <RecipeFunction
      img={recipe.img}
      title={recipe.title}
      tags={recipe.tags}
      />
    );
  }

  return (
    <React.Fragment>
      {recipes_list}
    </React.Fragment>
  );
};

// Good to go.
ReactDOM.render(<RecipeContainer />,
  document.querySelector('#container')
);



