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
import { motion } from "motion/react";
import AnimatedContent from "@/components/AnimatedContent";

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
      <body className="antialiased w-full min-h-screen relative">
        <div className="fixed top-0 left-0 w-full h-full z-0">
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
          <Image
            className="hidden md:block absolute z-[1001] top-0 -left-12 lg:-left-20 pointer-events-none w-24 md:w-32 lg:w-44"
            src="/assets/topivy.png"
            width={170}
            height={170}
            alt="Top ivy"
          />
          <Image
            className="hidden md:block absolute z-[1000] top-0 -left-12 lg:-left-20 pointer-events-none w-24 md:w-32 lg:w-44"
            src="/assets/underivy.png"
            width={170}
            height={170}
            alt="Under ivy"
          />
          <div className="flex-1 mt-40 flex flex-col justify-center w-full h-full">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={1.5}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.2}
            >
              <Image
                className="hidden md:block absolute z-0 -top-24 -right-28 lg:-top-40 lg:-right-48 pointer-events-none w-48 md:w-64 lg:w-[400px]"
                src="/assets/1k.png"
                width={400}
                height={400}
                alt="Head Kokou"
              />
              <div className="relative w-full">
                <div className="overflow-y-auto pb-32 pl-12 z-[1000] h-full w-full  border-4 bg-[#ffe09d] text-pink-900 min-h-[calc(100vh-20rem)] border-[#7E384E] p-4">
                  {children}
                </div>

                <Image
                  className="hidden md:block absolute z-[1001] -bottom-12 -left-16 lg:-bottom-[4.5rem] lg:-left-24 pointer-events-none w-28 md:w-40 lg:w-[250px]"
                  src="/assets/2k.png"
                  width={250}
                  height={250}
                  alt="Kokou"
                />
              </div>
            </AnimatedContent>
          </div>
          <Image
            className="hidden lg:block absolute z-[1001] bottom-20 -right-48 xl:-right-72 -rotate-20 pointer-events-none w-40 lg:w-60 xl:w-[300px]"
            src="/assets/aboveleaf.png"
            width={300}
            height={300}
            alt="Kokou"
          />
          <Image
            className="hidden lg:block absolute z-[1000] bottom-20 -right-48 xl:-right-72 -rotate-20 pointer-events-none w-40 lg:w-60 xl:w-[300px]"
            src="/assets/underleaf.png"
            width={300}
            height={300}
            alt="Kokou"
          />
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
