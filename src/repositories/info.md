### Repositories — Data Access Layer
Repositories handle access to and modification of application data.
Responsibilities:
- Read data
- Create, update, or delete data
- Hide storage implementation details from the rest of the application
  The rest of the application should not need to know where or how the data is stored — whether it is an in-memory array, PostgreSQL, or accessed through another technology.