import { Button } from "@/components/ui/button";
import {
  LandingText,
} from "../components/ui/LandingPage.js";
import { useRouter } from "next/router.js";
import "@/app/globals.css";
import DefaultLayout from "@/app/baseLayout";
import { Input } from "@/components/ui/input";
export default function Home() {
  const router = useRouter();

  // const handleLogin = () => {
  //   // Navigate to the login page
  //   router.push("/login"); // Replace '/login' with your desired path
  // };

  // const handleSignUp = () => {
  //   // Navigate to the sign-up page
  //   router.push("/signup"); // Replace '/signup' with your desired path
  // };

  return (
    <DefaultLayout>
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md p-9 space-y-4 text-center">
          <LandingText />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const term = formData.get("term");
              router.push(`/search?q=${term}`);
            }}
          >
            <div className="flex max-w-sm items-center justify-center space-x-2">
              <Input
                type="text"
                placeholder="E.g. Computer Science"
                name="term"
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
