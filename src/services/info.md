### Services — Business Logic Layer
Services contain the core business logic of the application.
Ideally, a service does not care where a command came from — an HTTP request, a background job, or another part of the application. The business rules remain the same.
For example:
A withdrawal cannot be completed if the wallet has insufficient funds.

This rule belongs to the service and should not depend on HTTP-specific concepts such as response.statusCode.
Responsibilities:
- Apply business rules
- Validate business conditions
- Coordinate operations between repositories
- Request data changes through repositories
- Return results or throw/report business errors

####  Services should not:
- Work with request, response, headers, or HTTP status codes
- Access the data source directly
- Modify stored data directly — all data access and mutations go through repositories