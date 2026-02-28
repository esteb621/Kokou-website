"use client";
import PillNav, { PillNavItem } from "@/components/PillNav";
import { usePathname } from "next/navigation";
import logo from "@/public/vercel.svg";
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
    href: "/contact",
  },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <PillNav
      logo={logo.src}
      items={navItems}
      activeHref={pathname}
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="#000000"
      pillColor="#ffffff"
      hoveredPillTextColor="#ffffff"
      pillTextColor="#000000"
      initialLoadAnimation={false}
    />
  );
}
