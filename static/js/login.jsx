"use strict";

// initialize this variable
let recipesData;

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.

// this is the recipe cards themselves
function CreateAccount() {

  return (
    <div id="create-account">
  <h2>Create an Account</h2>
  <p>Start favoriting recipes and populate your grocery list!</p>
  <form action="/users" method="POST">
    <p>
      First Name <input type="text" name="fname">
    </p>

    <p>
      Last Name <input type="text" name="lname">
    </p>

    <p>
      Email <input type="text" name="email">
    </p>

    <p>
      Password <input type="password" name="password">
    </p>

    <p>
      <input type="submit">
    </p>
  </form>
  </div>
  );
}

function CreateAccount() {

return (
  <div id={log-in}>
    <h2>Log In</h2>
    <p>See your recipes and grocery list!</p>
    <form action="/login" method="POST">

      <p>
        Email: <input type="text" name="email">
      </p>

      <p>
        Password: <input type="password" name="password">
      </p>

      <p>
        <input type="submit">
      </p>
    </form>
  </div>
);
}



// self calling function... turn a function into an object and then call it with ()


(async () => {
  const response = await fetch('api/recipes_hungry');

  // When it's fetched, it will load into this variable recipesData.
  recipesData = await response.json();

  debugger

// Good to go.
ReactDOM.render(<RecipeCardContainer />,
  document.querySelector('#container')
);

})();