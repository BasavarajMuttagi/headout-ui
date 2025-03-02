import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="z-10 w-full px-4 py-4 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-xs text-[#6d28d9] sm:text-sm">
          © {new Date().getFullYear()} Globetrotter Challenge
        </p>
        <div className="flex gap-4">
          <Button
            variant="link"
            className="h-auto p-0 text-xs text-[#6d28d9] hover:text-[#4c1d95] sm:text-sm"
            asChild
          >
            <Link to="/privacy">Privacy</Link>
          </Button>
          <Button
            variant="link"
            className="h-auto p-0 text-xs text-[#6d28d9] hover:text-[#4c1d95] sm:text-sm"
            asChild
          >
            <Link to="/terms">Terms</Link>
          </Button>
          <Button
            variant="link"
            className="h-auto p-0 text-xs text-[#6d28d9] hover:text-[#4c1d95] sm:text-sm"
            asChild
          >
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
