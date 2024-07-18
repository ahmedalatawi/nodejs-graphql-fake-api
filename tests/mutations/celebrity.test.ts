import { prismaTest } from "../../setupTests";
import { normalizeName } from "../../src/util/functions";
import { createCelebrity, deleteCelebrity, updateCelebrity } from "../graphql";
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
