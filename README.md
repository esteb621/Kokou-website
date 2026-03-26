# Kokou Website

A modern, full-stack monorepo application containing a highly interactive public-facing portfolio/blog and a powerful administrative dashboard to manage content.

## 🏗 Overview

This repository uses a monorepo architecture powered by **pnpm workspaces**, divided into two primary Next.js applications:

1. **Public Site (`apps/public`)**:
   The main frontend of the site, built for speed and aesthetics. It features advanced animations, dynamic SEO configurations driven by Supabase, and MDX/Markdown capabilities. The public site is designed for high performance and smooth user experiences using tools like Framer Motion and GSAP.

2. **Admin Site (`apps/admin`)**:
   A secure dashboard for managing the site's content, configurations, and settings. It features a rich text editing experience, visual configuration editors, and seamless integration with Supabase for data management and persistence.

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend/Database**: [Supabase](https://supabase.com/) (SSR & JS Client)
- **Deployment**: [Netlify](https://netlify.app/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## ✨ Key Components

### Public Site Components
- **Visual & Interactive UI**: Custom components such as `AnimatedContent`, `BlurText`, `GradientText`, `Grainient` (animated gradient backgrounds), `GridMotion`, `Masonry` (for images and grids), `PillNav`, and `TiltedCard` work together to create a striking, premium user experience.
- **Shadcn UI**: Leveraged for accessible, consistent, and customizable base UI elements structure.

### Admin Site Components
- **Tiptap Rich Text Editor**: A highly customized implementation of [@tiptap/core](https://tiptap.dev/) used for writing and formatting complex content. It includes extensions for images, text alignment, highlights, and custom templates.
- **ConfigEditor & ColorEditor**: Dedicated interfaces to dynamically update application configurations, SEO parameters, social links, and branding colors that apply directly to the public site.
- **Authentication Guard**: Secured routes utilizing `@supabase/ssr` to ensure only authorized administrators can access the dashboard.

## 🚀 How It Works

1. **Content Management**: An authorized user logs into the **Admin Site**. Here, they can write blog posts using the Tiptap editor, upload images, and tweak site-wide configuration settings (like SEO metadata, URLs, and theming) via the custom editor components.
2. **Data Persistence**: All content, media, and configurations are securely stored in a **Supabase** project using Postgres tables and Supabase Storage.
3. **Public Display**: The **Public Site** fetches the latest published content and configurations directly from Supabase, rendering optimized and animated pages for the end user.
4. **Netlify Deployment**: Both applications are configured to be built and deployed automatticaly using Netlify.
5. **Docker Containerization**: The Admin site features an integrated `docker-compose.yml` and `Dockerfile`, allowing it to be easily self-hosted, deployed to a VPS, or run locally as an isolated service.

## 🛠 Getting Started

### Prerequisites

- Node.js (v20+)
- [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) project integration

### Installation

1. Clone the repository and install dependencies:
```bash
pnpm install
```

2. Set up your environment variables based on existing configurations in both `apps/public` and `apps/admin`. You'll need properly configured Supabase environment variables (URL and anon/publishable keys).

3. Start the development environment for both apps simultaneously:
```bash
pnpm dev
```
*(Alternatively, run `pnpm dev:public` or `pnpm dev:admin` to run them individually).*

### Docker Compose (Admin)

To run the admin interface via Docker efficiently:

```bash
docker-compose up -d
```
*Note: Ensure your `apps/admin/.env.local` contains the required variables like `NEXT_PUBLIC_SUPABASE_URL` and `ADMIN_EMAIL` before building the image.*
