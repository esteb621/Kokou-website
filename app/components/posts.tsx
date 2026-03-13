import { getPublishedArticles } from "@/lib/supabase";
import Masonry from "@/components/Masonry";

export async function BlogPosts() {
  let articles: Awaited<ReturnType<typeof getPublishedArticles>> = [];

  try {
    articles = await getPublishedArticles();
  } catch (error) {
    console.error("Error fetching articles", error);
  }

  if (articles.length === 0) {
    return (
      <p className="text-sm opacity-60">
        No article published yet.
      </p>
    );
  }

  const heights = [300, 400, 500, 250, 600];

  const masonryItems = articles.map((article, index) => {
    const height = heights[index % heights.length];
    const imgUrl =
      article.cover ||
      `https://picsum.photos/seed/${article.slug}/600/${height}?grayscale`;

    return {
      id: article.slug,
      img: imgUrl,
      url: `/blog/${article.slug}`,
      height,
    };
  });

  return (
    <div className="w-full h-full mt-4">
      <Masonry
        items={masonryItems}
        ease="power2.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.95}
        blurToFocus
      />
    </div>
  );
}
