import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {NavBar, TJNavBar, Footer} from '../components/headersfooter'
import Fade from 'react-reveal/fade';


function ReactResources() {


  return (
    <div id={styles['react-resources']}>
  <h2>React Resources</h2>
    <table>
      <thead><tr>
        <td>Description</td>
        <td>Link</td>
      </tr></thead>
      <tbody>
      <tr>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
    </tbody>
    </table>
    </div>
  );
  }

  function FrontEndResources() {


    return (
      <div id={styles['react-resources']}>
    <h2>Other Front-End Resources</h2>
      <table>
        <thead><tr>
          <td>Description</td>
          <td>Link</td>
        </tr></thead>
        <tbody>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      </table>
      </div>
    );
    }

    function BackEndResources() {


      return (
        <div id={styles['react-resources']}>
      <h2>Back End Resources</h2>
        <table>
          <thead><tr>
            <td>Description</td>
            <td>Link</td>
          </tr></thead>
          <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        </table>
        </div>
      );
      }
    

function ResourcesContainer(props) {

  return (
    <Fade bottom><center>
    <div className={styles['container']}>
        <ReactResources />
        <FrontEndResources />
        <BackEndResources /></div></center></Fade>
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
