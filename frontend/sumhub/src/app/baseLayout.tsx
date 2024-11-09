import { useRouter } from "next/router";
import { LogoHolder } from "../components/ui/LandingPage";
import { Button } from "../components/ui/button";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <div className=" p-8 flex justify-between items-center">
        <a onClick={() => router.push("/")} className="cursor-pointer">
          <LogoHolder />
        </a>
        <div>
          <Button variant="ghost" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button className="ml-2" onClick={() => router.push("/signup")}>
            Sign Up
          </Button>{" "}
        </div>
      </div>
      {children}
    </div>
  );
}
