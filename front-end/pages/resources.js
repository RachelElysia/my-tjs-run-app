import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade';
import useSWR from 'swr'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight, faLink} from '@fortawesome/free-solid-svg-icons'

const leftquote = <FontAwesomeIcon icon={faQuoteLeft} />
const rightquote = <FontAwesomeIcon icon={faQuoteRight} />
const linkicon = <FontAwesomeIcon icon={faLink} />

function ResourcesContainer(props) {

  let resources;
    
  (function selfCall() {
    const fetchTagsFunction = url => fetch(url).then(r => r.json())

    const resourcesData = useSWR(`/api/resources`, fetchTagsFunction)

    if (resourcesData.error) return <div>failed to load</div>
    if (!resourcesData.data) return <div>loading...</div>

    console.log("This is my resourcesData:", resourcesData.data)

    resources = resourcesData.data.map((resource) => (
      <tr>
        <td>{resource.topic}</td>
        <td>{resource.details}</td>
        <td>{resource.uses}</td>
        <td><Link href={resource.resource_url}><a>{resource.resource_url}</a></Link></td>
      </tr>
    ));
  })();

  return (
    <Fade bottom><center>
    <div className={styles['wide-container']}>
      <div className={styles['resources-box']}>
        <h1>{linkicon} Resources</h1>
        <section class="component">

        <blockquote class="callout quote">{leftquote}
          <quote>
            If you have knowledge, let others light their candle in it. {rightquote}
          </quote>
          <cite>
            - Margaret Fuller
          </cite>
        </blockquote>

          <p>
            In addition to my extensive studies at
            <Link href="http://www.hackbrightacademy.com" alt="Hackbright Academy" target="_blank"><a>Hackbright Academy</a></Link>,
            I built this app with countless hours finding the online resources I listed below.
          </p>
        </section>
        <table>
          <thead>
            <tr>
              <td>Topic</td>
              <td>Description</td>
              <td>Use</td>
              <td>Link</td>
            </tr>
          </thead>
          <tbody className={styles['text_small']}>
            {resources}
          </tbody>
        </table>
      </div>
    </div></center></Fade>
  );
};

export default function Home(props) {
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <ResourcesContainer />
      <Footer />
    </div>
    )
}
