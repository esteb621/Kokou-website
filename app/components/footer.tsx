import { siGumroad, siTiktok } from "simple-icons";

function GumroadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={siGumroad.path} />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={siTiktok.path} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mb-16 flex flex-col items-center">
      <p className="mt-8 text-pink-900 backdrop-blur-2xl bg-pink-100  border-pink-900 dark:border-neutral-800 rounded-2xl p-2 ">
        © {new Date().getFullYear()} Kokou. All rights reserved.
      </p>
    </footer>
  );
}
