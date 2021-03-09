import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Fade from 'react-reveal/fade'
import modal from '../components/venmomodal.js';

// self calling function... turn a function into an object and then call it with ()

export default function Home(props) {
  return (
    <section id="page-container">
      {modal}
    </section>
  )
}
