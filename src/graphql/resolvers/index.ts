import { merge } from "lodash";
import celebrityResolvers from "./celebrities";

const resolvers = merge({}, celebrityResolvers);

export default resolvers;
