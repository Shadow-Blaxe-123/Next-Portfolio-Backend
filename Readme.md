# Next.js Personal Portfolio – Backend

This is the backend server for a personal portfolio project built as part of a Next.js assignment. It provides CRUD functionality for blogs and projects, along with automatic owner seeding on server start.Thumbnails for projects and blogs are uploaded to Cloudinary.

Middleware uses multer to parse multipart/form-data.

## Features

* CRUD Operations for Blogs and Projects.
* Automatic Owner Seeding during server startup.
* File Uploads support for project/blog thumbnails (using Cloudinary).
* TypeScript for type safety.
* Express.js backend framework.
* Prisma ORM for MongoDB database interactions.
* Global Error Handling with custom AppError.
* JSON responses for all API errors.

## Tech Stack

* Backend: Express.js
* Database: MongoDB
* ORM: Prisma
* Language: TypeScript
* File Storage: Cloudinary
* Validation: Zod

## Installation

1. Clone the repository:

    ```bash
        git clone <your-repo-url>
        cd nextjs-portfolio-backend
    ```

2. Install dependencies

    ```bash
        npm install
    ```

3. Set up environment variables

    Create a .env file in the root directory:

    ```bash
      DATABASE_URL=<your_mongodb_connection_string>
      CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
      CLOUDINARY_API_KEY=<cloudinary_api_key>
      CLOUDINARY_API_SECRET=<cloudinary_api_secret>
      NODE_ENV=development
      PORT=5000
    
    ```

4. Run database migrations

    ```bash
      npx prisma migrate dev --name init
    ```

5. Start the server

    ```bash
      npm run dev
    ```

Server will automatically seed the owner/admin user.

## API Endpoints Overview

The base Api structure is: **<http://localhost:5000/api/v1/>**

### Project

* **POST** -> **/project/create**         -> Owner can create new project.
* **GET** -> **/project/get/:id**         -> Anyone can fetch a specific project.
* **GET** -> **/project/get-all**         -> Fetch all projects.
* **GET** -> **/project/get-featured**    -> Fetch all all featured projects.
* **PATCH** -> **/project/update/:id**    -> Protected Route. Owner can update projects.
* **DELETE** -> **/project/delete/:id**   -> Protected Route. Owner can delete projects.
  
### Blog

* **POST** -> **/blog/create**         -> Owner can create new blog.
* **GET** -> **/blog/get/:id**         -> Anyone can fetch a specific blog.
* **GET** -> **/blog/get-all**         -> Fetch all projects.
* **GET** -> **/blog/get-featured**    -> Fetch all all featured projects.
* **PATCH** -> **/blog/update/:id**    -> Protected Route. Owner can update blog.
* **DELETE** -> **/blog/delete/:id**   -> Protected Route. Owner can delete blog.
