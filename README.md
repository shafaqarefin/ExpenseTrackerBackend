
---

## Auth Routes

| Method | Endpoint        | Body                                  | Description                                 |
|--------|----------------|--------------------------------------|---------------------------------------------|
| POST   | `/auth/signup` | `{ "name", "email", "password" }`    | Register a new user                          |
| POST   | `/auth/login`  | `{ "email", "password" }`            | Log in user, returns HTTP-only JWT cookie   |
| POST   | `/auth/logout` | None                                 | Logs out user and clears JWT cookie         |

**Example: Signup**
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
