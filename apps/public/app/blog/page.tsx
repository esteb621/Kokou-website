import { BlogPosts } from "@/app/components/posts";


export const metadata = {
  title: "Portfolio",
  description: "View my portfolio.",
};

export default async function Page() {
  return (
    <section className="w-full h-full">
      <h1 className="font-semibold text-2xl mb-8 ml-8 tracking-tighter">My Portfolio</h1>
      {/* @ts-ignore */}
      <BlogPosts />
    </section>
  );
}
