import ReactMarkdown from "react-markdown";
import { postSlugs, postForSlug } from "../../posts";
import Layout from "../../components/Layout";
import CodeBlock from '../../components/CodeBlock'

function Post({ frontmatter, body }) {
  if (!frontmatter) return <>
  <h1>POST NOT FOUND</h1>
  </>;

  return (
    <Layout pageTitle={frontmatter.title}>
      <div>
        <article>
          <h1 className="title">{frontmatter.title}</h1>
          <h2 className="description">{frontmatter.description}</h2>
          <p className="italic">{frontmatter.date ? new Date(frontmatter.date).toLocaleDateString() : ""}</p>
          <ReactMarkdown>{body}</ReactMarkdown>
        </article>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { frontmatter, body } = await postForSlug(params.post);

  return {
    props: {
      frontmatter,
      body,
    },
  };
}

export async function getStaticPaths() {
  const paths = postSlugs().map((slug) => `/blog/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export default Post;
