import { useRouter } from "next/router";
import DefaultLayout from "../app/baseLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import constants from "../lib/constants";
import { SearchResult } from "../models/SearchResult";
import fetchJson from "../lib/fetchJson";
import "@/app/globals.css";
import styles from "@/app/ui/search.module.css";
import { useEffect, useState } from "react";
import Meta from "../components/Meta";

export async function getServerSideProps(context: any) {
  const { q } = context.query;
  return {
    props: {
      term: q,
    },
  };
}

export default function Results({ term }: { term: string }) {
  const router = useRouter();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string>("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchResults(term)
      .then((results) => {
        setResults(results);
        setNotFound(results.length === 0);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [term]);

  return (
    <DefaultLayout>
      <Meta
        title={term + " | Sumhub"}
        description={"Search results for " + term + " on Sumhub"}
        url={"https://sumhub.bl19.cloud/search?q=" + term}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const newTerm = formData.get("term");
          if (
            newTerm &&
            typeof newTerm === "string" &&
            newTerm.length > 0 &&
            term !== newTerm
          ) {
            router.push(`/search?q=${newTerm}`);
          }
        }}
      >
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-md p-6 space-y-4 text-cente">
            <div className="flex max-w-sm items-center justify-center space-x-2">
              <Input
                type="text"
                placeholder="E.g. Computer Science"
                name="term"
                defaultValue={term}
                aria-label="Search Input"
                maxLength={100}
              />
              <Button type="submit">Search</Button>
            </div>
          </div>
        </div>
      </form>

      {/* Just a spacer */}
      <div className="mt-16"></div>

      {loading ? (
        <LoadingContent />
      ) : error ? (
        <ErrorContent error={error} />
      ) : notFound ? (
        <NotFoundContent />
      ) : (
        <ResultsContent results={results} />
      )}
    </DefaultLayout>
  );
}

async function fetchResults(term: string): Promise<SearchResult[]> {
  return await fetchJson<SearchResult[]>(
    constants.api_url + "v1/paper/search",
    {
      body: JSON.stringify({
        term,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

function LoadingContent() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Loading</h1>
      <div
        className={`grid grid-cols-1 gap-4 mt-4 ${styles.searchResultContainer}`}
      >
        <SkeletonResult />
        <SkeletonResult />
        <SkeletonResult />
      </div>
    </div>
  );
}

function SkeletonResult() {
  return (
    <div
      className={`bg-white shadow-md rounded-md p-4 hover:shadow-lg ${styles.minWidthBox} ${styles.minHeightBox}`}
    >
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1 min-w-md">
          <div className="h-4 bg-gray-200 rounded w-3/4 min-h-8 "></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded min-h-16 "></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 min-h-10 "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorContent({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Error</h1>
      <p className="text-lg text-gray-600 mt-4">{error}</p>
    </div>
  );
}

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">No results found</p>
    </div>
  );
}

function ResultsContent({ results }: { results: SearchResult[] }) {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Results</h1>
      <div
        className={`grid grid-cols-1 gap-4 mt-4 ${styles.searchResultContainer}`}
      >
        {results.map((result) => (
          <Result key={result.data.id} result={result} />
        ))}
      </div>
    </div>
  );
}

function Result({ result }: { result: SearchResult }) {
  const primarySuject = result.data.subjects[0];
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      key={result.data.id}
      className="bg-white shadow-md rounded-md p-4 hover:shadow-lg"
      aria-label="Result"
      aria-description="Paper details"
    >
      <h2 className="text-xl font-bold" aria-label="Title" title="Title">
        {result.data.title}
      </h2>
      <div className="mt-2 text-sm text-gray-600" aria-label="Authors" title="Authors">
        <div>
          {" "}
          {result.data.authors.map((author, i) => (
            <>
              {i != 0 ? ", " : ""}
              <span
                key={author}
                aria-label="Author"
              >
                {author}
              </span>
            </>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          {" "}
          <span
            key="pubDate"
            className="text-sm text-gray-600 mr-2"
            aria-label="Publish Date"
            title="Publish Date"
          >
            {new Date(result.data.publishDate).toLocaleDateString()}
          </span>
          <span
            key="primarySubject"
            className="text-sm text-gray-600 mr-2"
            aria-label="Primary subject"
            title="Primary subject"
          >
            {primarySuject}
          </span>
        </div>
        <div className="pb-2 pr-2  max-w-6">
          <div className="flex flex-col mt-6 -ml-2 cursor-pointer">
            <Button
              variant="ghost"
              onClick={() => setExpanded(!expanded)}
              aria-label="Show More Button"
              title="Show More"
            >
              <div
                className={`${styles["expand-icon"]} max-w-2 ${
                  expanded ? styles["expanded"] : ""
                }`}
              ></div>
            </Button>
          </div>
        </div>
      </div>

      {expanded && (
        <>
          <p
            className="text-gray-800 mt-2"
            aria-label="Abstract"
            title="Abstract"
          >
            {result.data.abstract}
          </p>

          <div
            className="mt-4 text-sm text-gray-600"
            aria-label="All Subjects"
            title="All Subjects"
          >
            {result.data.subjects.map((subject, i) => (
              <>
                {i != 0 ? ", " : ""}
                <span
                  key={subject}
                  aria-label="Subject"
                >
                  {subject}
                </span>
              </>
            ))}
          </div>
          <div className="flex flex-col mt-4">
            <a
              href={result.data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
              aria-label="Read More Button"
            >
              Read More
            </a>
          </div>
        </>
      )}
    </div>
  );
}
