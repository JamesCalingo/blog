import Head from "next/head";

function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
      </Head>
      <div>
        <header>
          <div>Overclocked Overthoughts</div>
          <nav>Blog</nav>
        </header>
        <main>{children}</main>
        <footer>All content copyright me</footer>
      </div>
    </>
  );
}

export default Layout;
