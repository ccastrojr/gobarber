# Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3333](http://localhost:3333) to view it in the browser.

# Used technologies (backend):

Docker to containerization

* Dependecies:
  - Express (Used to build the wep application)
  - JSONWebToken (Generate Token)
  - Nodemailer (Send e-mails)
  - PG (Work with postgres in node)
  - Sequelize (ORM to sql commands)
  - Sentry (Debug online)
  - bcryptjs (Encrypt password)
  - Bee-queue (Tool to increase queue performance)
  - Date-fns (Work with date types)
  - Dotenv (Pattern from .env)
  - Youch (Catch async errors)
  - Yup (Verify and validate input datas)
  - Handlebars (To build templates)

* Development Dependecies:
  - EsLint, Prettier (code pattern)
  - Nodemon (restart automally server)
  - Sucrase (To use import/from rather than const/require of CommonJS)
  - Sequelize-Cli (Command Line Interface from Sequelize)

* Databases:
  - PostgreSQL, MongoDB, Redis
