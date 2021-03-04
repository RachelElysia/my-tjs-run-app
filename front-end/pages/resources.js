import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade';
import useSWR from 'swr'
import Link from 'next/link'

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
    <div className={styles['container']}>
      <div className={styles['resources-box']}>
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
