import { Context } from "./context";
import { Celebrity } from "../src/util/types";

export async function createUser(celebrity: Celebrity, ctx: Context) {
  return await ctx.prisma.celebrity.create({
    data: celebrity,
  });
}
