# lkmail - Architecture and Development Guide

This document serves as the master system prompt and development guide for **lkmail**, an independent digital identity, personal portfolio, and blog. 

The project is engineered to maximize **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness) for SEO, ensure lightning-fast performance, and deliver a flawless user experience using the **KISS** (Keep It Simple, Stupid) principle.

---

## Tech Stack & UI Strategy

* **Framework:** Next.js 16 (App Router - React 19)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 (Using modern CSS `@theme` directives, no `tailwind.config.js`) + Framer Motion
* **UI Components (Mix & Match):**
  * **Shadcn/ui:** For robust, accessible base components (Buttons, Inputs, Cards). *Note: Must be adapted for Tailwind v4.*
  * **Aceternity UI / Magic UI:** For the "Wow" effect, marketing hooks, and engaging micro-interactions.
* **Content Management:** MDX (Local Markdown files for the blog, zero heavy CMS/DB).
* **Deployment:** Cloudflare Pages / Workers (via OpenNext)
* **Version Control:** GitHub
* **Image CDN:** wsrv.nl with AI-powered smart cropping

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
    └── lib/                    # Utilities & Configs
        ├── imageLoader.ts      # Centralized Image CDN logic
        └── utils.ts            # Tailwind merge & clsx utils

```

---

## Golden Rules (AI & Developer Instructions)

To maintain a clean, high-performance, and unified codebase, you **MUST** adhere to the following rules when writing or modifying code:

### 1. Server / Client Separation

By default, all components are **Server Components**.
The `"use client"` directive must strictly be isolated to specific interactive files (e.g., inside `src/components/ui/` or interactive form components). Never apply `"use client"` to an entire page route (`page.tsx`).

### 2. Global Image Management (Image Loader) & No SVG Rule

It is strictly forbidden to hardcode raw image URLs inside `<Image />` tags. Furthermore, the use of `.svg` files (except for simple icons/favicon) is discouraged for complex design assets. All graphical assets and images must pass through our AI-powered Edge proxy for smart cropping (`&a=attention`) and format optimization.

**You must use the Centralized Loader (`src/lib/imageLoader.ts`):**

```typescript
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

```

*Component Usage:* `<Image loader={wsrvLoader} src="my-portrait.jpg" alt="..." width={500} height={500} />`

### 3. MDX Blog Architecture (KISS Principle)

Do not install heavy CMS headless clients or complex database ORMs for the blog.
All blog posts are written in `.mdx` format and stored in `src/content/blog/`. Use native Next.js features (like `next-mdx-remote` or `mdx-components`) or a lightweight content parser to read the file system and render the blog.

### 4. Dynamic SEO Injection & JSON-LD (E-E-A-T)

Every page must export the `generateMetadata` function. JSON-LD (Structured Data) is mandatory for the Blog and About pages to establish authoritativeness. It must be injected natively to avoid hydration issues:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

```

### 5. Tailwind v4 & UI Component Adaptation

The project uses **Tailwind CSS v4**. There is no `tailwind.config.js`. Variables and themes are managed directly inside `src/app/globals.css` using the `@theme` directive.
When integrating components from *Shadcn/ui*, *Aceternity*, or *Magic UI*, you must manually adapt their styling requirements to fit the Tailwind v4 CSS variable structure rather than attempting to create a legacy config file.

### 6. Localization (i18n) & Copywriting Separation

Business logic and copywriting must be isolated from the UI design.
All text content is managed via our dictionaries (`src/dictionaries/fr.json` and `src/dictionaries/en.json`). Components receive these dictionary objects as props. Do not hardcode French or English text directly inside `tsx` files.

---

## Local Development

1. Install dependencies:

```bash
pnpm install

```

2. Run the development server:

```bash
pnpm run dev

```

## Cloudflare Deployment

The architecture uses OpenNext to build the site into a Cloudflare Edge Worker:

```bash
pnpm run deploy

```

```

***

### 🚀 Que faisons-nous maintenant ?
Ton "cerveau" de projet (le README) est prêt. Voici les prochaines étapes logiques pour construire l'application :

1. **Mettre en place l'i18n (Internationalisation) :** Créer le `middleware.ts`, le fichier `getDictionary.ts`, et les dossiers `dictionaries/` avec l'anglais et le français.
2. **Créer le Layout et la Navbar/Footer :** Mettre en place la coquille visuelle du site qui persistera sur toutes les pages.
3. **Configurer l'Image Loader :** Créer le fichier `src/lib/imageLoader.ts` exact.
4. **Mettre en place la lecture des fichiers MDX :** Pour que tu puisses commencer à écrire ton blog.

Dis-moi par quoi tu préfères commencer !

```