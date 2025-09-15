import Layout from "../components/Layout";

export default function Custom404() {
  return (
    <Layout pageTitle="404 - Page Not Found">
      <div className="centered">
        <h1 className="title">404</h1>
        <p className="description">The content you are looking for is not in another castle...it's probably non-extant.</p>
      </div>
    </Layout>
  );
}