import { posts } from "../posts";

import Layout from "../components/Layout";
import Link from "next/link";

const Index = ({ posts }) => {
  return (
    <Layout pageTitle="Overclocked Overthoughts">
      <div className="main_page">
        <div id="title">
          <h1 id="blog_title">Overclocked Overthoughts</h1>
          <p id="blog_tag">My thoughts, out loud.</p>
        </div>
      </div>
      <PostsList posts={posts} />
    </Layout>
  );
};

const PostsList = ({ posts }) => {
  if (!posts || !posts.length) return <p>Nothing to see here...</p>;

  return (
    <div id="postsList">
      <ul>
        {posts
          .filter((post) => post.frontmatter.published === true)
          .reverse()
          .map((post) => {
            const { frontmatter, slug } = post;
            const { subtitle, date, title } = frontmatter;

            return (
              <li key={slug}>
                <Link passHref href={`/blog/${slug}`}>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    <p className="italic">{new Date(date).toLocaleDateString()}</p>
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
