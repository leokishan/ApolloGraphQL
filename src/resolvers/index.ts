import { MutationResolvers, QueryResolvers } from "../__generated__/graph-types"
import { AuthenticationResolver } from "./authenticationResolver"
import { MovieResolver } from "./moviesResolver"
import { ReviewResolver } from "./reviewsResolver"

export const queryResolver: QueryResolvers = {
  ...AuthenticationResolver.query,
  ...MovieResolver.query,
  ...ReviewResolver.query
}

export const mutationResolver: MutationResolvers = {
  ...AuthenticationResolver.mutation,
  ...MovieResolver.mutation,
  ...ReviewResolver.mutation
}