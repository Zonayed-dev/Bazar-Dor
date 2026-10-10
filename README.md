# 🛒 Bazar Dor — বাজার দর

**Bazar Dor** is a Bengali-language market price comparison web application designed to help users explore everyday essential products and compare prices across markets. It provides a simple interface for browsing product information, checking current prices, and viewing price changes.

## ✨ Features

- **Product Catalog:** Browse everyday essentials with Bengali product names, categories, and prices.
- **Price Change Indicators:** Identify price increases and decreases using visual indicators.
- **Product Details:** View detailed product information and compare prices across markets.
- **User Authentication:** Register and sign in using email and password.
- **Social Authentication:** Google and GitHub sign-in support.
- **Protected Routes:** Restrict access to product details for unauthenticated users.
- **Bengali Interface:** Product information and pricing labels presented in Bengali.
- **Responsive Design:** Interface designed to work across different screen sizes.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| TypeScript | Type-safe application development |
| Tailwind CSS | Utility-first styling |
| DaisyUI | UI components and styling |
| Better Auth | Authentication and session management |
| MongoDB | Database and authentication data storage |

## 📁 Project Structure

```text
bazar-dor/
├── public/                  # Static assets
├── src/
│   ├── app/                 # App Router pages and API routes
│   │   ├── api/             # Authentication API
│   │   ├── product/         # Product detail pages
│   │   ├── signin/          # Sign-in page
│   │   └── signup/          # Registration page
│   ├── components/          # Reusable UI components
│   └── lib/                 # Authentication and API utilities
├── .env.local               # Local environment variables (not committed)
├── package.json
├── tsconfig.json
└── README.md
```

*Note: The structure above highlights the main application areas; the exact files may vary.*

## 🚀 Getting Started

Follow these instructions to run Bazar Dor locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) — a compatible version for your installed Next.js release
- npm
- A MongoDB database
- Google and GitHub OAuth credentials if you intend to enable social sign-in

### 1. Clone the repository

```bash
git clone https://github.com/Zonayed-dev/Bazar-Dor
cd bazar-dor
```


### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the variables required by your authentication and database configuration.

For example:

```env
MONGODB_URI="your-mongodb-connection-string"
BETTER_AUTH_SECRET="your-long-random-secret"
BETTER_AUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

Use the exact variable names expected by your project's configuration. If your application uses a different MongoDB variable name or authentication base URL variable, keep that name instead.

**Security:** Never commit `.env.local`, database credentials, authentication secrets, or OAuth client secrets to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create a production build

To check whether the application can be built for production, run:

```bash
npm run build
```

## 🔐 Authentication Setup

Bazar Dor uses Better Auth for authentication.

- Email/password authentication requires the configured database and authentication settings.
- Google and GitHub sign-in require OAuth applications and valid client credentials.
- For local development, configure the callback URLs to match your local application URL.
- For production, update the authentication base URL and OAuth callback URLs to match your deployed domain.

Common local callback URLs are:

```text
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
```

Confirm the callback paths against your Better Auth configuration before using them.

## 🌐 Deployment

The application can be deployed to [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure all required environment variables in the Vercel project settings.
4. Deploy the application.
5. Update the authentication base URL and OAuth provider callback URLs for the production domain.
6. Test the homepage, product pages, registration, sign-in, sign-out, and social authentication.

## 🔮 Future Improvements

- Integration with reliable, regularly updated market-price data.
- Search and filtering by product or category.
- Historical price charts and trends.
- Additional markets and product coverage.
- Improved accessibility and user experience.

## 👨‍💻 Author

Developed as a full-stack web development assignment using Next.js, TypeScript, MongoDB, and Better Auth.

---

**Bazar Dor — বাজার দর**  
*Making everyday market-price information easier to explore and compare.*