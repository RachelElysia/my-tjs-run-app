import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade'
import {useRouter} from 'next/router'
import React, { useState } from "react"



function SignIn() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    user: {},
    loggedIn: false
  });

  const handleText = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/api/sms', {
      method: 'POST',
      body: data,
    })    

    .then(response => {
      console.log(response)
      if (response.status !== 200) {
        alert('Something failed.');
        return;
      }
      response.json().then(data => {
        }
    ) });
  }

  return (
    <div id={styles['log-in']}>
      <h2>Please Text</h2>
      <form onSubmit={handleText}>
          <input type="submit" className={styles['submit-button']}/>
      </form>
    </div>
  );
}


function SignInUp() {

  return (
    <div id={styles['container-inup']}>
      <SignIn />
    </div>
  );
};


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