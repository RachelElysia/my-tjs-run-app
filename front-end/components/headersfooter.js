"use strict";
import Head from "next/head";
import Modal from "./venmomodal";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("react-bootstrap/Navbar"), { ssr: false });
const Nav = dynamic(() => import("react-bootstrap/Nav"), { ssr: false });
const NavDropdown = dynamic(() => import("react-bootstrap/NavDropdown"), {
  ssr: false,
});
const NavbarBrand = dynamic(() => import("react-bootstrap/NavbarBrand"), {
  ssr: false,
});
const NavbarToggle = dynamic(() => import("react-bootstrap/NavbarToggle"), {
  ssr: false,
});
const NavbarCollapse = dynamic(() => import("react-bootstrap/NavbarCollapse"), {
  ssr: false,
});
const NavbarContext = dynamic(() => import("react-bootstrap/NavbarContext"), {
  ssr: false,
});
const NavLink = dynamic(() => import("react-bootstrap/NavLink"), {
  ssr: false,
});
const NavItem = dynamic(() => import("react-bootstrap/NavItem"), {
  ssr: false,
});
const Form = dynamic(() => import("react-bootstrap/Form"), { ssr: false });
const FormControl = dynamic(() => import("react-bootstrap/FormControl"), {
  ssr: false,
});
const Button = dynamic(() => import("react-bootstrap/Button"), { ssr: false });
const Container = dynamic(() => import("react-bootstrap/Container"), {
  ssr: false,
});
const Row = dynamic(() => import("react-bootstrap/Row"), { ssr: false });
const Col = dynamic(() => import("react-bootstrap/Col"), { ssr: false });

import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faBook,
  faMapMarkedAlt,
  faSms,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
const basketicon = <FontAwesomeIcon icon={faShoppingBasket} />;
const bookicon = <FontAwesomeIcon icon={faBook} />;
const searchlocationicon = <FontAwesomeIcon icon={faMapMarkedAlt} />;
const smsicon = <FontAwesomeIcon icon={faSms} />;
const searchicon = <FontAwesomeIcon icon={faSearch} />;
const navicon = <FontAwesomeIcon icon={faBars} />;

function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogIn = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    router.push("/");
    setUser(null);
    localStorage.clear();
  };

  const welcome = user === null ? "" : `Welcome, ${user.fname}!`;
  const logInOutButton = user === null ? "Log In" : "Log Out";
  const handleLogInOrOut = user === null ? handleLogIn : handleLogOut;

  const logInOrOut = (
    <Button className="btn" type="button" onClick={handleLogInOrOut}>
      {logInOutButton}
    </Button>
  );

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    // hey form is the html event and target is the field that references the
    // html element that triggered the event
    const form = e.target;
    const formData = new FormData(form);

    const searchString = formData.get("search_string");
    const encodedString = encodeURIComponent(searchString);
    router.push(`/search/${encodedString}`);
  };

  return (
    <>
      <div>
        <Head>
          <title>My TJ Run</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
      </div>
      <Navbar
        bg="white"
        variant="white"
        expand="md"
        id="top-nav"
        className="fixed-top"
      >
        <NavbarBrand href="/">
          <img
            alt="TJ's Run App"
            src="http://localhost:5000/img/logo.png"
            // className="d-inline-block align-top"
          />
          TJ's Run
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav">{navicon}</NavbarToggle>
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/myrecipes">
              <NavLink as="a" href="/myrecips">
                {bookicon} My Recipes
              </NavLink>
            </Link>
            <Link href="/mygrocerylist">
              <NavLink as="a" href="/mygrocerylist">
                {basketicon} {smsicon} My Grocery List
              </NavLink>
            </Link>
          </Nav>
          <Form
            onSubmit={handleSearch}
            className={styles["search-form"]}
            inline
          >
            <FormControl
              type="text"
              placeholder="Search"
              name="search_string"
              autoComplete="off"
              required
            />
            <Button className="btn" type="submit">
              {searchicon}
            </Button>
          </Form>
          <Button
            className="btn"
            type="button"
            title="Find a Trader Joe's"
            onClick={(e) => {
              e.preventDefault();
              router.push("/storelocator");
            }}
          >
            {searchlocationicon}
          </Button>
          <div className="span-2 mx-1">{welcome}</div>
          <div className="span-1">{logInOrOut}</div>
        </NavbarCollapse>
      </Navbar>
    </>
  );
}

function TJNavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const [isShown, setIsShown] = useState(false);
  const router = useRouter();

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div id={styles["tjbar"]}>
        <Link href="/recipes">
          <a>Trader Joe's Recipes</a>
        </Link>
      </div>
      {isShown && (
        <div id={styles["tjbar-dropdown"]}>
          <div id={styles["tjbar-table-div"]}>
            <table id={styles["tjbar-table"]}>
              <thead>
                <tr>
                  <td></td>
                  <td>
                    <center>
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(
                            `${user === null ? "/login" : "recipes"}`
                          );
                        }}
                      >
                        Get Started
                      </Button>
                    </center>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles["checkicon"]}>{bookicon}</td>
                  <td>Choose your favorite recipes</td>
                </tr>
                <tr>
                  <td className={styles["checkicon"]}>{basketicon}</td>
                  <td>Generate your grocery list</td>
                </tr>
                <tr>
                  <td className={styles["checkicon"]}>{smsicon}</td>
                  <td>Receive your list as a text message!</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table id={styles["tjbar-table2"]}>
              <thead>
                <tr>
                  <td>Party Favorites</td>
                  <td>Featured</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link href="/tags/33">
                      <a>Baking</a>
                    </Link>
                  </td>
                  <td width="150px">
                    <Link href="/tags/102">
                      <a>St. Patrick's Day</a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/tags/16">
                      <a>Party</a>
                    </Link>
                  </td>
                  <td>
                    <Link href="/tags/154">
                      <a>Easter</a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/tags/8">
                      <a>Salads</a>
                    </Link>
                  </td>
                  <td>
                    <Link href="/tags/43">
                      <a>Spring</a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/tags/5">
                      <a>Snacks</a>
                    </Link>
                  </td>
                  <td>
                    <Link href="/tags/147">
                      <a>Breakfast</a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/tags/104">
                      <a>Cocktails</a>
                    </Link>
                  </td>
                  <td>
                    <Link href="/tags/10">
                      <a>Meatless</a>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Footer() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const router = useRouter();

  let myIngredients = [
    "TJ's Avocado Oil",
    "TJ's Garlic Spread",
    "TJ's Pumpkin Cranberry Crisps",
    "TJ's Fig Butter",
    "TJ's Bourbon Vanilla Extract",
    "Neopolitan Joe Joe's",
    "TJ's Crumbled Feta",
    "TJ's Lemon Elderflower Soda",
    "TJ's Panko Breadcrumbs",
    "TJ's Freeze Dried Strawberries",
    "TJ's Island Salsa",
    "TJ's Garlic Naan",
    "TJ's Wheat Pizza Dough",
    "TJ's Organic French Rolls",
    "TJ's Soy Chorizo",
  ];
  let randomIngredient =
    myIngredients[Math.floor(Math.random() * myIngredients.length)];

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
      <footer>
        <Container>
          <Row className="justify-content-left justify-content-md-center pt-2">
            <Col className="col-12 col-md-6 col-lg-4">
              A Project by{" "}
              <Link href="http://www.rachelelysia.com" target="_blank">
                <a>Rachel Elysia Perkins</a>
              </Link>
            </Col>
            <Col className="col-12 col-md-5 col-lg-4">
              <Button onClick={openModal}>Buy me {randomIngredient}</Button>
            </Col>
            <Col className="col-12 col-md-2 col-lg-2">
              <Link href="/resources">
                <a>Resources</a>
              </Link>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export { NavBar, TJNavBar, Footer };
