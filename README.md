# User FollowUp API

A Node.js backend application for managing user profiles and follow-up data.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up MongoDB and connect.
4. Run the server with `node server.js`.

## Endpoints

- `POST /user` - Create a new user.
- `GET /user/:user_id` - Get user by ID.
- `POST /followup` - Create a new follow-up.
- `GET /followup/:user_id` - Get follow-ups for a user.
- `GET /users-with-followups` - Get all users with their follow-up data.
