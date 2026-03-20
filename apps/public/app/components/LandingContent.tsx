"use client";

import { siGumroad, siTiktok } from "simple-icons";
import { motion, type Easing } from "motion/react";
import GradientText from "@/components/GradientText";
import { Config } from "@/lib/types";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function GumroadIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={siGumroad.path} />
    </svg>
  );
}

function TiktokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={siTiktok.path} />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as Easing },
  }),
};

const Products: React.FC<{ category: any[]; index: number }> = ({
  category,
  index,
}) => {
  const sortedCategory = [...category].sort(
    (a, b) => (a.priority || 99) - (b.priority || 99),
  );

  return sortedCategory.map((product: any, j: number) => (
    <motion.a
      key={j}
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-secondary/30 border-2 border-primary rounded-2xl hover:border-accent hover:bg-secondary/50 transition-all shadow hover:shadow-md cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + (index * 3 + j) * 0.1, duration: 0.4 }}
    >
      <div className="relative flex flex-col h-full w-full">
        <div className="w-full h-60 shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <Button
          size="icon"
          className="bg-primary/10 hover:bg-primary/20 absolute top-2 right-2 rounded-full w-auto h-auto p-0"
        >
          <Badge
            variant="secondary"
            className="rounded-lg text-lg px-2 py-4 flex justify-center shadow-2xl"
          >
            {/* @ts-ignore */}
            <StarIcon />
            {product.review}
          </Badge>
        </Button>
        <Card className="border-none bg-white px-2 flex-1 flex flex-col rounded-none">
          <CardHeader>
            <CardTitle className="text-xl pl-2">{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p>{product.description}</p>
          </CardContent>
          <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
            <div className="flex flex-col">
              <span className="text-sm font-medium uppercase">Price</span>
              <span className="text-xl font-semibold">{product.price}</span>
            </div>
            <Button size="lg" className=" bg-accent text-secondary">
              See on Jinxxy
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.a>
  ));
};

export default function LandingContent({ config }: { config: Config }) {
  return (
    <section className="text-text-primary w-full flex flex-col gap-8">
      {/* ── Hero ── */}
      <div className="flex flex-col gap-4 mt-4">
        <motion.div
          className="flex items-center ml-8 gap-2 text-xs font-semibold uppercase tracking-widest text-primary"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          <span className="inline-block w-6 h-[2px] bg-primary rounded" />
          {config.hero.section}
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
        >
          {/* Take all text expect last element */}
          {config.hero.title.split(" ").slice(0, -1).join(" ") + " "}
          <GradientText
            showBorder={false}
            animationSpeed={8}
            className="text-4xl w-fit md:text-5xl font-bold tracking-tight leading-tight"
            colors={[
              "var(--primary)",
              "var(--text-secondary)",
              "var(--text-primary)",
            ]}
          >
            {config.hero.title.split(" ").slice(-1).join(" ")}
          </GradientText>{" "}
          👋
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-primary max-w-2xl leading-relaxed"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
        >
          {config.hero.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 mt-2"
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
        >
          <a
            href="https://jinxxy.com/Kokou"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent hover:bg-text-primary text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <Icon
              icon="material-symbols:shopping-cart-outline"
              className="w-5 h-5"
            />
            Shop on Jinxxy
          </a>
        </motion.div>
      </div>

      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      ></motion.div>
      {/* ── Featured Jinxxy Products ── */}
      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        custom={6}
        variants={fadeUp}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-[1.5px] w-6 bg-primary rounded" />
            <span className="text-primary text-xs tracking-widest uppercase font-semibold">
              Featured Jinxxy Products
            </span>
          </div>
          <a
            href="https://jinxxy.com/Kokou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold text-primary hover:underline flex items-center gap-1"
          >
            See all <span>→</span>
          </a>
        </div>

        {Object.keys(config.products).map((category: any, i) => (
          <div key={category} className="mb-12">
            <div className="flex items-center gap-3 my-6">
              <span className="flex-1 h-[1.5px] bg-gradient-to-r from-bg-accent to-bg-accent/30 rounded" />
              <span className="text-bg-accent text-xl font-semibold">
                {String(category).charAt(0).toUpperCase() +
                  String(category).slice(1)}
              </span>
              <span className="flex-1 h-[1.5px] bg-gradient-to-l from-bg-accent/50 to-bg-accent/30 rounded" />
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4"
              key={category}
            >
              <Products category={config.products[category]} index={i} />
            </div>
          </div>
        ))}
      </motion.div>
      {/* Social links */}
      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        custom={4}
        variants={fadeUp}
      >
        <div className="flex items-center gap-3">
          <span className="flex-1 h-[1.5px] bg-gradient-to-r from-secondary/30 to-primary rounded" />
          <span className="text-primary text-xs tracking-widest uppercase font-semibold">
            Social Links
          </span>
          <span className="flex-1 h-[1.5px] bg-gradient-to-l from-secondary/30 to-primary rounded" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          {Object.entries(config.socials).map(([key, data], i) => (
            <motion.a
              key={key}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-secondary hover:bg-primary/50 border border-primary/80 rounded-xl px-3 py-3 hover:border-primary transition-all duration-200 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.3 }}
            >
              <div className="text-2xl flex-shrink-0 group-hover:cursor-pointer text-text-secondary group-hover:scale-110 transition-transform">
                <Icon icon={data.icon} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-text-secondary truncate capitalize">
                  {data.label}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── Séparateur décoratif ── */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      ></motion.div>
      {/* ── Skills ── */}
      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        custom={5}
        variants={fadeUp}
      >
        <div className="flex items-center gap-3">
          <span className="flex-1 h-[1.5px] bg-gradient-to-r from-secondary/30 to-primary rounded" />
          <span className="text-primary text-xs tracking-widest uppercase font-semibold">
            Skills & Tools
          </span>
          <span className="flex-1 h-[1.5px] bg-gradient-to-l from-secondary/30 to-primary rounded" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {config.skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              className="flex items-center gap-3 bg-secondary border border-primary/80 rounded-xl px-3 py-3 hover:bg-secondary/80 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.3 }}
            >
              <div className="text-2xl flex-shrink-0 text-text-secondary group-hover:rotate-12 transition-transform">
                <Icon icon={skill.icon || "ph:sparkles"} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-text-secondary truncate">
                  {skill.label}
                </span>
                <span className="text-xs text-primary truncate">
                  {skill.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
