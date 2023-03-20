import { ApplicationContext } from "..";
import prisma from "../config/prismaClient";
import { throwError } from "../utils/throwError";
import {
  MutationCreateReviewArgs,
  MutationDeleteReviewArgs,
  MutationUpdateReviewArgs,
  PaginatedReviewList,
  QueryListReviewsArgs,
  Resolver,
  ReviewResponse,
  SortingReviewFields,
} from "../__generated__/graph-types";

const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE);

const listReviews: Resolver<PaginatedReviewList> = async (
  _,
  {
    movieId,
    filter,
    pagination = { pageNumber: 1, pageSize: defaultPageSize },
    sort = { field: SortingReviewFields.Id, isAscending: true },
  }: QueryListReviewsArgs,
  context: ApplicationContext
) => {
  // Initialize filtering varaibles and validate inputs.
  const { pageNumber = 1, pageSize = defaultPageSize } = pagination;
  const { field = SortingReviewFields.Id, isAscending = true } = sort;
  if (pageNumber < 1 || pageSize < 1)
    throwError("Page number and page size should be greater than zero.", 400);

  // Create query object to fetch reviews as per sorting, pagination and filtering.
  const queryObject = {
    include: { movie: true, user: true },
    where: { movieId },
  };
  queryObject["take"] = pageSize;
  queryObject["skip"] = (pageNumber - 1) * queryObject["take"];
  queryObject["orderBy"] = {
    [field]: isAscending ? "asc" : "desc",
  };
  if (filter && Object.keys(filter).length > 0) {
    Object.keys(filter).forEach((key) => {
      if (key === "rating") {
        queryObject["where"][key] = filter[key];
      } else {
        queryObject["where"][key] = { contains: filter[key] };
      }
    });
  }

  try {
    // Get review count to send in response
    const reviewCount = await prisma.review.count({
      where: queryObject["where"],
    });

    // Get review list for particular movie
    const results = [];

    // If user is logged in fetch its review on page 1 and skip its review on other pages
    if (context?.user?.id) {
      const userReview = await prisma.review.findFirst({
        where: { ...queryObject["where"], userId: context.user.id },
        include: { movie: true, user: true },
      });
      if (userReview) {
        if (queryObject["skip"] == 0) {
          results.push(userReview);
          queryObject["take"] -= 1;
        } else {
          // If we have returned logged in user review in 1st page then in all other pages we have decreament 1 skip count
          queryObject["skip"] -= 1;
        }
      }
      queryObject["where"]["NOT"] = { userId: context.user.id };
    }

    // Get reviews for a movie and send append it in result
    const reviewList = await prisma.review.findMany(queryObject);
    results.push(...reviewList);

    return {
      reviews: results,
      meta: {
        pageSize,
        totalPages: Math.ceil(reviewCount / pageSize),
      },
    };
  } catch (error) {
    console.error(error);
    throwError("Something went wrong, please try again later.", 500);
  }
};

const createReview: Resolver<ReviewResponse> = async (
  _,
  { review }: MutationCreateReviewArgs,
  context: ApplicationContext
) => {
  // Validate if movie to add review for exists or not.
  const existingMovie = await prisma.movie
    .findUnique({
      where: { id: review.movieId },
    })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
    });
  if (!existingMovie) throwError("No movie found to add review.", 400);

  // Validate if user has already provided review for this movie or not
  const existingReview = await prisma.review
    .findFirst({
      where: { movieId: review.movieId, userId: context.user.id },
    })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
    });
  if (existingReview)
    throwError(
      "You have already provided a review for this movie, please update existing review.",
      400
    );

  return prisma.review
    .create({
      data: {
        rating: review.rating,
        comment: review.comment,
        movieId: review.movieId,
        userId: context.user.id,
      },
      include: { movie: true, user: true },
    })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
      return null;
    });
};

const updateReview: Resolver<ReviewResponse> = async (
  _,
  { id, review }: MutationUpdateReviewArgs,
  context: ApplicationContext
) => {
  // Validate if review id is valid and it was created by current user or not
  const existingReview = await prisma.review
    .findUnique({ where: { id } })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
    });
  if (!existingReview) throwError("No review found to edit.", 400);
  if (existingReview && existingReview.userId !== context.user.id)
    throwError("Cannot edit review which is not created by you.", 401);

  return prisma.review
    .update({
      where: { id },
      data: review,
    })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
      return null;
    });
};

const deleteReview: Resolver<ReviewResponse> = async (
  _,
  { id }: MutationDeleteReviewArgs,
  context: ApplicationContext
) => {
  // Validate if review id is valid and it was created by current user or not
  const existingReview = await prisma.review
    .findUnique({ where: { id } })
    .catch((err) => {
      console.error(err);
      throwError("Something went wrong, please try again later.", 500);
    });
  if (!existingReview) throwError("No review found to delete.", 400);

  if (existingReview && existingReview.userId !== context.user.id)
    throwError("Cannot delete review which is not created by you.", 401);

  return prisma.review.delete({ where: { id } }).catch((err) => {
    console.error(err);
    throwError("Something went wrong, please try again later.", 500);
    return null;
  });
};

export const ReviewResolver = {
  query: { listReviews },
  mutation: { createReview, updateReview, deleteReview },
};
