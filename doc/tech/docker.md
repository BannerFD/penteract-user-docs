---
path: docker-for-5dpent
---

# Introduction to Docker

A good way to think about a Docker container is running a little operating
system that only runs one application. Using many Docker containers you can
run many processes that all talk to each other. For instance, you can run
one docker container for postgresql one docker container for rabbit mq and
one docker container for chrome if you so choose.

# How We Use Docker

We use docker to as the fundamental building blocks of everything we build.
Each services is turned into a Docker container that can communicate with
other containers.

# How to Get Setup Locally

Each service has different requirements on what it needs to communicate with,
but generally most services require a Postgresql Database and Rabbit MQ
connection so in this guide we'll look at how to set up each of those.

## Postgresql Docker Image

### Start a Postgresql Database in a Docker Container

```
docker run --rm -d --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 9543:5432 postgres
```

The `docker run` command runs a container with a set of parameters. In this case
the base command is `docker run postgres` and everything else is an argument.
`docker run postgres` tells docker to run the postgres image (think of an image
like an operating system). If the postgres image is already installed on the
computer docker will use that image, otherwise it will go to the default
registry ([dockerhub](https://hub.docker.com/)) to get the image. The image is
then run in as a sandboxed process by docker.

Let's now take a look at the arguments we pass to the docker run command. `--rm`
tells docker to delete the container when the process is stopped. This is
important because a containers name must be unique so if we stopped this
container and then tried to create a new one there would be a conflict and the
container would not start. The next param `-d` indicates the container is
running in daemon mode so any message to stdout will not be logged to the
console. Instead of `-d` you can specifiy `-it` which will log stdin and stdout
to the console. The `--name some-postgres` indicates the name of the container
running postgres. This will be helpful in our next command when we want to
connect a client to the container. If you do not specifiy a name one will be
automatically generated. `-e POSTGRES_PASSWORD=mysecretpassword` specifies an
environment variable. The postgres image accepts a number of environment
variables the password is th only one we need to worry about though. The last
parameter `-p 9543:5432` indicates that we want to take whatever is running on
port 9543 in the container and bind that to port 5432 on our host machine.

Now a postgres instance will be accessible on our host machine on port 5432 if
you have a postgres client (psql or something) you can connect to it. If you do
not have a postgres client you can use a docker image instead.

### Connecting to a Postgres Container

```
docker exec -it some-postgres psql -U postgres
```

The docker exec command tells docker to execute a command on a currently running
container. some-postgres is the name of the container that we started running in
the previous command so docker knows which container to run the command in.
The command we want to run is `psql -U postgres`. The `-it` flag specifies that
we want access to both stdin and stdout.

### Connecting from an Application

If you have a node application you can use a connection string the same way you
would normally connect to a database. Here is an example using sequelize.

```javascript
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_CONNECTION, {
  dialect: 'postgres'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
```

Now you can pass in the environment variable DB_CONNECTION when you start the
node app.

```
DB_CONNECTION=postgres://postgres:mysecretpassword@localhost:9543/postgres node postgresql.js
```

Here is an example repository with the [source code.](https://gitlab.com/penteract-snippets/postgresql-docker-example)

## Start a Rabbit MQ Docker Container

Rabbit MQ follows much of the same steps as postgresql.

### Starting Rabbit MQ

```
docker run --rm -d --hostname my-rabbit --name some-rabbit -p 5456:5672 rabbitmq:3
```

This command will start a docker container running rabbit mq and bind the rabbit
mq port to 5456.

### Using a Node Application

You can connect to the Rabbit MQ instance using node with the following source
code.

```javascript
'use strict'

const Promise = require('bluebird')
const amqpLib = require('amqplib')

const queueName = 'tasks'


const rabbitPromise = amqpLib
  .connect(process.env['AMQP_CREDENTIALS'])
  .then((conn) => {
    return conn.createChannel()
  })
  .tap((ch) => {
    return ch.assertQueue(queueName)
  });

(function consume () {
  rabbitPromise.then((ch) => {
    ch.consume(queueName, (msg) => {
      console.log(`I received a message ${msg.content.toString()}`)
      ch.ack(msg)
    })
  })
}())
```

Now you can start the node application with the environment variable
`AMQP_CREDENTIALS`

```
AMQP_CREDENTIALS=amqp://localhost:5456 node consumer.js
```

The source code for this example is available [here](https://gitlab.com/penteract-snippets/rabbit-mq-example)
