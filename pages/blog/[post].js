import Markdown from "react-markdown";
import { postSlugs, postForSlug } from "../../posts";
import Layout from "../../components/Layout";
import CodeBlock from '../../components/CodeBlock'
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';

function Post({ frontmatter, body }) {
  if (!frontmatter) return <>
  <h1>POST NOT FOUND</h1>
  </>;

  return (
    <Layout pageTitle={frontmatter.title}>
      <div>
        <article>
          <h1 className="title">{frontmatter.title}</h1>
          <h2 className="description">{frontmatter.subtitle}</h2>
          <p className="italic">{frontmatter.date ? new Date(frontmatter.date).toLocaleDateString() : ""}</p>
       <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm, remarkRehype]}>{body}</Markdown>
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
