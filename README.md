# lkmail.me ⚡️

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Deployed_on-Cloudflare-F38020?style=flat&logo=cloudflare)](https://pages.cloudflare.com/)

The source code for my independent digital identity, personal portfolio, and blog. 

This project is strictly engineered to maximize **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness) and deliver a flawless user experience using the **KISS** (Keep It Simple, Stupid) principle.

## 🚀 Live Site
**[lkmail.me](https://lkmail.me)**

## ✨ Core Features
- **Modern Architecture:** Built with Next.js 16 (App Router) and React 19.
- **Edge Deployment:** Deployed on Cloudflare Pages/Workers via OpenNext for zero cold starts and global distribution.
- **Pure MDX Blog:** Content written in pure Markdown/MDX without UI lock-in, styled automatically via `@tailwindcss/typography`.
- **Live Ecosystem Hub:** Real-time fetching of GitHub repositories using the GraphQL API.
- **Privacy-First:** Zero third-party cookies, natively using Cloudflare Web Analytics.
- **Fully Localized:** Complete i18n routing support (English / French).

## 🛠️ Tech Stack
- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Components:** Shadcn/ui + Lucide Icons
- **Content:** `next-mdx-remote` & `gray-matter`
- **Package Manager:** `pnpm`

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/lionel-kaufmann/lkmail.me.git](https://github.com/lionel-kaufmann/lkmail.me.git)
   cd lkmail.me
   ```

```bash
Install dependencies:
Bash
pnpm install
```


Environment Variables:
Create a .env.local file in the root directory and add your GitHub token for the portfolio fetcher:
Extrait de code
```bash
GITHUB_TOKEN=your_personal_access_token
```

Run the development server:
Bash`
pnpm run dev
`

Open http://localhost:3000 with your browser to see the result.

📄 License
This project is open-source and available under the MIT License.