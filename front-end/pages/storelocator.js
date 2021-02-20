import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, Footer, TJNavBar} from '../components/headersfooter'


function StoreLocator(props) {


  return (
    <div className={styles['flex-container']}>
      <h1>Find a Trader Joe's Near You</h1>
      <iframe id="inlineFrameExample"
        title="Trader Joe's Near You"
        width="80%"
        height="100%"
        max-height="800px"
        src="/static/storefinder.html">
      </iframe>
    </div>
  );
};


export default function Home(props) {
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <StoreLocator />
      <Footer />
    </div>
    )
}
