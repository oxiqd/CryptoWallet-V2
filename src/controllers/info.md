### Controllers — HTTP Layer
Controllers handle the communication between the client and the application.
Responsibilities:
- Handle request and response
- Set HTTP statusCode
- Set response headers
- Parse and serialize JSON
- Pass data to the appropriate service
- Convert service results or errors into HTTP responses
  Controllers should not:
- Contain business logic, such as deposit or withdrawal rules
- Access repositories or the data layer directly