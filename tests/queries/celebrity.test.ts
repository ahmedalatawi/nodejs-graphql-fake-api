import { prismaTest } from "../../setupTests";
import { normalizeName } from "../../src/util/functions";
import { celebrities, celebrity, createCelebrity } from "../graphql";
import { constructTestServer } from "../testServer";

const celebrityMock1 = {
  name: "Alex",
  bio: "My name is Alex",
  dateOfBirth: "1980-01-01",
  photoUrl: "alex-photo-url",
};

const celebrityMock2 = {
  name: "Mike",
  bio: "My name is Mike",
  dateOfBirth: "1980-02-02",
  photoUrl: "mike-photo-url",
  editable: false,
};

describe("celebrity", () => {
  test("retrieves celebrity successfully", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    await server.executeOperation({
      query: createCelebrity,
      variables: {
        celebrity: celebrityMock1,
      },
    });

    const savedCelebrity = await prismaTest.celebrity.findUnique({
      where: {
        name: normalizeName(celebrityMock1.name),
      },
    });

    const res = await server.executeOperation({
      query: celebrity,
      variables: {
        id: savedCelebrity?.id,
      },
    });

    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "celebrity": {
            "bio": "My name is Alex",
            "dateOfBirth": 1980-01-01T00:00:00.000Z,
            "editable": true,
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

describe("celebrities", () => {
  test("retrieves all celebrities successfully", async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    await server.executeOperation({
      query: createCelebrity,
      variables: {
        celebrity: celebrityMock2,
      },
    });

    const res = await server.executeOperation({
      query: celebrities,
    });

    expect(res.data?.celebrities).toEqual([
      {
        bio: "My name is Alex",
        dateOfBirth: res.data?.celebrities[0].dateOfBirth,
        name: "alex",
        photoUrl: "alex-photo-url",
        editable: true,
      },
      {
        bio: "My name is Mike",
        dateOfBirth: res.data?.celebrities[1].dateOfBirth,
        name: "mike",
        photoUrl: "mike-photo-url",
        editable: false,
      },
    ]);
  });
});
