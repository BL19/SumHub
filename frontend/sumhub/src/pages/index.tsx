import { Button } from "@/components/ui/button";
import { LandingText } from "../components/ui/LandingPage.js";
import { useRouter } from "next/router.js";
import "@/app/globals.css";
import DefaultLayout from "@/app/baseLayout";
import { Input } from "@/components/ui/input";
import Meta from "@/components/Meta";
export default function Home() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <Meta
        title="Sumhub - A search engine for research papers"
        description="Speed Up your Research Game with Sumhub. Find research papers fast. Our AI searches and summarizes studies in seconds, streamlining your research."
        url="https://sumhub.bl19.cloud/"
      />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md p-9 space-y-4 text-center">
          <LandingText />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const term = formData.get("term");
              if (term && typeof term === "string" && term.length > 0) {
                router.push(`/search?q=${term}`);
              }
            }}
          >
            <div className="flex max-w-sm items-center justify-center space-x-2">
              <Input
                type="text"
                placeholder="E.g. Computer Science"
                name="term"
                aria-label="Search Input"
                maxLength={100}
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
