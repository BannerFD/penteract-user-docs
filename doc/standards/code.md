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

## Express Patterns (Model, Controller, Routers)

When using express create three separate folders for each routes, controllers,
and models. This is essential for people to understand where code is without
familiarity with the particular project. Other filesystem components may be
added at your disgression.

## Notes for Backend Services

All services will be deployed using multiple instances and load balancing. For
this reason all services must be stateless.
