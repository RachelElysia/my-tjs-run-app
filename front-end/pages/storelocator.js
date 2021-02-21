import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, Footer, TJNavBar} from '../components/headersfooter'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
const searchlocationicon = <FontAwesomeIcon icon={faSearchLocation} />


function StoreLocator(props) {


  return (
    <div className={styles['flex-container']}>
      <h1>{searchlocationicon} Find a Trader Joe's Near You</h1>
      <iframe id="inlineFrameExample"
        title="Trader Joe's Near You"
        width="80%"
        height="90%"
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
