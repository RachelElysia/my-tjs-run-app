import Head from 'next/head';
// External Components
import {NavBar, Footer, TJNavBar} from '../components/headersfooter';
// Bootstrap 
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {ssr: false,});
const Row = dynamic(() => import("react-bootstrap/Row"), {ssr: false,});
const Col = dynamic(() => import("react-bootstrap/Col"), {ssr: false,});
// Styling and Icons
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
const searchlocationicon = <FontAwesomeIcon icon={faMapMarkedAlt} />


// StoreLocator Component
function StoreLocator() {


  return (
    <section className={styles['rachel-tile']}>
    <Container className="mt-4 mb-4 pb-4 pt-4 h-75 w-75">
      
    <Row className="w-100 h-75 pt-5">
          <Col className="col-12 p-3 bg-light" align="center">
      <h1>{searchlocationicon} Find a Trader Joe's Near You</h1>
      </Col>
      <Col className="col-12 p-3 bg-light" align="center">
      <iframe id="inlineFrameExample"
        title="Trader Joe's Near You"
        width="80%"
        height="80%"
        src="/static/storefinder.html">
      </iframe>
      </Col>
      </Row>
      </Container>
    </section>
  );
};


export default function Home() {
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <StoreLocator />
      <Footer />
    </div>
    )
}
