### Routes — Request Routing Layer
Routes determine where an incoming HTTP request should be sent.
They answer the question:
Which controller should handle this HTTP method + URL?

Responsibilities:
- Match the HTTP method (GET, POST, etc.)
- Match the request URL
- Forward the request to the appropriate controller
- Avoid business logic and direct data access