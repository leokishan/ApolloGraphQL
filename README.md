# Viral Nation backend task assessment

This assessment consists of an application created with Apollo server and GraphQL with operations:
- SignUp as a User
- Login
- Change Password
- Query a list of all the movies.
- Query a movie with it’s id
- Create a new movie
- Update an existing movie
- Delete a movie
- Query a list of reviews for a movie
- Create a new review
- Update an exiting review of a movie
- Delete a review

And additional functionalities:
- Users should be able to register for and account with email and password. Passwords should be hashed.
- User should be able login in to the API with their email and password and receive a JWT token.
- API should accept JWT tokens in headers to authenticate requests.
- Only authenicated users should be able to perform Create, Update or Delete operations on movies or reviews.
- Users should only be able to modify their movie or review.
- Querying movies and reviews should include sort, filter and pagination.
- Querying a movie should also include search functionality based on movie name or description.
- While querying a review logged in user review should always stay on top.

---
## Note

By default all filtering and searching happens with "contains" operation so intentionally release date is excluded from filtering movies. Various operations can be implemented like equals, not equal, etc. but because of time restrictions those extra operations are skipped for now.

---

## Extra tools used in project
1. **Prisma**: Prisma is used to create models for tables in our application and to perform various database operations with its ORM.
1. **@graphql-tools/load-files and @graphql-tools/merge**: GraphQL schema is kept modular for better understanding and clarity. These 2 libraries are used to merge schema from multiple files and pass it to apollo server.
1. **@graphql-tools/utils**: This library is used to wrap our schema with implementation of custom directives like @protected.
1. **graphql-codegen**: Codegen is used to create typescript types from GraphQL types like input, Query, Mutation, etc.
1. **Bcrypt**: Bcrypt is used for hashing and comparing user passwords.
1. **jsonwebtokens**: This library is used to create and verify JWT tokens in application's authentication workflow.
1. **date-fns**: Date fns is used for parsing and formating date objects in application.
1. **Docker**: Docker was used to generate and test `Dockerfile` for this application.

---

## Testing
I tried to setup jest testcases for the project but I was running into problem while mocking Prisma client with jest and ES6 type imports. I have tried other approaches like using context to provide prisma client like dependency injection but that also didn't work.

I could have used require imports in the project from the start to avoid this problem, but I was not aware of it and at the end I didn't had enough time to refactor whole application with require imports.

I have pushed my intermediate code to `feature/integrationTests` branch for the record. ([Github link to branch](https://github.com/leokishan/ViralNationAssessment/tree/feature/integrationTests))