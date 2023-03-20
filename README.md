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
