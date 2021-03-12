import Head from "next/head";
// React-y Things
import React, { useState } from "react";
import { useRouter } from "next/router";
// External Components
import { NavBar, TJNavBar, Footer } from "../components/headersfooter";
// Bootstrap
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {
  ssr: false,
});
const Row = dynamic(() => import("react-bootstrap/Row"), { ssr: false });
const Col = dynamic(() => import("react-bootstrap/Col"), { ssr: false });
const Button = dynamic(() => import("react-bootstrap/Button"), { ssr: false });

// Styling and Icons
import styles from "../styles/Home.module.css";
import Fade from "react-reveal/fade";

// SignUpComponent
function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user: {},
    loggedIn: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("/api/users", {
      method: "POST",
      body: data,
    }).then((response) => {
      // if (response.status_code !== 200) {
      //   alert('Please try a different phone number.');
      //   return;
      // }
      alert(
        "You created an account! Build your favorite recipes to easily view your grocery list!"
      );
      response.json().then((data) => {
        console.log(JSON.stringify(data[0].user));
        console.log(data[0].user);
        localStorage.setItem("user", JSON.stringify(data[0].user));
        localStorage.setItem("loggedIn", true);
        setFormData({ loggedIn: true, user: data[0].user });
        router.back();
      });
    });
  };

  return (
    <Col className="col-12 col-md-8 p-4 bg-light border-right rounded-left">
      <h2>Create your Account</h2>
      <h3>
        Love Trader Joe's? Start favoriting recipes and populate your TJ's
        grocery list! <i>Free forever!</i>
      </h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="fname">First Name:</label> <br />
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="Joe"
                  required
                  minlength="2"
                  maxlength="40"
                  autoFocus
                />
              </td>
              <td>
                <label htmlFor="lname">Last Name:</label> <br />
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="Coulombe"
                  minlength="2"
                  maxlength="40"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="phone">10-digit Phone Number:</label> <br />
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="4158631292"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </td>
              <td>
                <label htmlFor="fname">Password:</label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <Button type="submit" className={styles["submit-button"]}>
                  Create
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Col>
  );
}

// ********{props.lastLocation ? props.lastLocation : "/recipes"}********
// ???? ugh.

// SignInComponent
function SignIn(props) {

  const router = useRouter();

  const [formData, setFormData] = useState({
    user: {},
    loggedIn: false,
  });

  const handleSubmitSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("/api/userlogin", {
      method: "POST",
      body: data,
    }).then((response) => {
      console.log(response);
      if (response.status !== 200) {
        alert("Login Failed. Phone number and/or password is incorrect.");
        return;
      }
      response.json().then((data) => {
        localStorage.setItem("user", JSON.stringify(data[0].user));
        localStorage.setItem("loggedIn", true);
        setFormData({ loggedIn: true, user: data[0].user });
        alert(`Check out your favorite recipes ${data[0].user.fname}!`);
        router.back();
      });
    });
  };

  return (
    <Col className="col-12 col-md-4 p-4 bg-light rounded-right">
      <h2>Log In</h2>
      <h3>See your recipes and grocery list!</h3>
      <form onSubmit={handleSubmitSignIn}>
        <p>
          <label htmlFor="phonein">Phone Number:</label> <br />
          <input
            type="tel"
            name="phonein"
            id="phonein"
            placeholder="4158631292"
            maxLength="10"
          />
        </p>
        <p>
          <label htmlFor="passwordin">Password:</label> <br />
          <input
            type="password"
            name="passwordin"
            id="passwordin"
            placeholder="Your password"
          />
        </p>
        <p>
          <Button type="submit">Log In</Button>
        </p>
      </form>
    </Col>
  );
}

// Container Holding SignIn Component and SignUp Component
function SignInUpContainer() {
  return (
    <section className={styles["rachel-tile"]}>
      <Container className="my-4 py-4 h-75 w-75">
        <Row className="w-100 h-75 pt-5 rounded">
          <SignUp />
          <SignIn />
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
      <Fade bottom>
        <SignInUpContainer />
      </Fade>
      <Footer />
    </div>
  );
}

export { SignInUpContainer };
