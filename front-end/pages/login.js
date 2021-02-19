import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade';

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  
  fetch('/api/users', {
    method: 'POST',
    body: data,
  });
}

function SignUp() {

  return (
    <div id={styles['create-account']}>
  <h2>Create an Account</h2>
  <h3>Start favoriting recipes and populate your grocery list!</h3>
  <form onSubmit={handleSubmit}>
    <table>
      <tr>
        <td>
      <label for="fname">First Name:</label> <br />
      <input type="text" name="fname" id="fname" placeholder="Joe" required autofocus/>
    </td>
    <td>
      <label for="lname">Last Name:</label> <br />
      <input type="text" name="lname" id="lname" placeholder="Coulombe" required/>
    </td>
    </tr>
    <tr>
      <td>
      <label for="phone">10-digit Phone Number:</label> <br />
      <input type="tel" name="phone" id="phone"
      placeholder="4158631292" pattern="[0-9]{10}" required/>
    </td>
    <td>
    <label for="fname">Password:</label><br />
      <input type="password" name="password" id="password" placeholder="Password"/>
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

function handleSubmitSignIn(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  
  fetch('/api/userlogin', {
    method: 'POST',
    body: data,
  });
}
function SignIn() {

  return (
    <div id={styles['log-in']}>
      <h2>Log In</h2>
      <h3>See your recipes and grocery list!</h3>
      <form onSubmit={handleSubmitSignIn}>

        <p>
          <label for="phone">Phone Number:</label> <br />
          <input type="tel" name="phone" id="phone" placeholder="4158631292" />
        </p>
        <p>
          <label for="password">Password:</label> <br />
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
      <TJNavBar /><Fade bottom>
      <SignInUp /></Fade>
      <Footer />
    </>
  )
}
