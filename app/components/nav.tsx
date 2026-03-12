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
      items={navItems}
      activeHref={pathname}
      logo={logo}
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="#7E384E"
      pillColor="#ffffff"
      hoveredPillTextColor="#ffffff"
      pillTextColor="#7E384E"
      initialLoadAnimation={false}
    />
  );
}
