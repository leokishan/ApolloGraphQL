import { ApplicationContext } from "..";
import prisma from "../config/prismaClient";
import { throwError } from "../utils/throwError";
import {
  Resolver,
  MovieResponse,
  QueryGetMovieArgs,
  MutationCreateMovieArgs,
  MutationUpdateMovieArgs,
  MutationDeleteMovieArgs,
  PaginatedMovieList,
  QueryListMoviesArgs,
  SortingMovieFields,
} from "../__generated__/graph-types";

const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE);

const listMovies: Resolver<PaginatedMovieList> = async (
  _,
  {
    filter,
    pagination = { pageNumber: 1, pageSize: defaultPageSize },
    sort = { field: SortingMovieFields.Id, isAscending: true },
  }: QueryListMoviesArgs
) => {
  // Initialize filtering varaibles and validate inputs.
  const { pageNumber = 1, pageSize = defaultPageSize } = pagination;
  const { field = SortingMovieFields.Id, isAscending = true } = sort;
  if (pageNumber < 1 || pageSize < 1)
    throwError("Page number and page size should be greater than zero.", 400);

  const queryObject = { include: { user: true } };
  queryObject["take"] = pageSize;
  queryObject["skip"] = (pageNumber - 1) * queryObject["take"];
  queryObject["orderBy"] = {
    [field]: isAscending ? "asc" : "desc",
  };
  if (filter && Object.keys(filter).length > 0) {
    queryObject["where"] = {};
    if (filter["searchTerm"]) {
      queryObject["where"]["OR"] = [
        { movieName: { contains: filter["searchTerm"] } },
        { description: { contains: filter["searchTerm"] } },
      ];
      delete filter["searchTerm"];
    }
    Object.keys(filter).forEach((key) => {
      queryObject["where"][key] = { contains: filter[key] };
    });
  }

  try {
    const movieList = await prisma.movie.findMany(queryObject);
    const movieCount = await prisma.movie.count({
      where: queryObject["where"],
    });

    return {
      movies: movieList,
      meta: {
        pageSize,
        totalPages: Math.ceil(movieCount / pageSize),
      },
    };
  } catch (error) {
    console.error(error);
    throwError("Something went wrong, please try again later.", 500);
  }
};

const getMovie: Resolver<MovieResponse> = (_, args: QueryGetMovieArgs) => {
  return prisma.movie
    .findUnique({
      where: { id: args.id },
      include: { user: true },
    })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
      return null;
    });
};

const createMovie: Resolver<MovieResponse> = (
  _,
  { movie }: MutationCreateMovieArgs,
  context: ApplicationContext
) => {
  return prisma.movie
    .create({
      data: {
        movieName: movie.movieName,
        description: movie.description,
        directorName: movie.directorName,
        releaseDate: movie.releaseDate,
        userId: context.user.id,
      },
      include: { user: true },
    })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
      return null;
    });
};

const updateMovie: Resolver<MovieResponse> = async (
  _,
  { id, movie }: MutationUpdateMovieArgs,
  context: ApplicationContext
) => {
  // Validate if review id is valid and it was created by current user or not
  const existingMovie = await prisma.movie.findUnique({ where: { id } });
  if (!existingMovie) throwError("No movie found to edit.", 400);
  if (existingMovie.userId !== context.user.id)
    throwError("Cannot edit movie which is not created by you.", 401);

  return prisma.movie
    .update({
      where: { id },
      data: movie,
      include: { user: true },
    })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
      return null;
    });
};

const deleteMovie: Resolver<MovieResponse> = async (
  _,
  { id }: MutationDeleteMovieArgs,
  context: ApplicationContext
) => {
  // Validate if review id is valid and it was created by current user or not
  const existingMovie = await prisma.movie.findUnique({ where: { id } });
  if (!existingMovie) throwError("No movie found to delete.", 400);
  if (existingMovie.userId !== context.user.id)
    throwError("Cannot delete movie which is not created by you.", 401);

  return prisma.movie
    .delete({ where: { id }, include: { user: true } })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
      return null;
    });
};

export const MovieResolver = {
  query: { listMovies, getMovie },
  mutation: { createMovie, updateMovie, deleteMovie },
};
