import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Fade from 'react-reveal/fade'
import modal from '../components/venmomodal.js';

export default function Home(props) {
  return (
    <section id="page-container">
      {modal}
    </section>
  )
}
