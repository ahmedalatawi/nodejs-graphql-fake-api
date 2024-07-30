import { prismaTest } from "../../setupTests";
import { normalizeName } from "../../src/util/functions";
import {
  createCelebrity,
  deleteAllCelebrities,
  deleteCelebrity,
  updateCelebrity,
} from "../graphql";
import { constructTestServer } from "../testServer";

const celebrityMock = {
  name: "Alex",
  bio: "My name is Alex",
  dateOfBirth: "1980-01-01",
  photoUrl: "alex-photo-url",
};

const updatedCelebrityMock = {
  name: "Mike",
  bio: "My name is Mike",
  dateOfBirth: "1980-02-02",
  photoUrl: "mike-photo-url",
};

describe("createCelebrity", () => {
  test("creates celebrity successfully", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    const res: any = await server.executeOperation({
      query: createCelebrity,
      variables: {
        celebrity: celebrityMock,
      },
    });

    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "createCelebrity": {
            "bio": "My name is Alex",
            "dateOfBirth": 1980-01-01T00:00:00.000Z,
            "name": "alex",
            "photoUrl": "alex-photo-url",
          },
        },
        "errors": undefined,
        "extensions": undefined,
        "http": {
          "headers": Headers {
            Symbol(map): {},
          },
        },
      }
    `);
  });

  test("fail when name already exists", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    const res: any = await server.executeOperation({
      query: createCelebrity,
      variables: {
        celebrity: celebrityMock,
      },
    });

    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "createCelebrity": null,
        },
        "errors": [
          [GraphQLError: Name already exists! Try adding another celebrity.],
        ],
        "extensions": undefined,
        "http": {
          "headers": Headers {
            Symbol(map): {},
          },
        },
      }
    `);
  });
});

describe("updateCelebrity", () => {
  test("update celebrity successfully", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    const savedCelebrity = await prismaTest.celebrity.findUnique({
      where: {
        name: normalizeName(celebrityMock.name),
      },
    });

    const res: any = await server.executeOperation({
      query: updateCelebrity,
      variables: {
        celebrity: { id: savedCelebrity?.id, ...updatedCelebrityMock },
      },
    });

    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "updateCelebrity": {
            "bio": "My name is Mike",
            "dateOfBirth": 1980-02-02T00:00:00.000Z,
            "name": "mike",
            "photoUrl": "mike-photo-url",
          },
        },
        "errors": undefined,
        "extensions": undefined,
        "http": {
          "headers": Headers {
            Symbol(map): {},
          },
        },
      }
    `);
  });

  test("fail when ID is missing", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    const res: any = await server.executeOperation({
      query: updateCelebrity,
      variables: {
        celebrity: { ...celebrityMock },
      },
    });

    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "updateCelebrity": null,
        },
        "errors": [
          [GraphQLError: Celebrity ID is required to update a celebrity.],
        ],
        "extensions": undefined,
        "http": {
          "headers": Headers {
            Symbol(map): {},
          },
        },
      }
    `);
  });

  test("fail when ID is not found", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    const savedCelebrity = await prismaTest.celebrity.findUnique({
      where: {
        name: normalizeName(updatedCelebrityMock.name),
      },
    });

    const id = savedCelebrity?.id.slice(0, -1) + "1";

    const res: any = await server.executeOperation({
      query: updateCelebrity,
      variables: {
        celebrity: {
          id,
          ...celebrityMock,
        },
      },
    });

    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "updateCelebrity": null,
        },
        "errors": [
          [GraphQLError: Celebrity ID: ${id} not found.],
        ],
        "extensions": undefined,
        "http": {
          "headers": Headers {
            Symbol(map): {},
          },
        },
      }
    `);
  });

  test("fail when name already exists", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    const savedCelebrity1 = await prismaTest.celebrity.findUnique({
      where: {
        name: normalizeName(updatedCelebrityMock.name),
      },
    });

    await server.executeOperation({
      query: createCelebrity,
      variables: {
        celebrity: { ...celebrityMock, name: "Paul" },
      },
    });

    const savedCelebrity2 = await prismaTest.celebrity.findUnique({
      where: {
        name: "paul",
      },
    });

    const name = savedCelebrity2?.name;

    const res: any = await server.executeOperation({
      query: updateCelebrity,
      variables: {
        celebrity: {
          id: savedCelebrity1?.id,
          ...celebrityMock,
          name,
        },
      },
    });

    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "updateCelebrity": null,
        },
        "errors": [
          [GraphQLError: Name: ${name} already exists! Try another name.],
        ],
        "extensions": undefined,
        "http": {
          "headers": Headers {
            Symbol(map): {},
          },
        },
      }
    `);
  });
});

describe("deleteCelebrity", () => {
  test("delete celebrity successfully", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    const savedCelebrity = await prismaTest.celebrity.findUnique({
      where: {
        name: normalizeName(updatedCelebrityMock.name),
      },
    });

    expect(savedCelebrity).toBeTruthy();

    const res: any = await server.executeOperation({
      query: deleteCelebrity,
      variables: {
        id: savedCelebrity?.id,
      },
    });

    const deletedCelebrity = await prismaTest.celebrity.findUnique({
      where: {
        name: normalizeName(updatedCelebrityMock.name),
      },
    });

    expect(deletedCelebrity).toBe(null);

    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "deleteCelebrity": {
            "bio": "My name is Mike",
            "dateOfBirth": 1980-02-02T00:00:00.000Z,
            "name": "mike",
            "photoUrl": "mike-photo-url",
          },
        },
        "errors": undefined,
        "extensions": undefined,
        "http": {
          "headers": Headers {
            Symbol(map): {},
          },
        },
      }
    `);
  });
});

describe("deleteAllCelebrities", () => {
  test("delete all celebrities successfully", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    await server.executeOperation({
      query: createCelebrity,
      variables: {
        celebrity: celebrityMock,
      },
    });

    await server.executeOperation({
      query: createCelebrity,
      variables: {
        celebrity: { ...celebrityMock, name: "Mike" },
      },
    });

    const savedCelebrity1 = await prismaTest.celebrity.findUnique({
      where: {
        name: normalizeName(celebrityMock.name),
      },
    });

    const savedCelebrity2 = await prismaTest.celebrity.findUnique({
      where: {
        name: "mike",
      },
    });

    expect(savedCelebrity1).toBeTruthy();
    expect(savedCelebrity2).toBeTruthy();

    await server.executeOperation({
      query: deleteAllCelebrities,
    });

    const deletedCelebrity1 = await prismaTest.celebrity.findUnique({
      where: {
        name: normalizeName(celebrityMock.name),
      },
    });

    const deletedCelebrity2 = await prismaTest.celebrity.findUnique({
      where: {
        name: "mike",
      },
    });

    expect(deletedCelebrity1).toBe(null);
    expect(deletedCelebrity2).toBe(null);
  });
});
