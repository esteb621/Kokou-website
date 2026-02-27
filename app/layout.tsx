import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import GridMotion from "@/components/GridMotion";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kokou",
    template: "%s | Kokou",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "Kokou",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "Kokou",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// note: you'll need to make sure the parent container of this component is sized properly
const items = [
  "Item 1",
  <div key="jsx-item-1">Custom JSX Content</div>,
  "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Item 2",
  <div key="jsx-item-2">Custom JSX Content</div>,
  "Item 4",
  <div key="jsx-item-2">Custom JSX Content</div>,
  "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Item 5",
  <div key="jsx-item-2">Custom JSX Content</div>,
  "Item 7",
  <div key="jsx-item-2">Custom JSX Content</div>,
  "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Item 8",
  <div key="jsx-item-2">Custom JSX Content</div>,
  "Item 10",
  <div key="jsx-item-3">Custom JSX Content</div>,
  "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Item 11",
  <div key="jsx-item-2">Custom JSX Content</div>,
  "Item 13",
  <div key="jsx-item-4">Custom JSX Content</div>,
  "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Item 14",
  // Add more items as needed
];

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <body className="antialiased mx-4 mt-8 lg:mx-auto">
        <div className=" absolute top-0 left-0 w-full h-full z-0">
          <GridMotion items={items} gradientColor="pink" />
        </div>
        <main className="flex-auto max-w-2xl mx-auto min-w-0 z-100 my-autoflex flex-col px-2 md:px-0">
          <Navbar />
          <div className="mt-8 pt-10 z-100  border-6 backdrop-blur-2xl text-pink-100 border-pink-900 dark:border-neutral-800 rounded-lg p-4">
            {children}
          </div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
