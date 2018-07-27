# Rabbit Viz

Rabbit Viz is a tool for visualizing [RabbitMQ](https://www.rabbitmq.com/) broker defintions. RabbitMQ broker configuration is presented in the form of a json object, which defines virtual hosts, exchanges, queues, policies, and bindings. Rabbit Viz will take this definition json object and generate a visual graph based on the configuration.

**Currently supported definition attributes:**

- vhosts
- policies
- parameters
- queues
- exchanges
- bindings

## Running the project

Running the project is as simple as running

```sh
npm run start
```

or

```sh
yarn start
```

This runs the start script specified in our `package.json`, and will spawn off a server which reloads the page as we save our files. The server runs at [http://localhost:3000](http://localhost:3000), but should be automatically opened for you.

## Creating a production build

To run a production build, just run

```sh
npm run build
```

or

```sh
yarn build
```

This will create an optimized JS and CSS build in ./build/static/js and ./build/static/css respectively.

## Running tests

To run the test suite for this project, just run

```sh
npm test
```

or

```sh
yarn test
```
