import { BlogPosts } from "@/app/components/posts";

export const revalidate = 30;

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default async function Page() {
  return (
    <section className="w-full h-full">
      <h1 className="font-semibold text-2xl mb-8 ml-8 tracking-tighter">My Blog</h1>
      {/* @ts-ignore */}
      <BlogPosts />
    </section>
  );
}
