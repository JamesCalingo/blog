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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
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
            <Link href="https://sportventures.blog" passHref target="blank">
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
