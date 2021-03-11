import Head from "next/head";
//External Components
import { NavBar, TJNavBar, Footer } from "../components/headersfooter";
// React-y Things
import Link from "next/link";
// Bootstrap
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {
  ssr: false,
});
const Row = dynamic(() => import("react-bootstrap/Row"), { ssr: false });
const Col = dynamic(() => import("react-bootstrap/Col"), { ssr: false });
// Client Side Data Fetching with Next.js
import useSWR from "swr";
// Styling and Icons
import styles from "../styles/Home.module.css";
import Fade from "react-reveal/fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
const leftquote = <FontAwesomeIcon icon={faQuoteLeft} />;
const rightquote = <FontAwesomeIcon icon={faQuoteRight} />;
const linkicon = <FontAwesomeIcon icon={faLink} />;

// ResourcesContainer Component
function ResourcesContainer(props) {
  let resources;

  (function selfCall() {
    const fetchTagsFunction = (url) => fetch(url).then((r) => r.json());

    const resourcesData = useSWR(`/api/resources`, fetchTagsFunction);

    if (resourcesData.error) return <div>failed to load</div>;
    if (!resourcesData.data) return <div>loading...</div>;

    console.log("This is my resourcesData:", resourcesData.data);

    resources = resourcesData.data.map((resource) => (
      <Fade Bottom>
        <Row className="border-top">
          <Col className="d-none d-md-block col-2">{resource.topic}</Col>
          <Col className="col-5 col-md-2">{resource.details}</Col>
          <Col className="d-none d-md-block col-3">{resource.uses}</Col>
          <Col className="col-5">
            <Link href={resource.resource_url}>
              <a>{resource.resource_url}</a>
            </Link>
          </Col>
        </Row>
      </Fade>
    ));
  })();

  return (
    <section className={styles["rachel-tile"]}>
      <Container className="my-4 py-4 h-75 w-85">
        <Row className="w-100 h-75 pt-5">
          <Col className="col-12 p-3 bg-light" align="center">
            <h1>{linkicon} Resources</h1>
          </Col>
          <Col className="col-12 col-sm-6 col-md-3 p-3 bg-light">
            <p>
              In addition to my extensive studies at
              <Link
                href="http://www.hackbrightacademy.com"
                alt="Hackbright Academy"
                target="_blank"
              >
                <a>Hackbright Academy</a>
              </Link>
              , I built this app with countless hours finding the online
              resources I listed below.
            </p>
          </Col>
          <Col className="col-12 col-sm-6 col-md-2 p-3 bg-light" align="center">
            <blockquote class="callout quote">
              {leftquote}
              <quote>
                If you have knowledge, let others light their candle in it.{" "}
                {rightquote}
              </quote>
              <br />
              <cite>- Margaret Fuller</cite>
            </blockquote>
          </Col>
          <Col className="col-12 col-md-7 p-3 bg-light">
            <ul>
              <li>
                <strong>APIs:</strong> Trader Joe's Recipes API, Twilio API,
                Google Maps API
              </li>
              <li>
                <strong>Languages</strong>: Python, JavaScript, JSX, HTML, CSS,
                SQL
              </li>
              <li>
                <strong>Frameworks & Libraries</strong>: Flask, React.js,
                Next.js, Bootstrap, React-Reveal, Werkzeug
              </li>
              <li>
                <strong>Database & Industry Tools</strong>: PostgreSQL, Git,
                GitHubm VS Code, SQLAlchemy, Next.js, Photoshop
              </li>
            </ul>
          </Col>
          <Col className="col-12 p-3 bg-light">
            <Row>
              <Col className="d-none d-md-block col-2">
                <h3>Topic</h3>
              </Col>
              <Col className="col-5 col-md-2">
                <h3>Description</h3>
              </Col>
              <Col className="d-none d-md-block col-3">
                <h3>Use</h3>
              </Col>
              <Col className="col-5">
                <h3>Link</h3>
              </Col>
            </Row>
            {resources}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <ResourcesContainer />
      <Footer />
    </div>
  );
}
