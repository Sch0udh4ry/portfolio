import fs from "node:fs";
import path from "node:path";
import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

const ROOT_DIR = process.cwd();
const PAGE_EXCLUDES = new Set(["nav.html", "footer.html"]);

function extractMatch(pattern, source, fallback = "") {
  const match = source.match(pattern);
  return match ? match[1].trim() : fallback;
}

function extractAll(pattern, source) {
  return Array.from(source.matchAll(pattern)).map((match) => match[1].trim()).filter(Boolean);
}

function resolveSourceFile(slugParts) {
  if (!slugParts?.length) return "index.html";

  const slug = slugParts.join("/");
  if (slug.endsWith(".html")) return slug;
  return `${slug}.html`;
}

export async function getStaticPaths() {
  const entries = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
  const htmlFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html") && !PAGE_EXCLUDES.has(entry.name))
    .map((entry) => entry.name);

  const paths = htmlFiles.map((fileName) => {
    if (fileName === "index.html") {
      return { params: { slug: [] } };
    }

    return { params: { slug: [fileName] } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slugParts = params?.slug || [];
  const sourceFile = resolveSourceFile(slugParts);
  const filePath = path.join(ROOT_DIR, sourceFile);

  if (!fs.existsSync(filePath) || PAGE_EXCLUDES.has(sourceFile)) {
    return { notFound: true };
  }

  const html = fs.readFileSync(filePath, "utf8");
  const title = extractMatch(/<title>([\s\S]*?)<\/title>/i, html, "Pure Reach Innovation");
  const description = extractMatch(
    /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i,
    html,
    ""
  );
  const canonical = extractMatch(
    /<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']\s*\/?>/i,
    html,
    ""
  );
  const htmlClassName = extractMatch(/<html[^>]*class=["']([\s\S]*?)["'][^>]*>/i, html, "");
  const bodyClassName = extractMatch(/<body[^>]*class=["']([\s\S]*?)["'][^>]*>/i, html, "");
  const bodyMarkup = extractMatch(/<body[^>]*>([\s\S]*?)<\/body>/i, html, "");
  const ldJsonBlocks = extractAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    html
  );
  const tailwindConfig = extractMatch(
    /<script[^>]*id=["']tailwind-config["'][^>]*>([\s\S]*?)<\/script>/i,
    html,
    ""
  );

  return {
    props: {
      bodyMarkup,
      bodyClassName,
      canonical,
      description,
      htmlClassName,
      ldJsonBlocks,
      sourceFile,
      tailwindConfig,
      title,
    },
  };
}

export default function StaticHtmlPage({
  bodyMarkup,
  bodyClassName,
  canonical,
  description,
  htmlClassName,
  ldJsonBlocks,
  tailwindConfig,
  title,
}) {
  useEffect(() => {
    const previousHtmlClass = document.documentElement.className;
    const previousBodyClass = document.body.className;

    document.documentElement.className = htmlClassName || "";
    document.body.className = bodyClassName || "";

    return () => {
      document.documentElement.className = previousHtmlClass;
      document.body.className = previousBodyClass;
    };
  }, [bodyClassName, htmlClassName]);

  return (
    <>
      <Head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
        {canonical ? <link rel="canonical" href={canonical} /> : null}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@400;500;600&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="/style.css" />
        {ldJsonBlocks.map((json, index) => (
          <script
            key={`ld-json-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json }}
          />
        ))}
      </Head>
      <Script
        src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
        strategy="beforeInteractive"
      />
      {tailwindConfig ? (
        <Script
          id="tailwind-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: tailwindConfig }}
        />
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <Script src="/main.js" strategy="afterInteractive" />
    </>
  );
}
