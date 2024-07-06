//@ts-nocheck
import { server, prisma } from "../api/index";
import { startStandaloneServer } from "@apollo/server/standalone";
//const { MongoClient } = require("mongodb");

import { MongoClient } from "mongodb";

type Config = { db: any; url: string };

jest.useFakeTimers();

export const getConfig = () => {
  let config = {};
  let connection = null;
  let db = null;

  // beforeAll(async () => {
  //   connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   db = await connection.db(globalThis.__MONGO_DB_NAME__);

  //   config.db = db;
  //   return config;
  // });

  // afterAll(async () => {
  //   await connection.close();
  // });

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 0 },
    });

    db = await connection.db(globalThis.__MONGO_DB_NAME__);

    // console.log("url: ", url);
    config = { db, url };
    return config;
  });

  afterAll(async () => {
    await connection.close();
    await server.stop();
    return prisma.$disconnect();
  });

  return config as Config;
};
