import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { cx } from "class-variance-authority";
import Grainient from "@/components/Grainient";
import Image from "next/image";
import { motion } from "motion/react"

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
      <body className="antialiased overflow-hidden w-full h-screen relative">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Grainient
            color1="#00E0C9"
            color2="#11EAFF"
            color3="#00BE46"
            timeSpeed={1.5}
            colorBalance={0}
            warpStrength={2.5}
            warpFrequency={9}
            warpSpeed={2}
            warpAmplitude={65}
            blendAngle={90}
            blendSoftness={0}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.6}
          />
        </div>
        <main className="isolate max-w-4xl mx-auto w-full h-full min-w-0 relative z-10 flex flex-col px-4 md:px-0 items-center">
          <Navbar />
          <div className="flex-1 mt-16 flex flex-col justify-center w-full h-full">
            <Image className="absolute z-0 top-10  -right-36" src="/assets/Head_Kokou.png" width={300} height={300} alt="Kokou" />
            <div
             className="overflow-y-auto z-1000 max-h-[calc(100vh-16rem)] w-full border-4 bg-[#ffe09d] text-pink-900 min-h-[calc(100vh-30rem)] border-[#7E384E] p-4">
              {children}  
            </div>
            <Image className={`absolute z-1000 bottom-24 -right-16`} src={`/assets/leaf_0.png`} width={300} height={300} alt="Kokou" />
            <Image className={`absolute z-1000 bottom-24 -right-16`} src={`/assets/leaf_1.png`} width={300} height={300} alt="Kokou" />


          </div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
