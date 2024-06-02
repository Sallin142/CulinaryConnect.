
# CulinaryConnect

## Overview

CulinaryConnect is a full-stack application that allows users to create, share, and discover recipes. Developed with a focus on user experience and accessibility, the app features a responsive user interface and a robust backend to handle data efficiently.

## Project Status

**Note:** The application is currently not functional due to server configuration changes, removal of cloud database. Despite this, the repository serves as a comprehensive showcase of the skills and technologies utilized during its development.

## Features

- **User Accounts:** Sign up, log in, and manage user profiles.
- **Recipe Management:** Create, edit, delete, and view recipes.
- **Image Upload:** Upload and display images for recipes.
- **Search and Filter:** Search recipes by name, ingredients, or tags.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - TailwindCSS
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
- **Cloud Services:**
  - Google Cloud Platform (GCP) for image storage
  - Apache HTTP for secure communication
- **Tools:**
  - Docker
  - Postman
  - GitHub Actions

## Repository Structure

The project is organized into two main directories: `client` and `server`, each containing specific functionalities and features.

### Client

- `node_modules/`: Directory for npm packages.
- `public/`: Public assets for the frontend.
- `src/`: Main source directory
  - `app/`: Main application logic.
  - `assets/`: Static assets like images and fonts.
  - `components/`: Reusable React components.
  - `features/`: Features of the application.
  - `hooks/`: Custom React hooks.
  - `pages/`: React components for different pages.
  - `stylesheets/`: CSS stylesheets for the application.
- `App.css`: Global CSS styles.
- `App.js`: Main entry point for the React application.
- `index.js`: JavaScript entry point.
- `.env`: Environment variables.
- `.gitignore`: Specifies files to be ignored by Git.
- `package-lock.json`: Lockfile for npm dependencies.
- `package.json`: Lists dependencies and scripts for the frontend.

### Server

- `bin/`: Contains the scripts to run the server.
- `node_modules/`: Directory for npm packages.
- `public/stylesheets/style.css`: Stylesheets for the application.
- `src/`: Main source directory
  - `middleware/`: Middleware functions for handling requests.
  - `models/`: Database models and schemas.
  - `routes/`: API routes for the application.
  - `tests/`: Test files for backend functionalities.
- `.env`: Environment variables.
- `.gitignore`: Specifies files to be ignored by Git.
- `app.js`: Main entry point for the backend server.
- `package-lock.json`: Lockfile for npm dependencies.
- `package.json`: Lists dependencies and scripts for the backend.

### Database

- MongoDB configuration and seed data files.

### Docker

- `docker-compose.yml`: Configuration file for Docker.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sallin142/culinaryconnect.git
   cd culinaryconnect
   ```

2. **Install dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   cd ..
   ```

3. **Run the application:**
   ```bash
   docker-compose up
   ```

## Setup

To set up the application locally, follow these steps:

1. **Environment Variables:**
   Create a `.env` file in the root directory and populate it with the necessary environment variables. Refer to `.env.example` for required variables.

2. **Database Configuration:**
   Ensure MongoDB is running locally or provide a connection string to a remote MongoDB instance in the `.env` file.

3. **GCP Configuration:**
   Set up Google Cloud Storage and update the `.env` file with your GCP credentials.

## Usage

Once the application is running, you can access the frontend at `http://localhost:3000` and the backend API at `http://localhost:3001/api`.

## Known Issues

- The application currently does not have a database.



## Contributors

- Sallin Koutev - [GitHub](https://github.com/Sallin142)

## Contact

For any questions or feedback, please contact me at [ska287@sfu.ca](mailto:ska287@sfu.ca).
