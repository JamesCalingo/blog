import { posts } from "../posts";

import Layout from "../components/Layout";
import Link from "next/link";

const Index = ({ posts }) => {
  return (
    <Layout pageTitle="Overclocked Overthoughts">
      <div className="mainPage">
      <h1>James Calingo</h1>
      <p>My thoughts, out loud.</p>
      </div>
      <PostsList posts={posts} />
    </Layout>
  );
};

const PostsList = ({ posts }) => {
  if (!posts || !posts.length) return <p>Nothing to see here...</p>;
  console.log(posts)

  return (
    <div id="postsList">
      <ul>
        {posts
        .filter(post => post.frontmatter.published === true)
        .map((post) => {
          const { frontmatter, slug } = post;
          const { description, date, title } = frontmatter;

          return (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <a href="">
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <p className="italic">{date}</p>
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
