import Head from "next/head";
import Link from "next/Link"
import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-simple-icons/github";
import linkedinIcon from "@iconify/icons-simple-icons/linkedin";
import twitterIcon from "@iconify/icons-simple-icons/twitter";

function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
      </Head>
      <div>
        <header>
          <Link href="/">Overclocked Overthoughts</Link>
        </header>
        <main>{children}</main>
        <footer>
          <nav>
            <a href="https://github.com/JamesCalingo">
              <Icon icon={githubIcon} />
            </a>
            <a href="https://linkedin.com/in/james-calingo">
              <Icon icon={linkedinIcon} />
            </a>
          </nav>
          All content copyright me
          </footer>
      </div>
    </>
  );
}

export default Layout;
