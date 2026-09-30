# CodeFolio — Developer Portfolio Builder

Build, customize, and publish a professional developer portfolio with **CodeFolio**. Create a portfolio, choose a template, manage your projects and profile information, and share a public portfolio URL.

**Live Application:** https://codefolio-web-ey1g.onrender.com

**Backend API:** https://codefolio-app.onrender.com

---

## Table of Contents

* Overview
* Live Links
* Features
* Technology Stack
* Architecture
* Getting Started
* Environment Variables
* Running Locally
* API and Deployment Notes
* Security Notes
* Testing Checklist
* Roadmap
* Contributing
* License
* Author

---

## 1. Overview

CodeFolio is a web-based portfolio builder designed for developers who want to create and publish their professional portfolios without building every portfolio page from scratch.

The application provides a dashboard for managing portfolio content, customizable templates, public portfolio URLs, and a contact form for visitors.

The project uses React for the frontend, Node.js and Express.js for the backend, and MongoDB for persistent data storage.

## 2. Live Links

| Resource      | URL                                               |
| ------------- | ------------------------------------------------- |
| Live Frontend | https://codefolio-web-ey1g.onrender.com           |
| Backend API   | https://codefolio-app.onrender.com                |
| Login API     | https://codefolio-app.onrender.com/api/auth/login |

The backend API root provides a service status response. Individual API endpoints may require authentication and specific HTTP methods.

## 3. Features

### Authentication and Dashboard

* User signup and login.
* Dashboard access after successful authentication.
* Dashboard continues working after page refresh.
* Portfolio management through the dashboard.

### Portfolio Management

* Create new portfolios.
* Edit existing portfolio information.
* Delete portfolios.
* Publish public portfolio pages.
* Share public portfolio URLs.
* Access public portfolios without signing in.

### Dynamic Template System

* Choose from available portfolio templates.
* Customize portfolio presentation.
* Display template changes on the public portfolio page.

### Contact Form

* Visitors can submit messages through public portfolio pages.
* Email integration using the Resend API.
* Configurable sender and recipient email settings.

**Note:** Production email delivery to arbitrary recipients requires an appropriately verified sending domain and sender address in Resend.

### Responsive Design

* Responsive user interface for desktop and mobile devices.
* Portfolio pages designed for sharing with recruiters and potential clients.

### Free and Pro Features

* Free and Pro access concepts.
* Premium template and feature restrictions.
* Pro-only functionality should be protected through backend authorization, not just frontend visibility.

## 4. Technology Stack

| Layer             | Technology    |
| ----------------- | ------------- |
| Frontend          | React.js      |
| Backend           | Node.js       |
| Backend Framework | Express.js    |
| Database          | MongoDB       |
| Cloud Database    | MongoDB Atlas |
| Email Service     | Resend API    |
| Hosting           | Render        |
| Communication     | REST API      |

## 5. System Architecture

```text
                 Users and Visitors
                         |
                         v
                React Frontend
                     Render
                         |
                    HTTPS / REST
                         |
                         v
                Node.js + Express
                     Render
                    /        \
                   /          \
                  v            v
            MongoDB Atlas   Resend API
            Portfolio Data  Contact Emails
```

### Request Flow

1. The user interacts with the React frontend.
2. The frontend sends an HTTP request to the backend API.
3. Express processes the request and validates the input.
4. Authentication and authorization are checked for protected operations.
5. MongoDB stores or retrieves application data.
6. For contact-form submissions, the backend uses Resend to send emails.

## 6. Getting Started

### Prerequisites

Install the following tools:

* Node.js
* npm
* MongoDB Atlas account or another MongoDB instance
* Git
* Resend account, if testing email functionality

### Clone the Repository

Replace the placeholder with your actual GitHub repository URL.

```bash
git clone https://github.com/rs7556605-stack/CodeFolio.git
cd <YOUR_PROJECT_FOLDER>
```

### Install Dependencies

Run the following command inside the frontend directory:

```bash
npm install
```

Run it separately inside the backend directory:

```bash
npm install
```

If the frontend and backend are located in separate repositories, clone and configure each repository separately.

## 7. Environment Variables

Create a `.env` file in the backend directory and configure the environment variables required by your application.

Example variable names:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender_email
CONTACT_TEST_EMAIL=your_test_recipient_email
```

These are example names. Confirm the exact variable names used in your backend source code before configuring them.

### Security Warning

* Never commit `.env` files to GitHub.
* Never expose database credentials or API keys in frontend code.
* Store production secrets in Render's environment settings.
* If a secret is accidentally published, revoke or rotate it.

### Resend Email Configuration

For production email delivery:

1. Use a domain you own.
2. Add and verify that domain in Resend.
3. Configure the DNS records requested by Resend.
4. Set `RESEND_FROM_EMAIL` to an address on the verified domain.
5. Add the Resend API key to the backend environment settings on Render.
6. Test email delivery to an external recipient you control.

The Resend testing sender, such as `onboarding@resend.dev`, is restricted and should not be treated as a production sender for arbitrary recipients.

## 8. Running Locally

### Start the Backend

Open a terminal in the backend directory:

```bash
npm run dev
```

If your project uses a different development script, use the command defined in its `package.json`.

### Start the Frontend

Open another terminal in the frontend directory:

```bash
npm start
```

The frontend and backend should run using the local configuration defined in your project.

Ensure the frontend API configuration points to the correct backend URL for the environment you are using.

## 9. API and Deployment Notes

### Production URLs

Frontend:

https://codefolio-web-ey1g.onrender.com

Backend:

https://codefolio-app.onrender.com

### Authentication Endpoint

```text
POST /api/auth/login
```

Full URL:

```text
https://codefolio-app.onrender.com/api/auth/login
```

The login endpoint returned HTTP 200 during the reported production test.

A browser `OPTIONS` request with status `204 No Content` can be a normal CORS preflight request. When debugging login, inspect the actual `POST` request as well.

For production, ensure that the frontend API configuration uses the deployed backend URL rather than `localhost`.

## 10. Security Notes

Before using CodeFolio with real users, verify the following:

* Passwords are securely hashed before storage.
* Protected API routes validate authentication tokens.
* Users cannot modify another user's private portfolio.
* Free and Pro permissions are enforced on the backend.
* Input validation is implemented on sensitive endpoints.
* Error responses do not expose secrets or stack traces.
* CORS is configured for the intended origins.
* Database credentials and API keys remain private.
* Contact-form submissions have appropriate validation and abuse protection.
* Public portfolio pages expose only information intended to be public.

These are security recommendations and have not been independently verified through a formal security audit.

## 11. Testing Checklist

The following production tests have been reported as passing:

* [x] Login and signup
* [x] Dashboard opens after login
* [x] Dashboard continues working after refresh
* [x] Portfolio creation
* [x] Portfolio editing
* [x] Portfolio deletion
* [x] Public portfolio opens in an incognito window
* [x] Template changes appear on the public portfolio
* [x] Contact-form submission and email receipt
* [x] Mobile responsiveness

### Additional Recommended Tests

* [x] Verify production email delivery to a recipient other than the Resend account owner.
* [ ] Verify Free and Pro authorization on backend endpoints.
* [ ] Test unauthorized access to another user's portfolio.
* [ ] Create two polished demo portfolios.
* [ ] Add application screenshots.
* [ ] Confirm setup commands match the actual repository structure.
* [ ] Verify no secrets are committed to GitHub.

## 12. Roadmap

* [ ] Finalize two demo portfolio profiles.
* [ ] Add screenshots and a product walkthrough.
* [ ] Complete the system design document.
* [ ] Complete production email domain verification.
* [ ] Perform a final security review.
* [ ] Add automated tests for authentication and portfolio operations.
* [ ] Improve project documentation.

## 13. Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a new branch for your changes.
3. Implement and test your changes.
4. Open a pull request with a description of your updates.

Before submitting changes, ensure that no secrets or private configuration files are included.

## 14. License

No license has been specified yet.

Add a `LICENSE` file to the repository and update this section before allowing others to reuse, modify, or distribute the project.

## 15. Author

**Rupak Singh**

Project: **CodeFolio — Developer Portfolio Builder**

Live Application: https://codefolio-web-ey1g.onrender.com

Backend API: https://codefolio-app.onrender.com
