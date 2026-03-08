# lkmail - Architecture and Development Guide

This document serves as the master system prompt and development guide for **lkmail**, an independent digital identity, personal portfolio, and blog. 

The project is engineered to maximize **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness) for SEO, ensure lightning-fast performance, and deliver a flawless user experience using the **KISS** (Keep It Simple, Stupid) principle.

---

## Tech Stack & UI Strategy

* **Framework:** Next.js 16 (App Router - React 19)
* **Language:** TypeScript
* **Package Manager:** pnpm
* **Styling:** Tailwind CSS v4 (Using modern CSS `@theme` directives, no `tailwind.config.js`) + Framer Motion
* **UI Components (Mix & Match):**
  * **Shadcn/ui:** For robust, accessible base components (Buttons, Inputs, Cards). *Note: Must be manually adapted for Tailwind v4.*
  * **Aceternity UI / Magic UI:** For the "Wow" effect, marketing hooks, and engaging micro-interactions.
* **Deployment:** Cloudflare Pages / Workers (via OpenNext)
* **Version Control:** GitHub

---

## Digital Identity & API Integrations (The Hub)

`lkmail` is not just a static site; it is a living digital identity relying on specific APIs to aggregate data:

* **Blog Content:** MDX (Local). No heavy headless CMS. Blog posts live in the repository under `src/content/blog/`.
* **Outbound Emails:** **Resend API** is used for transactional emails (e.g., contact form submissions).
* **Inbound Emails:** **Cloudflare Email Routing Worker**. Intercepts incoming mail to the custom domain, allowing custom logic (filtering, Discord/Telegram notifications, forwarding).
* **Portfolio Data:** **GitHub GraphQL API** to fetch and display the latest repositories, commits, and languages used.
* **Analytics:** **Cloudflare Web Analytics**. Zero third-party servers, privacy-first, cookie-less tracking natively integrated into the Cloudflare ecosystem.
* **Personalization APIs (Optional/Future):** * **Plex API / Spotify API:** To fetch and display real-time media consumption ("Currently watching/listening...").
  * **WakaTime API:** To display real-time coding statistics.

---

## Folder Structure

The project strictly follows a modern App Router and i18n architecture. Since it is a personal digital identity, the structure is deliberately streamlined:

```text
lkmail/
├── .gitignore
├── cloudflare-env.d.ts
├── eslint.config.mjs
├── next.config.ts
├── open-next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── wrangler.jsonc
│
├── public/
│   ├── _headers                # Cloudflare custom headers (Caching rules)
│   └── favicon.svg             # App icon
│
└── src/
    ├── getDictionary.ts        # Dictionary parser for Server Components (i18n)
    ├── middleware.ts           # i18n Language routing middleware
    │
    ├── content/
    │   └── blog/               # MDX files for blog posts (e.g., my-first-post.mdx)
    │
    ├── app/
    │   ├── globals.css         # Global Tailwind v4 styling
    │   ├── not-found.tsx       # Custom 404
    │   ├── robots.ts           # Dynamic SEO
    │   ├── sitemap.ts          # Dynamic SEO
    │   │
    │   ├── api/                # Route Handlers for external APIs (Resend, GitHub, etc.)
    │   │
    │   └── [lang]/             # Internationalized Routing (fr/en)
    │       ├── layout.tsx      # Root localized layout
    │       ├── page.tsx        # Home page (Hero, Latest Posts, Selected Projects)
    │       ├── about/          # About me (Bio, Skills, Experience)
    │       ├── blog/           # Technical/Personal Blog (E-E-A-T focus)
    │       │   ├── [slug]/     # Individual blog post (reads from src/content/blog)
    │       │   └── page.tsx    # Blog index
    │       ├── projects/       # Portfolio of works
    │       └── contact/        # Contact form & social links
    │
    ├── components/             # Reusable Global Components (Server by default)
    │   ├── Footer.tsx
    │   ├── LanguageSwitcher.tsx
    │   ├── Navbar.tsx
    │   ├── StructuredData.tsx  # JSON-LD injector for E-E-A-T
    │   │
    │   └── ui/                 # Animated & Interactive UI library parts ("use client")
    │
    ├── dictionaries/           # App Copywriting & Translation JSON files
    │   ├── en.json
    │   └── fr.json
    │
    └── lib/                    # Utilities & API wrappers
        ├── api/                # Wrappers for GitHub, Resend, Plex, etc.
        ├── imageLoader.ts      # Centralized Image CDN logic
        ├── routes.ts           # Centralized routing dictionary
        └── utils.ts            # Tailwind merge & clsx utils


Golden Rules (AI & Developer Instructions)
To maintain a clean, high-performance, and unified codebase, you MUST adhere to the following rules when writing or modifying code:
1. AI Communication Language
Whenever you reply to prompts, generate documentation, or provide code explanations, you MUST strictly use US English.
2. Strictly pnpm
Always use pnpm for package management and executing scripts. Do not use npm or yarn under any circumstances to avoid lockfile conflicts.
3. Server / Client Separation
By default, all components are Server Components.
The "use client" directive must strictly be isolated to specific interactive files (e.g., inside src/components/ui/ or interactive form components). Never apply "use client" to an entire page route (page.tsx).
4. Centralized Routing (No Hardcoded URLs)
Never hardcode internal URLs (e.g., href="/about"). All internal application routes must be referenced using the centralized dictionary located in src/lib/routes.ts.
Example: href={ROUTES.ABOUT}
5. Global Image Management (Image Loader) & No SVG Rule
It is strictly forbidden to hardcode raw image URLs inside <Image /> tags. Furthermore, the use of .svg files (except for simple icons/favicon) is discouraged for complex design assets. All graphical assets and images must pass through our AI-powered Edge proxy for smart cropping (&a=attention) and format optimization.
You must use the Centralized Loader (src/lib/imageLoader.ts):

TypeScript


"use client";

export default function wsrvLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  const baseUrl = "[https://filedn.eu/lrPI4UkkIDzQ8H1Xj2o9uzf/lkmail](https://filedn.eu/lrPI4UkkIDzQ8H1Xj2o9uzf/lkmail)";
  const params = new URLSearchParams({
    url: `${baseUrl}/${src}`,
    w: width.toString(),
    q: (quality || 80).toString(),
    output: "webp",
    il: "1", // Interlaced (progressive loading)
    fit: "cover",
    a: "attention", // AI: automatically centers the subject/face!
  });
  return `https://wsrv.nl/?${params.toString()}`;
}


Component Usage: <Image loader={wsrvLoader} src="lk1.jpg" alt="..." width={500} height={500} />
6. API Route Handlers Security
All external API calls (GitHub, Resend, Plex) MUST be executed server-side. Create wrappers in src/lib/api/ or Next.js Route Handlers in src/app/api/ to ensure API keys are never exposed to the client.
7. Dynamic SEO Injection & JSON-LD (E-E-A-T)
Every page must export the generateMetadata function. JSON-LD (Structured Data) is mandatory for the Blog and About pages to establish authoritativeness. It must be injected natively to avoid hydration issues:

TypeScript


<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />


8. Tailwind v4 & UI Component Adaptation
The project uses Tailwind CSS v4. There is no tailwind.config.js. Variables and themes are managed directly inside src/app/globals.css using the @theme directive.
When integrating components from Shadcn/ui, Aceternity, or Magic UI, you must manually adapt their styling requirements to fit the Tailwind v4 CSS variable structure rather than attempting to create a legacy config file.
9. Localization (i18n) & Copywriting Separation
Business logic and copywriting must be isolated from the UI design.
All text content is managed via our dictionaries (src/dictionaries/fr.json and src/dictionaries/en.json). Components receive these dictionary objects as props. Do not hardcode French or English text directly inside tsx files.
10. Dynamic Route Params Typing (Next.js 15+)
In Next.js 15+, dynamic route parameters (params) are asynchronous (Promise) and strictly typed by the framework as generic strings. Never type params directly with custom literal types (like Locale). Instead, type them as generic strings and cast them inside the component body.

TypeScript


// ❌ BAD
export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) { ... }

// ✅ GOOD (KISS)
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  // ...
}


Chronological Setup Guide (KISS Playbook)
If this project needs to be reproduced from scratch, follow these chronological steps to avoid structural and deployment glitches:
Step 1: Initialization
Initialize the project using the official Cloudflare CLI to ensure perfect OpenNext compatibility from the start.
Create an empty GitHub repository named lkmail.
Clone it locally using Visual Studio Code.
Open the integrated terminal and navigate to the parent directory: cd ..
Run the Cloudflare creation command specifying the Next.js framework:

Bash


pnpm create cloudflare@latest lkmail --framework=next


This will generate the Next.js 16 App Router project with Tailwind v4, TypeScript, and ESLint directly into your cloned repository folder.
Step 2: OpenNext & Cloudflare Setup
Install @opennextjs/cloudflare and configure wrangler.jsonc.
CRITICAL: To prevent the OpenNext infinite build loop during Cloudflare CI/CD, split the build commands in package.json:

JSON


"scripts": {
  "dev": "next dev",
  "build": "next build",
  "build:cloudflare": "opennextjs-cloudflare build",
  "deploy": "pnpm run build:cloudflare && opennextjs-cloudflare deploy"
}


In the Cloudflare Dashboard (Settings > Builds & Deployments), set the build command to pnpm run build:cloudflare.
Step 3: Cloudflare DNS Proxy Configuration
To link the Worker to the custom domain (lkmail.me):
In wrangler.jsonc, define the routes array: ["lkmail.me/*", "www.lkmail.me/*"].
In the Cloudflare DNS Dashboard, create two AAAA records (@ and www) pointing to 100::.
Ensure the proxy status is Proxied (Orange Cloud).
Step 4: Internationalization (i18n) Middleware
Create src/dictionaries/en.json and fr.json.
Create src/getDictionary.ts to load the JSON asynchronously.
Create src/middleware.ts to read the accept-language header and redirect users (e.g., / to /en).
Move all pages into src/app/[lang]/. Apply Golden Rule #10 to handle the async params.
Step 5: Centralized Routing & Layout
Create src/lib/routes.ts exporting a ROUTES constant object.
Build a Server Component Navbar.tsx that receives the dictionary as props.
Build a Client Component LanguageSwitcher.tsx using usePathname to toggle the locale without losing the current route.
Clean up the globals.css and use native Tailwind v4 grow utility classes in the root layout.
Step 6: Branding & Aesthetics
Replace the default .ico with a pure SVG favicon.svg leveraging native SVG filters (like <feGaussianBlur>) to match the Tailwind fuchsia/purple/indigo dark mode theme, reducing external asset loading.
Project Roadmap & Task List
Phase 1: Foundation & Architecture
[x] Initialize Next.js 16 App Router with Tailwind CSS v4.
[x] Configure OpenNext for Cloudflare Pages/Workers deployment.
[x] Fix OpenNext infinite build loop in package.json.
[x] Implement i18n middleware and dictionary system.
[x] Setup centralized routing (src/lib/routes.ts).
[x] Create root localized layout and dynamic [lang] routing.
[x] Build global Server Component Navbar with Language Switcher.
[x] Generate and implement custom Tailwind-themed SVG favicon.
[x] Fix Next.js 15+ dynamic route params TypeScript strictness.
[x] Configure Cloudflare DNS proxy records for custom domain routing.
Phase 2: Core Features & UI
[ ] Implement src/lib/imageLoader.ts for wsrv.nl image optimization.
[ ] Design and build the Home page (Hero section, animations).
[ ] Build the MDX Blog architecture (local file parsing, routing).
[ ] Build the About page.
[ ] Build the Projects/Portfolio page.
Phase 3: API Integrations (The Hub)
[ ] Integrate Resend API for the Contact form.
[ ] Integrate GitHub GraphQL API for the Portfolio page.
[ ] Set up Cloudflare Web Analytics (privacy-first tracking).
[ ] Set up Cloudflare Email Routing Worker (inbound email).
[ ] (Optional) Integrate Plex / Spotify API for live status.
[ ] (Optional) Integrate WakaTime API for coding stats.






