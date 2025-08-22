import Head from "next/head";
import Link from "next/link"
import { Icon } from "@iconify/react";

function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <link rel="stylesheet" href="https://use.typekit.net/xov6xgo.css" />
      </Head>
      <div>
        <header>
          <Link href="/">James Calingo</Link>
        </header>
        <main>{children}</main>
        <footer>

          <nav>
            {pageTitle !== "About me" && <><Link href="/about">About me</Link> | </>}
            <Link href="https://jamescalingo.dev" target="blank">
              My portfolio
            </Link>
            |
            <Link href="https://sportventures.netlify.app" passHref target="blank">
              My sports blog
            </Link>
            <div className="icons">

            <Link href="https://github.com/JamesCalingo" passHref target="blank">
              <Icon icon={"logos:github-icon"} />
            </Link>
            <Link href="https://linkedin.com/in/james-calingo" passHref target="blank">
              <Icon icon={"logos:linkedin-icon"} />
            </Link>
            <Link href="https://jamescalingo.cool" passHref target="blank">
              <Icon icon={"logos:bluesky"} />
            </Link>
            </div>
          </nav>

          <p>All content © James Calingo</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
