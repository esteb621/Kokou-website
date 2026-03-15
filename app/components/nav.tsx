"use client";
import PillNav, { PillNavItem } from "@/components/PillNav";
import { usePathname } from "next/navigation";
import logo from "@/public/vercel.svg";

const email = process.env.NEXT_PUBLIC_EMAIL;
const navItems: PillNavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: `mailto:${email}`,
  },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <PillNav
      items={navItems}
      activeHref={pathname}
      logo={logo}
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="var(--accent)"
      pillColor="white"
      hoveredPillTextColor="white"
      pillTextColor="var(--text-secondary)"
      initialLoadAnimation={false}
    />
  );
}
