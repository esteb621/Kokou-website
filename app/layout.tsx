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
import { cx } from "class-variance-authority";

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

const items = [
  "https://public-files.gumroad.com/3cda66s8xwzvchxtll2p0vp2bkkc",
  "https://public-files.gumroad.com/sulpw15b6do73bu1mrhn34rqhl3a",
  "https://public-files.gumroad.com/sq1xmep4r3wrvk66tn5mcsoh9r50",
  "https://public-files.gumroad.com/3cda66s8xwzvchxtll2p0vp2bkkc",
  "https://public-files.gumroad.com/qt938s41wa914h181xlkjpgf85dq",
  "https://public-files.gumroad.com/35cghmufaoroxltsijueio1rxdan",
  "https://public-files.gumroad.com/t7296x6j8ozc3u70ilmvrxa1mjxd",
  "https://public-files.gumroad.com/9c8kt0vleqir5wb1m8ebp415yevh",
  "https://public-files.gumroad.com/lzen6jy91uomppmmiy3oaw6f0k9g",
  "https://public-files.gumroad.com/rlzxnfiavl5xhzntamdh6jnp5q4v",
  "https://public-files.gumroad.com/19cd44080m4sspdc9z910pl2sua9",
  "https://public-files.gumroad.com/ohw6yamj4t6xq9i3770f1gzzre4o",
  "https://public-files.gumroad.com/3cda66s8xwzvchxtll2p0vp2bkkc",
  "https://public-files.gumroad.com/tlpy6g54agza6ic3562nokxob0u9",
  "https://public-files.gumroad.com/rlzxnfiavl5xhzntamdh6jnp5q4v",
  "https://public-files.gumroad.com/19cd44080m4sspdc9z910pl2sua9",
  "https://public-files.gumroad.com/ohw6yamj4t6xq9i3770f1gzzre4o",
  "https://public-files.gumroad.com/vlbz7qranscp65zl557ahac107bj",
  "https://public-files.gumroad.com/rlzxnfiavl5xhzntamdh6jnp5q4v",
  "https://public-files.gumroad.com/19cd44080m4sspdc9z910pl2sua9",
  "https://public-files.gumroad.com/ohw6yamj4t6xq9i3770f1gzzre4o",
  "https://public-files.gumroad.com/vlbz7qranscp65zl557ahac107bj",
];

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
      <body className="antialiased overflow-y-hidden w-full h-full mx-4 mt-8 lg:mx-auto">
        <div className=" absolute top-0 left-0 w-full h-full z-0">
          <GridMotion
            items={items}
            gradientColor="#e5ab2b"
            canvasColor="#e89306"
          />
        </div>
        <main className="isolate max-w-2xl h-full mx-auto min-w-0 z-100 my-auto flex flex-col items-center px-2 md:px-0">
          <Navbar />
          <div className="overflow-y-auto max-h-[calc(100vh-20rem)] mt-8 pt-10 w-full h-full  border-6 bg-amber-100 text-pink-100 border-pink-900 dark:border-neutral-800 rounded-lg p-4">
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
