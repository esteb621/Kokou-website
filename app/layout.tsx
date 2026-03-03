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
      <head>
        <meta name="apple-mobile-web-app-title" content="Kokou" />
      </head>
      <body className="antialiased mt-40 overflow-hidden w-full min-h-screen relative">

        <main className="isolate max-w-4xl mx-auto w-full h-full min-w-0 relative z-10 flex flex-col px-4 md:px-0 items-center">
          <Navbar />
          <Image
            className="hidden md:block absolute z-[1001] -top-44 lg:-left-16 pointer-events-none w-[clamp(100px,15vw,200px)]"
            src="/assets/topivy.png"
            width={170}
            height={170}
            alt="Top ivy"
          />
          <Image
            className="hidden md:block absolute z-0 -top-44 -left-16 pointer-events-none w-[clamp(100px,15vw,200px)]"
            src="/assets/underivy.png"
            width={170}
            height={170}
            alt="Under ivy"
          />
          <div className="flex-1 mt-9 flex flex-col justify-center w-full h-full">
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
                className="hidden md:block absolute z-0 top-24  lg:-top-[13rem] -right-60 pointer-events-none w-[clamp(100px,35vw,500px)]"
                src="/assets/1k.png"
                width={400}
                height={400}
                alt="Head Kokou"
              />
              <div className="relative w-full">
                <div className="overflow-y-auto pb-36 pl-12 z-[1000] w-full  border-4 bg-[#ffe09d] text-pink-900 h-[calc(100vh-20rem)] border-[#7E384E] p-4">
                  {children}
                </div>

                <Image
                  className="hidden hover:opacity-20 transition-opacity md:block absolute z-[1001] -bottom-24 -left-16 lg:-bottom-[5.45rem] lg:-left-24  w-[clamp(100px,25vw,300px)]"
                  src="/assets/2k.png"
                  width={300}
                  height={300}
                  alt="Kokou Tail"
                />
              </div>
            </AnimatedContent>
          </div>

          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
          <Image
            className="hidden hover:opacity-20 transition-opacity lg:block absolute z-[1001] -right-24 bottom-80  w-[clamp(80px,30vw,380px)]"
            style={{ right: 'clamp(-120px, calc(50vw - 50%), 30px)' }}
            src="/assets/aboveleaf.png"
            width={500}
            height={500}
            alt="Above leaf"
          />
          <Image
            className="hidden hover:opacity-20 transition-opacity lg:block absolute z-[1000] -right-36 bottom-32 pointer-events-none  w-[clamp(80px,30vw,380px)]"
            style={{ right: 'clamp(-120px, calc(50vw - 50%), -70px)' }}
            src="/assets/underleaf.png"
            width={500}
            height={500}
            alt="Under leaf"
          />
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <Grainient
            color1="#28E9FD"
            color2="#11EAFF"
            color3="#00badf"
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
      </body>
    </html>
  );
}
