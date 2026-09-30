# CodeFolio — Developer Portfolio Builder

CodeFolio is a web-based portfolio builder that allows developers to create, manage, and publish professional portfolio websites. Users can manage their profile, projects, skills, and portfolio templates through a dashboard.

## Live Demo

* **Frontend:** https://codefolio-web-ey1g.onrender.com
* **Backend:** https://codefolio-app.onrender.com
* **GitHub Repository:** https://github.com/rs7556605-stack/CodeFolio

> Note: The live application may take a little time to respond if the hosting service has put it to sleep.

## Project Overview

Creating a professional portfolio website can require web development knowledge, coding skills, and time. CodeFolio aims to simplify this process by providing a dashboard for managing portfolio content and displaying it through selectable templates.

The project focuses on authentication, content management, CRUD operations, dynamic template rendering, and public portfolio pages.

## Key Features

* **User Authentication:** User registration and login with JWT-based authentication.
* **Profile Management:** Create and update portfolio profile information.
* **Project Management:** Add, edit, display, and delete projects.
* **Skills Management:** Manage technical skills and skill categories.
* **Dynamic Templates:** Display portfolio content using selectable templates.
* **Public Portfolio:** Publish portfolio content through a username-based URL.
* **Dashboard:** Manage portfolio information from a centralized interface.
* **Responsive Interface:** Support desktop, tablet, and mobile layouts.
* **Protected API Routes:** Require authentication for protected operations.
* **Contact Form:** Includes a contact feature intended to send messages to the portfolio owner. Production contact-flow verification is still pending.

## Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router

### Backend

* Node.js
* Express.js
* REST API
* JSON Web Token (JWT)

### Database

* MongoDB
* MongoDB Atlas

### Email Integration

* Resend API

### Deployment

* Render

## System Architecture

CodeFolio follows a client-server architecture.

1. The user interacts with the React frontend.
2. The frontend sends HTTP requests to the Express.js backend.
3. Authentication middleware validates JWTs for protected endpoints.
4. The backend processes requests and interacts with MongoDB when required.
5. The frontend displays the returned data in the dashboard or public portfolio.

```text
User
  |
  v
React Frontend
  |
  | HTTP / REST API
  v
Node.js + Express Backend
  |
  +------ Authentication Middleware
  |
  +------ Controllers and Routes
  |
  v
MongoDB Atlas

Public Visitor
  |
  v
Username-Based Portfolio Page
  |
  v
Selected Portfolio Template
```

## Main Modules

### 1. Authentication Module

* User registration and login.
* JWT-based authentication.
* Protected dashboard and API access.

### 2. Profile CMS

* Fetch profile information.
* Update portfolio profile details.
* Display profile information on the portfolio page.

### 3. Project Management

* Create projects.
* Fetch saved projects.
* Edit project information.
* Delete projects.

### 4. Skills Management

* Add and retrieve skills.
* Update skill information.
* Delete skills.
* Organize skills using categories where supported by the interface.

### 5. Portfolio Template System

* Select a portfolio template.
* Map user portfolio data to the selected template.
* Display portfolio information on a public username-based route.

### 6. Dashboard

* Centralized portfolio management.
* Profile, projects, and skills management.
* Access to available portfolio features.

## Security Measures

* JWT-based authentication for protected operations.
* Authentication middleware for validating access tokens.
* Unauthorized requests are rejected.
* Backend access checks help prevent users from modifying another user's projects.
* Sensitive configuration values are stored in environment variables rather than intentionally exposed in frontend source code.

**Security note:** These describe implemented and tested behaviors, not a complete independent security audit. JWT logout currently removes the token from browser storage; this does not automatically revoke an already-issued token on the server.

## Environment Configuration

Configure the required environment variables in your local backend environment. Use the actual variable names expected by the server code.

Typical configuration categories include:

* MongoDB connection string.
* JWT secret.
* Frontend origin allowlist for CORS.
* Resend API key.
* Verified sender email address for outgoing messages.
* Optional contact-test recipient email.

Create a `.env` file in the appropriate backend directory and add the values required by your implementation.

**Important:** Never commit `.env` files, API keys, database credentials, or JWT secrets to GitHub. Add secret files to `.gitignore`.

## Local Development Setup

### Prerequisites

* Node.js and npm.
* MongoDB Atlas account or another supported MongoDB instance.
* Git.

### 1. Clone the repository

```bash
git clone https://github.com/rs7556605-stack/CodeFolio.git
cd CodeFolio
```

### 2. Install dependencies

Install dependencies in the frontend and backend directories according to the repository structure.

```bash
cd client
npm install
```

Then install backend dependencies:

```bash
cd ../server
npm install
```

> If your actual folder names or `package.json` locations differ, adjust these commands to match the repository.

### 3. Configure environment variables

Create the backend `.env` file and configure the required database, authentication, CORS, and email settings. Do not publish the values.

### 4. Start the backend

From the backend directory, run the script defined in its `package.json`, for example:

```bash
npm start
```

### 5. Start the frontend

Open a separate terminal, move to the frontend directory, and run:

```bash
npm start
```

Use the local URLs printed by the development servers.

## Testing and Validation

The following behaviors have been reported as tested during development:

* User registration and login.
* Rejection of an incorrect password.
* Protected dashboard access.
* Profile save and refresh.
* Project creation, editing, persistence, and deletion.
* Skills management.
* Public portfolio rendering.
* Template switching.
* Responsive layouts.
* Rejection of requests with missing or invalid authentication tokens.
* Prevention of tested cross-user project access.

These are development test results, not a claim that every possible scenario has been tested.

## Current Limitations and Future Improvements

* Complete production verification of the contact form, portfolio-owner lookup, and email delivery.
* Implement real subscription and payment processing if premium plans are introduced.
* Add server-side premium feature authorization; current Pro functionality is a demo.
* Complete custom-domain support, including domain ownership verification and SSL setup.
* Expand automated unit, integration, and end-to-end testing.
* Improve error handling, monitoring, and deployment diagnostics.
* Add further portfolio templates and customization options.

## Screenshots

Add genuine screenshots of the running application to a `docs/screenshots/` folder in the repository.

Suggested screenshots:

1. Login and registration page.
2. Dashboard.
3. Profile management form.
4. Project management section.
5. Skills management section.
6. Template selection or preview.
7. Public portfolio page.
8. Mobile-responsive layout.

After adding the screenshots, embed them in this README using relative paths. For example:

```markdown
![CodeFolio Dashboard](docs/screenshots/dashboard.png)
```

Replace the example path with the actual screenshot filename.

## Internship Demonstration Checklist

* Register or log in to the application.
* Open the dashboard.
* Update profile information and refresh to verify persistence.
* Create, edit, and delete a project.
* Add or update skills.
* Select a portfolio template.
* Open the public portfolio URL.
* Demonstrate authentication protection.
* Show the responsive interface.
* Explain the architecture, database, API routes, and future improvements.

## Learning Outcomes

This project provides practical experience with:

* Full-stack web application development.
* React component-based UI development.
* REST API design using Express.js.
* MongoDB data modeling and CRUD operations.
* JWT-based authentication.
* Dynamic template rendering.
* Environment configuration and deployment.
* Debugging and integration testing.

## Author

**Rupak Singh**

Integrated MCA — Pursuing

GitHub: https://github.com/rs7556605-stack

## Project Status

**Status:** Internship project / ongoing development.

Some features, including production-ready contact delivery, real premium authorization, and custom-domain support, require further implementation or verification.
