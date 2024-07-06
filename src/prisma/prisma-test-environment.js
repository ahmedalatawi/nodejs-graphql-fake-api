//const NodeEnvironment = require("jest-environment-node");
const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const { MongoClient } = require("mongodb");

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    this.connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = this.connection.db(globalThis.__MONGO_DB_NAME__);

    return super.setup();
  }

  async teardown() {
    await this.connection.close();
  }
}

module.exports = PrismaTestEnvironment;
