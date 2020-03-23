# gobarber

GoBarber it's a manager app for barber shops where you can register clients and providers from your hair and beauty business. Beside that's, you can to manage appointments for your providers, see all schedules availiable that your clients has to book some appointment with him and more.

This application use a RESTFul API backend.

To inicialize the project with your machine, just download and run 'yarn' or 'npm install' in the project path to linking all dependencies.

* Use 'yarn dev' to run the project. 

# Functionalities
  - Create users and login to application (here I used a jwt to authentication)
  - List providers
  - Create, List and Delete appointments
  - List Schedule from provider
  - Create notifications in the appointments register
  - Send e-mails to provider when any appointment was canceled.
  - List available hours from same provider
  - Register an image from user
  - Mark and cancel some appointment

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
