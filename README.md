# NodeJS GraphQL Fake API Data Provider

![](https://github.com/AhmedAlatawi/nodejs-graphql-fake-api/actions/workflows/main.yml/badge.svg)

This is a free online **GraphQL API** for providing fake and reliable data for testing and prototyping. It's built with NodeJS, GraphQL, TypeScript, MongoDB and Prisma (see demo documentation [here](https://documenter.getpostman.com/view/35959656/2sA3kdBdBt)).

### [Demo using Postman](https://www.postman.com/altimetry-geoscientist-3938507/workspace/fake-api-data-provider-workspace/collection/35959656-ba1f465c-25fe-412f-875e-bac82c85157c?action=share&creator=35959656) :movie_camera:

## Run app locally

### 1. Clone this repo & set up MongoDB

You'll need to set up a MongoDB that supports replica set operations. For example, you can use MongoDB Atlas, see more details [here](https://www.mongodb.com/docs/atlas/).

Create a `.env` file in the project's root directory, and add the database URL as described in `.env.example` file.

### 2. Install dependencies & run app

Run `yarn` to install Node dependencies, and `yarn prisma generate` to generate **Prisma Client**, then:

### `yarn dev`

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view it in the browser.

The is the GraphQL playground page used for testing locally, where you can also find info about the **Schema**, **Mutations**, **Queries**, etc.
