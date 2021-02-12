import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'

// MUST USE ABSOLUTE PATH FOR THIS TO WORK
export async function getStaticProps(context) {
  const res = await fetch('http://localhost:5000/api/recipes')
  const recipeData24 = await res.json()

  if (!recipeData24) {
    return {
      notFound: true,
    }
  }

  return {
    props: {recipeData24,}, // will be passed to the page component as props
  }
}

//fetch('/recipes_data') -> Promise<response>
//  This is going to fetch the data and it's going to wait until it's fetched.
function SignUp() {

  return (
    <div id={styles['create-account']}>
  <h2>Create an Account</h2>
  <h3>Start favoriting recipes and populate your grocery list!</h3>
  <form action="/users" method="POST">
    <table>
      <tr>
        <td>
      <label for="fname">First Name:</label> <br />
      <input type="text" name="fname" id="fname" placeholder="Joe" />
    </td>
    <td>
      <label for="lname">Last Name:</label> <br />
      <input type="text" name="lname" id="lname" placeholder="Coulombe" />
    </td>
    </tr>
    <tr>
      <td>
      <label for="email">Email:</label> <br />
      <input type="email" name="email" id="email" placeholder="joe@email.com"/>
    </td>
    <td>
    <label for="fname">Password <i>Unsecure</i>:</label><br />
      <input type="password" name="password" id="password" placeholder="Unsecure Password"/>
    </td>
    </tr>
    <tr>
      <input type="submit"/ >
    </tr>
    </table>
  </form>
  </div>
  );
}

function SignIn() {

  return (
    <div id={styles['log-in']}>
      <h2>Log In</h2>
      <h3>See your recipes and grocery list!</h3>
      <form action="/login" method="POST">

        <p>
          <label for="email">Email:</label> <br />
          <input type="text" name="email" id="email" placeholder="Your email" />
        </p>
        <p>
          <label for="fname">Password</label> <br />
          <input type="password" name="password" id="password" placeholder="Your password" />
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </div>
  );
  }


function SignInUp() {

  return (
    <div id={styles['container-inup']}>
      <SignUp />
      <SignIn />
    </div>
  );
};

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {
  return (
    <>
      <NavBar />
      <TJNavBar />
      <SignInUp />
      <Footer />
    </>
  )
}
