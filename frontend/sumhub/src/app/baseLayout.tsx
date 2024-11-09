import { LogoHolder } from "../components/ui/LandingPage";
import Link from "next/link";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen flex flex-col">
      <div className=" p-8 flex justify-between items-center">
        <Link href="/" className="cursor-pointer" aria-label="Start page">
          <LogoHolder />
        </Link>
        {/* <div>
          <Button variant="ghost" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button className="ml-2" onClick={() => router.push("/signup")}>
            Sign Up
          </Button>{" "}
        </div> */}
      </div>
      {children}
    </div>
  );
}
