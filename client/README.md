# CodeFolio — Portfolio Builder

CodeFolio is a web application that allows users to create, manage, and publish their professional portfolios and resumes. Users can maintain their profile information, showcase projects and skills, and share their public portfolio with others.

## Features

* User registration and login
* JWT-based authentication
* User-specific portfolio and resume data
* Resume Builder with save and update functionality
* Public resume and portfolio pages
* Multiple resume templates
* Profile and project management
* REST API powered by Node.js and Express
* MongoDB database integration
* Responsive web interface

## Tech Stack

**Frontend**

* React
* Vite
* JavaScript
* CSS

**Backend**

* Node.js
* Express.js
* REST API
* JSON Web Token (JWT)

**Database**

* MongoDB
* Mongoose

**Deployment and Tools**

* Git and GitHub
* Render
* Postman
* Visual Studio Code

## Project Structure

```text
CodeFolio/
├── client/          # React frontend
├── server/          # Node.js and Express backend
├── postman/         # API testing resources
└── README.md
```

## Live Demo

* **Frontend:** https://codefolio-web-ey1g.onrender.com
* **Backend API:** https://codefolio-app.onrender.com
* **GitHub Repository:** https://github.com/rs7556605-stack/CodeFolio

## Screenshots

Add screenshots of the following pages:

* Login and Registration
* Dashboard
* Resume Builder
* Resume Template Preview
* Public Portfolio
* Public Resume

Store project screenshots in a folder such as `docs/screenshots/` and link them here after adding the files.

## Prerequisites

Install the following before running CodeFolio locally:

* Node.js and npm
* MongoDB Atlas account or a local MongoDB installation
* Git

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rs7556605-stack/CodeFolio.git
cd CodeFolio
```

### 2. Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory. Add the environment variables required by your backend configuration.

Example variable names — verify them against your actual backend code:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_private_jwt_secret
```

Do not commit real passwords, database credentials, JWT secrets, or API keys.

Start the backend using the script defined in `server/package.json`, for example:

```bash
npm run dev
```

### 3. Configure the Frontend

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env` if required by your Vite configuration:

```env
VITE_API_URL=http://localhost:5000
```

For local development, use the actual backend port configured in your project.

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## API Documentation

The backend exposes REST API endpoints for authentication, user profiles, resumes, and other supported features.

Document the exact routes from the project's `server/routes/` directory.

| Module           | Purpose                                     |
| ---------------- | ------------------------------------------- |
| Authentication   | Registration and login                      |
| User/Profile     | Profile information management              |
| Resume           | Save, retrieve, and update resume data      |
| Public Portfolio | Retrieve public portfolio information       |
| Contact          | Handle contact form submissions, if enabled |

## Testing

* Register a new user.
* Log in and verify authentication.
* Create and save a resume.
* Refresh the page and verify saved data.
* Edit the resume and confirm the changes persist.
* Open the public resume URL.
* Verify that different users see only their own private resume data.
* Test the backend endpoints using Postman.

## Security

* Keep `.env` files and credentials private.
* Use authentication middleware for protected routes.
* Associate private resume data with the authenticated user.
* Configure production environment variables in the deployment dashboard.
* Never expose private credentials in frontend code or GitHub.

## Author

**Rupak Singh**

GitHub: https://github.com/rs7556605-stack

## License

Add a license if you intend to distribute this project under a specific open-source license.
