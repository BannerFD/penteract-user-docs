---
type: Code
---

## Linting

Use [StandardJs](https://standardjs.com/) for linting. It can be installed
straight into your editor, npm scripts, or git pre-hooks and ensure that no git
conflict occur because of inconsistent styles.

## npm Packages

NPM has imporved on package security but we still would like to monitor the
packages that are used in our system. All NPM *excluding* the list below
must be approved before being used in Penteract source code. If you think
a package is missing please contact us.

### Preapproved npm Packages

- Bluebird (promise library)
- Axios (http client)
- Lodash, Ramda (utilities and functional programming)
- Express (Web framework)
- Cors (cors)
- BodyParser (http body parsing)
- Multer (http file parsing)
- Gm (image formatting)
- Joi (Validation library)
- RxJs (observables)
- Sequelize, pghstore,  pg (ORM)
- Winston (logging)

## Express Patterns (Model, Controller, Routers)

When using express create three separate folders for each routes, controllers,
and models. This is essential for people to understand where code is without
familiarity with the particular project. Other filesystem components may be
added at your disgression.

## Notes for Backend Services

All services will be deployed using multiple instances and load balancing. For
this reason all services must be stateless.

## Health Checks

All services should respond to readiness checks and liveness checks.

### Liveness Checks

/health/alive should respond with a status code of 200 when the services is
running. This does not need to check dependencies such as database connections.

### Readiness Checks

/health/ready should respond witha status code of 200 when the service is
running and all dependencies (such as databases and queues) are connected.

## Logging

There is no absolute standard in terms of logging. Pease make sure when the
PRODUCTION environment variable is set to true you log liberally and in json
format. 
