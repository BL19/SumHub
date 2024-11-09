import { Button } from "@/components/ui/button"
import { LandingText, SearchInput, LogoHolder } from '../components/ui/LandingPage.js'
import { useRouter } from "next/router.js";
import "@/app/globals.css";
export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to the login page
    router.push("/login"); // Replace '/login' with your desired path
  };

  const handleSignUp = () => {
    // Navigate to the sign-up page
    router.push("/signup"); // Replace '/signup' with your desired path
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-8 flex justify-between items-center">
        <LogoHolder />
        <div>
          <Button variant="ghost" onClick={handleLogin}>Login</Button>
          <Button className="ml-2" onClick={handleSignUp}>Sign Up</Button>
        </div>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md p-9 space-y-4 text-center">
          <LandingText />
          <SearchInput />
        </div>
      </div>
    </div>
  );
}