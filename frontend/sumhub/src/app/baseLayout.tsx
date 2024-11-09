import { LogoHolder } from "../components/ui/LandingPage";
import { Button } from "../components/ui/button";
// Define the prop types for DefaultLayout

interface DefaultLayoutProps {
  children: React.ReactNode;
  onClickfun: () => void; // Type for onClick handler
}

export default function DefaultLayout({
  children,
  onClickfun, // Destructure the props
}: DefaultLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-8 flex justify-between items-center">
        <LogoHolder />
        <div>
          <Button variant="ghost" onClick={onClickfun}>
            Login
          </Button>
          <Button className="ml-2">Sign Up</Button>
        </div>
      </div>
      {children}
    </div>
  );
}