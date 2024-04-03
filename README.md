# Mini Twitter Clone

This is a mini Twitter clone application developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, post tweets, follow other users, and view the tweets of the users they have followed.

## Features

- User registration and authentication system with JWT (JSON Web Tokens) for secure authentication.
- Database schema using MongoDB to store user data, tweets, and follower information.
- Create, edit, and delete tweets.
- Follow/Unfollow functionality to connect with other users.
- Timeline view displaying tweets from followed users in chronological order.

## Installation

1. Clone the repository:
https://github.com/GRV2/Twitter-clone.git
2. Change into the project directory:
cd mini-twitter-clone
3. Install the dependencies for the server:
npm install
4. To run the project:
node server.js

Access the application in your web browser at: `http://localhost:3000`

## Server-Side Code

The server-side code is located in the `server` directory. It consists of the following files and folders:

- `server.js`: Entry point for the Express.js server.
- `routes/auth.js`: Handles user registration and authentication routes.
- `routes/users.js`: Defines routes for following/unfollowing users.
- `routes/tweets.js`: Contains routes for creating, editing, and deleting tweets.
- `routes/timeline.js`: Implements the route for retrieving the timeline.
- `models/User.js`: Defines the Mongoose schema for the user data.
- `models/Tweet.js`: Defines the Mongoose schema for tweets.
- `middleware/auth.js`: Middleware for authenticating JWT tokens.

