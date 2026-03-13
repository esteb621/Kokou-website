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
import { Config, getConfig } from "@/lib/supabase";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const config: Config = await getConfig();

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
      <body className="antialiased mt-40 overflow-hidden mx-auto min-w-fit w-full min-h-screen relative">
        <main className="isolate max-w-4xl mx-auto min-w-0 w-full h-full relative z-10 flex flex-col px-4 md:px-0 items-center">
          <AnimatedContent
            className="z-1000 w-full mx-auto"
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
            <Navbar />
          </AnimatedContent>
          <Image
            className="hidden md:block absolute z-[1001] -top-44 left-8 lg:-left-16 pointer-events-none w-[200px]"
            src="/assets/topivy.png"
            width={170}
            height={170}
            alt="Top ivy"
          />
          <Image
            className="hidden md:block absolute z-0 -top-44 left-8 lg:-left-16 pointer-events-none w-[200px]"
            src="/assets/underivy.png"
            width={170}
            height={170}
            alt="Under ivy"
          />
          <div className="flex-1 mt-9 flex flex-col justify-center w-2xl lg:w-full h-full">
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
              {/* Conteneur d'ancrage virtuel pour fixer le point "Bas Gauche" */}
              <div className="md:block hidden absolute z-0 -top-[0rem] right-[5rem] lg:-top-[0.5rem] lg:right-[3rem]">
                <Image
                  className="absolute -bottom-44 -left-52 pointer-events-none w-[500px] max-w-none"
                  src="/assets/1k.png"
                  width={500}
                  height={500}
                  alt="Head Kokou"
                />
              </div>
              <div className="relative w-full">
                <div className="overflow-y-auto pb-36 pl-12 pt-10 z-[1000] w-full   border-4 bg-[#ffe09d] text-pink-900 h-[calc(100vh-20rem)] border-[#7E384E] p-4">
                  {children}
                </div>

                <Image
                  className="hidden hover:opacity-20 transition-opacity md:block absolute z-[1001] -bottom-24 lg:-bottom-[5.45rem] -left-16 lg:-left-24 w-64 lg:w-[300px]"
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
          style={{ right: "clamp(-120px, calc(50vw - 50%), 30px)" }}
          src="/assets/aboveleaf.png"
          width={500}
          height={500}
          alt="Above leaf"
        />
        <Image
          className="hidden hover:opacity-20 transition-opacity lg:block absolute z-[1000] -right-36 bottom-32 pointer-events-none  w-[clamp(80px,30vw,380px)]"
          style={{ right: "clamp(-120px, calc(50vw - 50%), -70px)" }}
          src="/assets/underleaf.png"
          width={500}
          height={500}
          alt="Under leaf"
        />
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <Grainient
            color1={config.colors.background_primary}
            color2={config.colors.background_secondary}
            color3={config.colors.background_accent}
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
