import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";

let prismaTest: PrismaClient;
let connection: MongoClient;

//@ts-ignore
const MONGO_URI = globalThis.__MONGO_URI__;
//@ts-ignore
const MONGO_DB_NAME = globalThis.__MONGO_DB_NAME__;

const url = `${MONGO_URI.substring(0, MONGO_URI.indexOf("?"))}${MONGO_DB_NAME}`;

beforeAll(async () => {
  prismaTest = new PrismaClient({
    datasources: {
      db: { url },
    },
  });

  connection = await MongoClient.connect(MONGO_URI);

  connection.db(MONGO_DB_NAME);
});

afterAll(async () => {
  await connection?.close();
  await prismaTest?.$disconnect();
});

jest.setTimeout(10000);

export { prismaTest };
