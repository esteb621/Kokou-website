export default function Footer() {
  return (
    <footer className="mb-16 flex flex-col items-center">
      <p className="mt-8 text-text-primary backdrop-blur-2xl bg-secondary/30 border-text-primary dark:border-accent rounded-2xl p-2 ">
        © {new Date().getFullYear()} Kokou. All rights reserved.
      </p>
    </footer>
  );
}
