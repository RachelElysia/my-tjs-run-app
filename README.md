# TJ's Run: An App Revolutionizing Shopping at Trader Joe's
Hackbright Academy Capstone Project (Solo, End-to-End Development)
[Demo](https://www.youtube.com/watch?v=cvMnSRZyeM4)



#### Table of Contents

  - [About My Project](#about-my-project)
    - [Inspiration](#inspiration)
    - [MVP Feature](#mvp-feature)
    - [Engineered Features](#engineered-features)
  - [Stack](#stack)
  - [Upcoming Features](#upcoming-features)
  - [Installation](#installation)
  - [About the Developer](#about-the-developer)
<!-- toc -->

## About My Project

TJ's Run revolutionizes the way users shop at Trader Joe's. Users can save their favorite Trader Joe recipes and choose which of those recipes they want to shop for. **With the click of a button, users can simply receive a text of their grocery list directly to their phone.** Never forget to write your grocery list and never miss an ingredient again!

> "You don't need a silver fork to eat good food."
>  -- Paul Prudhomme

### Inspiration

Driven by the user experience, I wanted to revolutionize using a cookbook. I identified painpoints of the User Journey of cooking from a cookbook. I leveraged a raw 2-JSON-file API a Trader Joe's Recipe API to create the best UX possible.

### MVP Feature

![MVP GIF](/static/img/MVPGif.gif)

Users choose from their favorite recipes to text a simple grocery list directly to their phone through Twilio API.

Users can add and remove their favorite Trader Joe's recipes. With only a few clicks, users quickly build and text new grocery lists to their phone.

### Engineered Features

**Users can:**
- Enjoy mobile-friendly responsive web design
- Enjoy the App-like experience with 100% client-side rendering
- Create an account and login

![Login GIF](/static/img/LoginGif.gif)
- Be kept logged in with their browser's Local Storage
- Browse recipe tiles and view detailed recipes cards
- Favorite and unfavorite recipes with a Button

![Favorite Toggle GIF](/static/img/FavoriteToggleGif.gif)
- View their favorite recipes

![My Recipes GIF](/static/img/MyRecipesGif.gif)
- Add recipes to their abridged grocery list from their favorites recipes (onToggle)
- Receive a text of their abridged grocery list with a (onClick) Button (Twilio API)
- Search recipes by keywords in title, tags, and ingredients
![Search and Paginate GIF](/static/img/SearchPaginateGif.gif)
- Locate a Trader Joe's near them (Google Maps API)
- View most popular recipes (most favorited in the database)
- Easily navigate through familar UX design
  - E.g. An intuitive header, (onHover) dropdown menu, footer, pagination, consistency
- Can voluntarily contribute to the app upkeep (venmo modal)
- View the engineer's resources rendered on a page built into the user interface

![My Resources GIF](/static/img/ResourecesGif.gif)

## Stack

**APIs**: Trader Joe's Recipes API, Twilio API, Google Maps API

**Languages**: Python, JavaScript, JSX, HTML, CSS, SQL

**Frameworks & Libraries**: Flask, React.js, Next.js, Bootstrap, React-Reveal, Werkzeug, Flask-Limiter

**Database & Industry Tools**: Next.js, PostgreSQL, SQLAlchemy, Git, GitHub, VS Code, Photoshop

## Upcoming Features

**Users will:**
- Have ability to update or delete account from the user interface
- Have the ability to log in through other authentication methods (OAuth)
- Be recommended recipes based on various factors

## Installation

Check back later!

## About the Developer

Rachel has spent a decade as a California educator teaching math
and yearbook. Always advocating a growth mindset and STEaM education to her students, she took a bittersweet cross country move as a sign to explore her own interests in design and engineering. Engineering has challenged her in all the right ways and she looks forward to finding ways to build community through engineering.

Learn more about Rachel on her [LinkedIn](linkedin.com/in/RachelElysia) or at RachelElysia.com.
