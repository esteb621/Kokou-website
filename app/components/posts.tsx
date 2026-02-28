import { formatDate, getBlogPosts } from "@/app/blog/utils";
import Masonry from "@/components/Masonry";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  const sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const masonryItems = sortedBlogs.map((post, index) => {
    // Define some height variations for the masonry grid
    const heights = [300, 400, 500, 250, 600];
    const height = heights[index % heights.length];

    // Generate an image from picsum using the slug as seed so it stays identical across renders
    const imgUrl =
      post.metadata.image ||
      `https://picsum.photos/seed/${post.slug}/600/${height}?grayscale`;

    return {
      id: post.slug,
      img: imgUrl,
      url: `/blog/${post.slug}`,
      height: height,
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
