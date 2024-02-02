# Overview

### Purpose

This is a backend API for backend-test-1 Array assessment.

Tech stack:
- Container: Docker
- Server: Node & Express
- Database: PostgreSQL & Sequelize
- Testing: Chai & Mocha

# Getting started

### Install dependencies

- Install **Node ^14.17.5** and **npm ^7.5** if you haven't already.
- You will also need **PostgreSQL ^13.1**. See more detailed instructions below in "Setting up Postgres".
- Next, install the dependencies from `package.json` with `yarn install`
- Create an `.env` file in the root of the project.

### Environment variables

For development environment you need to set the following variables in your `.env` file:

```
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
PORT=
JWT_EXPIRY=
JWT_SECRET=
```


### Setting up Postgres

- Install Postgres if you don't have it (see [Installing Postgres via Brew](https://gist.github.com/sgnl/609557ebacd3378f3b72))
- Optional: Install a Postgres client like [Postico](https://eggerapps.at/postico/)
- Create a database (use the same name as `DB_NAME` environment variable)

```
createdb backend-test-1
```

- Optional: test if your database is created successfully by connecting to it with a Postgres client

### Run the app

```
docker-compose up -d
```

##### Testing libraries

- Chai: assertion library
- Chai Http: HTTP Response assertions
- Mocha: test framework
- Sinon: test's mocks, spies and stubs


### Scripts

- **`yarn start`**
    - Starts the server
- **`yarn test`**
    - Runs unit tests in Mocha
- **`yarn dev`**
    - Starts the server in development mode (with `nodemon`)
- **`yarn db:migrate`**
    - Runs latest DB migrations
- **`yarn db:seed`**
    - Seeds database with initial data
- **`yarn db:unseed`**
    - Unseed database


### Register User:
 - Validates against existing email addresses
 - Unallowed inputs return related errors
 - Passwords hashing with bcryptjs package

### User Login:
 - Successful logins return jwt token stored in res cookie
 - The cookie then is checked and verified on authenticated requests
 - Missing or expired jwt token the user gets an error message accordingly

### User Logout:
 - Erase jwt token from cookie
 - If it doesn't exist then an error message returned to the user that a auth token is required
