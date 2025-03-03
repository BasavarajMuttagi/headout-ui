import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#f5edff] via-[#e6f0ff] to-[#e6fff0]">
      {/* Animated background (same as Landing page) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top element */}
        <div className="absolute top-0 right-0 left-0 z-0 h-full bg-[url('/noise.svg')] opacity-[0.02]"></div>
        {/* Left elements */}
        <div className="absolute top-1/4 -left-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#a78bfa]/20 to-[#8b5cf6]/20 blur-[100px]"></div>
        <div className="absolute -top-40 -right-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#93c5fd]/30 to-[#4cb0f6]/30 blur-[100px]"></div>
        {/* Bottom left elements */}
        <div className="absolute bottom-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#6ee7b7]/20 to-[#10b981]/20 blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/2 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#fff1a6]/20 to-[#ffc600]/20 blur-[100px]"></div>
        {/* Right elements */}
        <div className="absolute -top-40 -right-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#ec7acb]/20 to-[#d94ed6]/20 blur-[100px]"></div>
        <div className="absolute top-1/4 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#b0e0eb]/20 to-[#6ed6d6]/20 blur-[100px]"></div>
      </div>

      <main className="z-10 flex flex-1 items-center justify-center px-4 py-8 sm:py-0">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#4c1d95]">
            404 - Page Not Found
          </h1>
          <p className="mt-4 text-lg text-[#6d28d9]">
            We couldn't find the page you're looking for.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-[#7c3aed] px-8 py-3 text-white hover:bg-[#6d28d9]"
          >
            Go Back Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
