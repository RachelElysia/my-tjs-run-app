import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade'
import {useRouter} from 'next/router'
import React, { useState } from "react"


function SignUp() {

  const router = useRouter()

  const [formData, setFormData] = useState({
    user: {},
    loggedIn: false
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/api/users', {
      method: 'POST',
      body: data,
    })      
    .then(response => {
      if (response.status_code !== 200) {
        alert('Please try a different phone number.');
        return;
      }
      alert('You created an account {data[0].user.fname}! Build your favorite recipes to easily view your grocery list!');
      response.json().then(data => {
        console.log(JSON.stringify(data[0].user))
        console.log(data[0].user)
        localStorage.setItem('user', JSON.stringify(data[0].user));
        localStorage.setItem('loggedIn', true);
        setFormData({loggedIn: true, user: data[0].user});
        router.push("/recipes")
        }
    ) });
  }

  return (
    <div id={styles['create-account']}>
  <h2>Create an Account</h2>
  <h3>Start favoriting recipes and populate your grocery list!</h3>
  <form onSubmit={handleSubmit}>
    <table><tbody>
      <tr>
        <td>
      <label htmlFor="fname">First Name:</label> <br />
      <input type="text" name="fname" id="fname" placeholder="Joe" required autoFocus/>
    </td>
    <td>
      <label htmlFor="lname">Last Name:</label> <br />
      <input type="text" name="lname" id="lname" placeholder="Coulombe" required/>
    </td>
    </tr>
    <tr>
      <td>
      <label htmlFor="phone">10-digit Phone Number:</label> <br />
      <input type="tel" name="phone" id="phone"
      placeholder="4158631292" pattern="[0-9]{10}" required/>
    </td>
    <td>
    <label htmlFor="fname">Password:</label><br />
      <input type="password" name="password" id="password" placeholder="Password"/>
    </td>
    </tr>
    <tr>
      <td>
      <input type="submit" />
      </td>
    </tr>
    </tbody>
    </table>
  </form>
  </div>
  );
}

// function handleSubmitSignIn(event) {
//   event.preventDefault();
//   const data = new FormData(event.target);
  
//   fetch('/api/userlogin', {
//     method: 'POST',
//     body: data,
//   });
// }

function SignIn() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    user: {},
    loggedIn: false
  });

  const handleSubmitSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/api/userlogin', {
      method: 'POST',
      body: data,
    })      
    .then(response => {
      if (response.status !== 200) {
        alert('Login Failed. Phone number and/or password is incorrect.');
        return;
      }
      response.json().then(data => {
        localStorage.setItem('user', JSON.stringify(data[0].user));
        localStorage.setItem('loggedIn', true);
        setFormData({loggedIn: true, user: data[0].user});
        alert(`Check out your favorite recipes ${data[0].user.fname}!`);
        router.push("/recipes")
        }
    ) });
  }

  return (
    <div id={styles['log-in']}>
      <h2>Log In</h2>
      <h3>See your recipes and grocery list!</h3>
      <form onSubmit={handleSubmitSignIn}>

        <p>
          <label htmlFor="phonein">Phone Number:</label> <br />
          <input type="tel" name="phonein" id="phonein" placeholder="4158631292" />
        </p>
        <p>
          <label htmlFor="passwordin">Password:</label> <br />
          <input type="password" name="passwordin" id="passwordin" placeholder="Your password" />
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
    <div id="page-container">
      <NavBar />
      <TJNavBar /><Fade bottom>
      <SignInUp /></Fade>
      <Footer />
    </div>
  )
}

export {SignInUp}