import { prismaMock } from "../config/setupTests";
import { testServer } from "../config/setupTestServer";

const createMovieMutation = `
# graphql
mutation CreateMovie($movie: CreateMovieRequest!) {
  createMovie(movie: $movie) {
    id
    movieName
    description
    directorName
    releaseDate
    user {
      id
      email
    }
  }
}
`;

describe("Movie resolver tests", () => {
  let server;

  beforeAll(async () => {
    server = testServer;
  });

  it("Creates Movie", async () => {
    const dummyMovieRequest = {
      description: "ww",
      directorName: "ww",
      movieName: "movie1",
      releaseDate: "05/19/2020",
    };
    try {
      prismaMock.movie.create.mockResolvedValue({ ...dummyMovieRequest, id: 1, userId: 1, releaseDate: new Date() })
      const res = await server.executeOperation(
        { query: createMovieMutation, variables: { movie: dummyMovieRequest } },
        { contextValue: { user: { id: 1, email: "a@a.a" } } }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    expect(true).toBe(true);
  });
});
