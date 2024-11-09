import Head from "next/head";


export interface SiteMeta {
    title: string;
    description: string;
    url: string;
}

export default function Meta(meta: SiteMeta) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta name="title" content={meta.title} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={meta.url} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={meta.url} />
            <meta property="twitter:title" content={meta.title} />
            <meta property="twitter:description" content={meta.description} />
        </Head>
    );
}