# Digital Drift - Exploring the Digital Frontier

## Overview
Digital Drift is a modern blog platform built with Next.js 16, React 19.2, and TypeScript. It leverages TailwindCSS 4 for styling, MongoDB for data storage, and NextAuth.js for authentication. The platform is designed for efficient content management and a rich user experience.

## Key Features
-   **Dynamic Theming**: Light and Dark mode support with TailwindCSS CSS variables.
-   **Custom Typography**: Integrated custom fonts for a unique aesthetic.
-   **Robust Backend**: MongoDB connection with pooling for efficient data handling.
-   **Comprehensive Models**: Structured data models for Posts, Categories, Tags, Comments, and Users.
-   **Secure Authentication**: Admin login via NextAuth.js Credentials provider with JWT sessions.
-   **Admin Route Protection**: Middleware to protect admin-only routes.
-   **Content Management API**: RESTful API endpoints for CRUD operations on Posts, Categories, and Tags.
-   **Blog Frontend**: Public-facing pages for post listings, individual post views with markdown rendering, and pagination.
-   **SEO Friendly**: Dynamic metadata generation for posts, sitemap, and robots.txt.
-   **Interactive Comment System**: Users can post comments, and admins can moderate them.
-   **Admin Dashboard**: Dedicated section for managing posts, categories, and comments.
-   **Social Sharing**: Integrated social media share buttons on blog posts.

## Tech Stack
-   **Framework**: Next.js 16
-   **UI Library**: React 19.2
-   **Language**: TypeScript
-   **Styling**: TailwindCSS 4
-   **Database**: MongoDB (Local)
-   **Authentication**: NextAuth.js
-   **Package Manager**: PNPM
-   **Markdown Parser**: Marked

## Setup & Installation

Follow these steps to get Digital Drift running on your local machine.

### Prerequisites
-   Node.js (LTS recommended)
-   PNPM
-   MongoDB (running locally on `mongodb://localhost:27017`)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/digital-drift.git
cd digital-drift
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following:

```
MONGODB_URI=mongodb://localhost:27017/digital_drift
NEXTAUTH_SECRET=your-secure-nextauth-secret # Generate with: openssl rand -base64 32
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. MongoDB Setup
Ensure your local MongoDB instance is running. The application will connect to the database specified in `MONGODB_URI`.

To create an admin user for the dashboard:
Connect to your MongoDB instance (e.g., using `mongosh` or MongoDB Compass) and insert a user document into the `users` collection:

```json
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "your-password", // In a real app, hash this!
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
});
```

### 5. Font Installation
The project uses custom local fonts. Please place the font files (AzurioBold.woff2, GogaRegular.woff2, Remi.woff2, Remisa.woff2, EmilioThinItalic.woff2) into the `public/fonts/` directory.
You will need to acquire these font files separately as they are not included in the repository.

### 6. Running the Application

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Panel

Access the admin dashboard at `http://localhost:3000/admin/dashboard`. You will be redirected to a login page if not authenticated.
Use the admin user credentials created during MongoDB setup to log in.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request.