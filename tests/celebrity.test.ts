import { request } from "graphql-request";
import { createCelebrity } from "./graphql";
import { getConfig } from "./helpers";

const config = getConfig();

it("should insert a doc into collection", async () => {
  const celebrities = config.db.collection("celebrities");

  const celebrity = {
    name: "user 1",
    bio: "u1@g.com",
    dateOfBirth: "user 1",
    photoUrl: "url",
  };

  const data: any = await request(config.url, createCelebrity, celebrity);

  console.log(data);

  const insertedUser = await celebrities.findOne({
    _id: "test-user-id",
  });
  expect(insertedUser).toEqual(celebrity);
});

// test("successfully create a celebrity", async () => {
//   try {
//     const celebrity = {
//       name: "user 1",
//       bio: "u1@g.com",
//       dateOfBirth: "user 1",
//       photoUrl: "url",
//     };
//     const data: any = await request(config.url, createCelebrity, celebrity);

//     expect(data).toHaveProperty("createCelebrity");
//     expect(data.createCelebrity.celebrity.name).toEqual(celebrity.name);
//   } catch (e) {
//     console.log("error", e);
//   }
// });
