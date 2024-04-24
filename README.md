# Get Started

You can run both client and server in the root directory.

On the root directory, run:

 ``npm start``

PORT=8080

.env for client


```plaintext
NEXT_PUBLIC_SERVER_URL="http://localhost:8080"
DATABASE_URL="postgres://username:password@localhost:5432/dbName?sslmode=disable"

AUTH0_SECRET='4a6f52a7c22d1cf83bbd1841d303e8fa2a5a266fb36d62045a2ef5eb463f01e0'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://dev-s37xnf0zrmx1bn73.us.auth0.com'
AUTH0_CLIENT_ID='SpxWQTRG8owMUPIkuLfEbUk75EwuPi6K'
AUTH0_CLIENT_SECRET='5-bi48EWjqD-P9sOGwkB8wSUOh-nw9bkL2AOhyEqii8wOPVYiu9yX-o_vQUb5WJi'

AUTH0_AUDIENCE=https://hello-world.example.com
API_SERVER_URL=http://localhost:8080
```

.env for server

```plaintext
DATABASE_URL="postgres://username:password@localhost:5432/dbName?sslmode=disable"

CLIENT_ORIGIN_URL=http://localhost:3000
AUTH0_AUDIENCE=https://hello-world.example.com
AUTH0_DOMAIN=dev-s37xnf0zrmx1bn73.us.auth0.com
```
