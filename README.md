Art By The Pound — Full-stack scaffold (production-ready update)
----------------------------------------------------------------
This ZIP contains a production-ready scaffold including Stripe Checkout integration.
Backend:
  - Node.js, Express, Mongoose
  - Stripe SDK, webhook endpoint (configure STRIPE_WEBHOOK_SECRET)
  - Helmet, rate limiter, centralized error handler
Frontend:
  - React (Vite), pages for gallery and checkout
  - Stripe Checkout redirect flow (server creates session)
Setup:
  - Copy .env.example -> .env for backend and set keys
  - In frontend, set VITE_API_BASE_URL and VITE_STRIPE_PUBLISHABLE_KEY
