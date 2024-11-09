import { LogoHolder } from "../components/ui/LandingPage";
import { Button } from "../components/ui/button";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="min-h-screen flex flex-col">
      <div className=" p-8 flex justify-between items-center">
        <LogoHolder></LogoHolder>
        <div>
          <Button variant="ghost">Login</Button>
          <Button className="ml-2">Sign Up</Button>{" "}
        </div>
      </div>
      {children}
    </div>
    
  );
}
