

**BazarDor** is a daily essentials price tracker that shows today's price, price change and market-wise price comparison for everyday products in Bangladesh.

- 🌐 **Live Link:** LIVE_LINK_HERE
- 💻 **GitHub Repository:[** GITHUB_LINK_HERE]uzzal6090/bazar-dor

## ✨ Key Features

1. **Live price ticker:** an infinite scrolling marquee with emoji, name, price/unit and ▲/▼ change %.
2. **Home dashboard:** top 6 price risers, top 6 fallers and a responsive grid of all products, with Bengali digits and skeleton loaders.
3. **Category pages with sorting:** sort by default / price low to high / price high to low (numeric-safe), with a friendly 404 state.
4. **Protected product details:** minimum, maximum and average price plus a market-wise price table (login required).
5. **Authentication with BetterAuth:** email & password, Google and GitHub login, toast notifications and protected-route redirects.
6. **Profile & update information:** view your profile and update your name.
7. **Fully responsive** on mobile, tablet and desktop, with a custom 404 page.

## 🛠️ Technologies Used

- Next.js (App Router) + TypeScript
- Tailwind CSS + DaisyUI
- BetterAuth (MongoDB adapter)
- react-hot-toast
- Data API: `https://api.api-store.workers.dev/api/bazardor`

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## 📄 Routes

`/` · `/category/[slug]` · `/product/[slug]` (protected) · `/signin` · `/signup` · `/profile` · `/profile/update`