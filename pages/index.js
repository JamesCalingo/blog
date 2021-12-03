import { posts } from "../posts";

import Layout from "../components/Layout";
import Link from "next/link";

const Index = ({ posts }) => {
  return (
    <Layout pageTitle="Overclocked Overthoughts">
      <h1>The STuff</h1>
      <PostsList posts={posts} />
    </Layout>
  );
};

const PostsList = ({ posts }) => {
  if (!posts || !posts.length) return <p>Nothing to see here...</p>;

  return (
    <div>
      <ul>
        {posts.map((post) => {
          const { frontmatter, slug } = post;
          const { description, date, title } = frontmatter;

          return (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <a href="">
                  <h4>{title}</h4>
                  <p>{description}</p>
                  <h5>{date}</h5>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const postsData = posts();

  return {
    props: {
      posts: postsData,
    },
  };
}

export default Index;
