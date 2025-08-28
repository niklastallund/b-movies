använd api från IMDB för att importera filmer

MovieShop Technical Specification
Project Overview
MovieShop is an e-commerce platform for purchasing and managing movies. The
Tech Stack

 PostgreSQL
 Prisma (ORM)

 Tailwind CSS (Styling)
 ShadCN (UI Components)
 Zod (Data Validation)
Core Features

1. User Authentication
   
    Create user roles: Customer and Admin (optional)
   
2. Movie Management (Admin)
    CRUD operations for movies:
   o Add new movies with details (title, description, price, release date,
   director, actors, etc.)
   o Edit existing movie information
   o Delete movies
   o List all movies with pagination (optional pagination)
    Implement movie genre management:
   o CRUD operations for genres
   o Assign movies to multiple genres
    Manage people associated with movies:
   o Add and edit information about directors and actors
   NextJS 15 with App Router
   project will be developed by teams of 4-5 students.
   Better Auth (Authentication)
   Implement user registration and login functionality using Better Auth
   Utilize Better Auth default schema for user data
   o Associate people with movies in diƯerent roles (director, actor)
3. Shopping Experience (Customer)
    Landing page
   o Top 5 most purchased movie
   o Top 5 most recent movies
   o Top 5 Oldest Movies
   o Top 5 cheapest Movie
    Browse movies (optional filtering)
   o By genre
   o By director
   o By actor
    Search functionality for movies (basic search by title)
    View detailed movie information
    Add movies to cart (stored in cookies)
    Manage cart (add, remove, update quantities)
    Checkout process:
   o Address input
   o Payment simulation (no real payment gateway required)
   o Order confirmation
4. User Dashboard
    View order history
    Manage account information (optional)
5. Admin Dashboard (optional)
    View sales statistics
    Manage user accounts (using Better Auth features)
   Database Models (Examples of potential props)
   Note: These are examples of props the models could contain, not the full schema.
   
    Movie:
   o title, description, price, releaseDate, imageUrl, stock, runtime
    Genre:
   o name, description
    Order:
   o
    OrderItem:
   o orderId, movieId, quantity, priceAtPurchase
   Server Actions and Data Validation
    Implement server actions for all data mutations:
   o Movie CRUD operations
   o Genre management
   o Cart operations (add, remove, update)
   o Checkout process
   o Order management
    Use Zod for server-side data validation within server actions
   
   Cart Implementation
    Use cookies to store cart information
    Implement functions to add, remove, and update cart items in the cookie
   Frontend
    Develop responsive layouts using Tailwind CSS and ShadCN components
    Create reusable React components for common UI elements
    Use React Server Components where appropriate for improved performance
   
   userId (reference to Better Auth user), totalAmount, status, orderDate
   All Better Auth models
   Utilize Better Auth for user-related actions (registration, login, profile updates)
   Integrate Better Auth components for user authentication UI
   Additional Features (Only if there's extra time)
   Note: These features should only be attempted if the core features are completed and
   there's additional time available.
6. Advanced Browsing and Filtering
   o Implement more complex filters (e.g., release year range, runtime,
   multiple genres)
7. User Reviews and Ratings
   o Allow customers to rate and review purchased movies
   o Display average ratings on movie listings
8. Wishlist
   o Enable users to add movies to a wishlist for future purchase
9. Basic Recommendation System
   o Implement a simple recommendation system based on user purchase
   history, favorite genres, directors, or actors
10. Movie Trailer Integration
    o Add functionality to link and display movie trailers (embedded YouTube
    videos)
11. Social Sharing
    o Add buttons to share movie links on social media platforms
12. Advanced Search
    o Implement full-text search for movies using PostgreSQL's full-text search
    capabilities
    o Include search by director, actor, and genre
13. Discount System
    o Create a simple discount system for special oƯers or promotional codes
    Evaluation Criteria
     Functionality: All core features working as specified
     Code Quality: Clean, well-organized, and commented code
     Database Design: Proper use of Prisma and eƯicient database schema,
     UI/UX: Intuitive and responsive design using Tailwind and ShadCN
     Authentication: Secure implementation of user authentication and authorization
     Server Actions: EƯicient and secure implementation of server actions for data
    mutations
     Data Validation: Proper use of Zod for server-side data validation
     Cart Implementation: Correct use of cookies for cart management
     Error Handling: Robust error handling and user feedback
     Additional Features: Successful implementation of extra features (if attempted,
    not required)
     Teamwork: EƯective collaboration and task distribution among team members

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
