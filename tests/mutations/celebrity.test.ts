import { prismaTest } from "../../setupTests";
import { createCelebrity } from "../graphql";
import { constructTestServer } from "../testServer";

describe("createCelebrity", () => {
  test("creates celebrity successfully", async () => {
    const celebrity = {
      name: "Alex",
      bio: "My name is Alex",
      dateOfBirth: "1980-01-01",
      photoUrl: "alex-photo-url",
    };

    const { server } = constructTestServer({
      context: () => ({ prisma: prismaTest }),
    });

    const res: any = await server.executeOperation({
      query: createCelebrity,
      variables: {
        celebrity: celebrity,
      },
    });

    console.log(res.data.createCelebrity.name);

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
