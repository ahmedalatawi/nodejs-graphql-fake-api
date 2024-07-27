import { prismaTest } from "../../setupTests";
import { normalizeName } from "../../src/util/functions";
import { celebrity, createCelebrity } from "../graphql";
import { constructTestServer } from "../testServer";

const celebrityMock1 = {
  name: "Alex",
  bio: "My name is Alex",
  dateOfBirth: "1980-01-01",
  photoUrl: "alex-photo-url",
};

// const celebrityMock2 = {
//   name: "Mike",
//   bio: "My name is Mike",
//   dateOfBirth: "1980-02-02",
//   photoUrl: "mike-photo-url",
// };

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
