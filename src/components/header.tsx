import Link from "next/link";

export function Header({ currentTime }: { currentTime: string }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black">
      <div className="relative flex items-center h-[41px]">
        <div className="absolute left-0 px-2 sm:px-4 py-2 text-xs sm:text-sm border-r border-black h-full flex items-center">
          {currentTime}
        </div>
        <div className="w-full flex justify-center items-center px-4 py-2 h-full">
          <h1 className="text-sm">
            <Link href="/" className="hover:underline">
              CH&apos;LITA
            </Link>
          </h1>
        </div>
        <nav className="absolute right-0 border-l border-black h-full">
          <ul className="flex text-xs sm:text-sm h-full">
            {["WORK", "ABOUT", "CONTACT"].map((item) => (
              <li
                key={item}
                className="border-r border-black last:border-r-0 h-full flex"
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="px-2 sm:px-4 py-2 hover:underline flex items-center"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
