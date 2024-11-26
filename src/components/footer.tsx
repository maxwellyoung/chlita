import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-black">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <p className="text-sm">©2024 CHLITACORP</p>
          <p className="text-sm sm:ml-4">ALL RIGHTS RESERVED</p>
        </div>
        <p className="text-xs text-gray-500">
          Site by{" "}
          <Link
            href="https://dev.maxwellyoung.info"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maxwell Young
          </Link>
        </p>
      </div>
    </footer>
  );
}
