-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "movieName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "directorName" VARCHAR(255) NOT NULL,
    "releaseDate" DATE NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "movie_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "review_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_id_uindex" ON "movie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_name_uindex" ON "movie"("movieName");

-- CreateIndex
CREATE UNIQUE INDEX "review_id_uindex" ON "review"("id");

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
