"use client";

import { siGumroad, siTiktok, siBlender, siUnity, siPhotopea, siVrchat } from "simple-icons";
import Link from "next/link";
import { motion, type Easing } from "motion/react";
import GradientText from "@/components/GradientText";

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

function BlenderIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={siBlender.path} />
    </svg>
  );
}

function UnityIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={siUnity.path} />
    </svg>
  );
}

function SubstancePainterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={siPhotopea.path} />
    </svg>
  );
}

function VRChatIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={siVrchat.path} />
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

const GUMROAD_PRODUCTS = [
  {
    title: "Rennou",
    description: "Renou (ruh-noo / [rəˈnu] ) is an original Furry Fox 3D Model and Avatar, meant for VRChat, but as a 3D model, usable in any social platform that may allow it!",
    price: "$20",
    link: "https://kokou.gumroad.com/l/renou",
    emoji: "🦊",
    review: "4.9",
  },
  {
    title: "Denny",
    description: "It is an original 3D model of a furry/anthropomorphic dog made to be used in VRChat, though as a 3D model can technically be imported in any other application that may support it.",
    price: "$25",
    link: "https://kokou.gumroad.com/l/denny",
    emoji: "🐶",
    review: "4.9",
  },
  {
    title: "Dragnou",
    description: "Dragnou (drag-noo) is an original Furry Dragon 3D Model and Avatar, meant for VRChat, but as a 3D model, usable in any social platform that may allow it!",
    price: "$18",
    link: "https://kokou.gumroad.com/l/dragnou",
    emoji: "🐲",
    review: "5",
  },
];

const SKILLS = [
  { label: "Blender", icon: <BlenderIcon size={30} />, detail: "3D Modeling & Sculpting" },
  { label: "Unity", icon: <UnityIcon size={30} />, detail: "Texturing and Integration" },
  { label: "Substance Painter", icon: <SubstancePainterIcon size={30} />, detail: "PBR Texturing" },
  { label: "VRChat", icon: <VRChatIcon size={40} />, detail: "Avatar Creation & Upload" },
  { label: "Procreate", icon: "✏️", detail: "2D Drawing & Concept Art" },
];

export default function Page() {
  return (
    <section className="text-pink-900 w-full flex flex-col gap-12">

      {/* ── Hero ── */}
      <div className="flex flex-col gap-4 mt-4">
        <motion.div
          className="flex items-center ml-8 gap-2 text-xs font-semibold uppercase tracking-widest text-pink-500"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          <span className="inline-block w-6 h-[2px] bg-pink-400 rounded" />
          3D Artist & Content Creator
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight text-pink-950 leading-tight"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
        >
          Hey, I'm <GradientText showBorder={false}   animationSpeed={8} className="text-4xl w-fit md:text-5xl font-bold tracking-tight leading-tight" colors={["#f472b6", "#be185d", "#500724"]}>Kokou</GradientText> 👋
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-pink-700 max-w-xl leading-relaxed"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
        >
          I create stylized 3D assets for VRChat, and digital art. I share my work on TikTok
          and sell my assets on Gumroad — come take a look!
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 mt-2"
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
        >
          <a
            href="https://kokou.gumroad.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#7E384E] hover:bg-[#632c3c] text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <GumroadIcon size={15} />
            Shop on Gumroad
          </a>
          <a
            href="https://www.tiktok.com/@kokouuwu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-900 border border-pink-300 px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <TiktokIcon size={15} />
            @kokouuwu
          </a>
        </motion.div>
      </div>

      {/* ── Séparateur décoratif ── */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
      </motion.div>
      {/* ── Skills ── */}
      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        custom={5}
        variants={fadeUp}
      >
        <div className="flex items-center gap-3">
          <span className="flex-1 h-[1.5px] bg-gradient-to-r from-pink-300 to-pink-500 rounded" />
          <span className="text-pink-500 text-xs tracking-widest uppercase font-semibold">Skills & Tools</span>
          <span className="flex-1 h-[1.5px] bg-gradient-to-l from-pink-300 to-pink-500 rounded" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.label}
              className="flex items-center gap-3 bg-pink-50/60 border border-pink-200 rounded-xl px-3 py-3 hover:bg-pink-100 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.3 }}
            >
              <span className="text-xl flex-shrink-0">
                {typeof skill.icon === "string" ? skill.icon : skill.icon}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-pink-950 truncate">{skill.label}</span>
                <span className="text-xs text-pink-500 truncate">{skill.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Featured Gumroad Products ── */}
      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        custom={6}
        variants={fadeUp}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-[1.5px] w-6 bg-pink-500 rounded" />
            <span className="text-pink-500 text-xs tracking-widest uppercase font-semibold">Featured Products</span>
          </div>
          <a
            href="https://kokou.gumroad.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold text-[#7E384E] hover:underline flex items-center gap-1"
          >
            See all <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {GUMROAD_PRODUCTS.map((product, i) => (
            <motion.a
              key={product.title}
              href="https://gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 bg-pink-50/60 border-2 border-pink-200 rounded-2xl p-4 hover:border-[#7E384E] hover:bg-pink-100 transition-all hover:-translate-y-1 shadow hover:shadow-md cursor-pointer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-3xl">{product.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#7E384E] text-white px-2 py-0.5 rounded-full">
                  {product.review} ⭐
                </span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-bold text-pink-950 text-sm leading-snug group-hover:text-[#7E384E] transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-pink-600 leading-relaxed">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-black text-[#7E384E]">{product.price}</span>
                <span className="flex items-center gap-1 text-xs text-pink-500 font-semibold group-hover:text-[#7E384E]">
                  <GumroadIcon size={12} /> Buy →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── Blog CTA ── */}
      <motion.div
        className="flex flex-col gap-2"
        initial="hidden"
        animate="visible"
        custom={7}
        variants={fadeUp}
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="flex-1 h-[1.5px] bg-gradient-to-r from-pink-300 to-pink-500 rounded" />
          <span className="text-pink-500 text-xs tracking-widest uppercase font-semibold">From the Blog</span>
          <span className="flex-1 h-[1.5px] bg-gradient-to-l from-pink-300 to-pink-500 rounded" />
        </div>
        <Link
          href="/blog"
          className="group flex items-center justify-between bg-pink-50/60 border-2 border-pink-200 hover:border-[#7E384E] rounded-2xl p-5 hover:bg-pink-100 transition-all hover:-translate-y-0.5 shadow hover:shadow-md"
        >
          <div className="flex flex-col gap-1">
            <span className="font-bold text-pink-950 group-hover:text-[#7E384E] transition-colors">
              Read my articles & tutorials
            </span>
            <span className="text-xs text-pink-500">Here you can read my articles and tutorials about avatars making.</span>
          </div>
          <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </motion.div>

    </section>
  );
}
