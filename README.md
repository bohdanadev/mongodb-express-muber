# MONGODB-EXPRESS-MUBER

This project is an Express.js API for an Uber clone, allowing users to manage drivers and find drivers located near specific coordinates. It uses MongoDB with Mongoose for data storage and Mocha tests with the Supertest library for testing.

## Getting Started

To set up the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/bohdanadev/mongodb-express-muber.git
```

2. Install dependencies:

```bash
cd mongodb-express-muber

npm install
```

3.  Add a .env file to the root of the project with the following variables:

```dotenv
PORT=
MONGODB_URL=
MONGODB_URL_TEST=
```

4.  Run tests:

```bash
npm run test
```

5.  Run the server:

```bash
npm run start:dev
```

## API Endpoints

| HTTP Method |          Endpoint           |        Description        | JSON Body example                                                                               |
| :---------: | :-------------------------: | :-----------------------: | :---------------------------------------------------------------------------------------------- |
|    POST     |        /api/drivers         |    Create a new driver    | { "email": "test@mail.com", "geometry": { "type": "Point", "coordinates": [-80.253, 25.791] } } |
|     PUT     |      /api/drivers/:id       | Edit a driver's activity  | { "driving": true }                                                                             |
|   DELETE    |      /api/drivers/:id       |   Delete a driver by ID   |                                                                                                 |
|     GET     | /api/drivers?lng=-80&lat=25 | Find drivers located near |                                                                                                 |
