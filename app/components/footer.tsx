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
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-pink-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li className="backdrop-blur-2xl bg-pink-100  text-pink-900 p-2 rounded-2xl">
          <a
            className="flex items-center transition-all hover:text-pink-400"
            rel="noopener noreferrer"
            target="_blank"
            href="https://gumroad.com/"
          >
            <GumroadIcon />
            <p className="ml-2 h-7">Gumroad</p>
          </a>
        </li>
        <li className="backdrop-blur-2xl bg-pink-100  text-pink-900 p-2 rounded-2xl">
          <a
            className="flex items-center transition-all hover:text-pink-400"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.tiktok.com/@kokouuwu"
          >
            <TiktokIcon />
            <p className="ml-2 h-7">TikTok</p>
          </a>
        </li>
      </ul>
      <p className="mt-8 text-pink-900 backdrop-blur-2xl bg-pink-100  border-pink-900 dark:border-neutral-800 rounded-2xl p-2 ">
        © {new Date().getFullYear()} Kokou. All rights reserved.
      </p>
    </footer>
  );
}
