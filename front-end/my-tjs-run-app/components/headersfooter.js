"use strict";


// THIS IS THE NAV BAR
function NavBar() {

  return (
    <nav>
      <ul id="left-nav">
        <li>      <img src="/static/logo.jpg" alt="My TJ's Run Logo" /></li>
        <li> <h1>My TJ's Run</h1></li>
        <li>My Recipes</li>
        <li>My Grocery List</li>
        <li>Search</li>
        <li>Find a Store</li>
        <li>Create Account </li>
        <li>Log In </li> 
        <li>My Account</li>
      </ul>
  </nav>
  );
}


function Footer() {

  return (
    <footer>
      <ul>
        <li>Accessibility</li>
        <li><a href="http://www.rachelelysia.com">A Project by Rachel Perkins</a></li>
        <li>Hackbright Academy Software Engineering 2021</li>
      </ul>
    </footer>
  );
} 

// self calling function... turn a function into an object and then call it with ()


export {NavBar, Footer};
