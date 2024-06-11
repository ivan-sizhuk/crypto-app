import Link from "next/link";
import CoinSearchInput from "./CoinSearchInput"; // Adjust the import path as needed

export default function Navbar() {
  return (
    <nav className="px-8 flex items-center justify-between w-full py-4 fixed top-0 bg-gray-800 bg-opacity-10 backdrop-blur-md z-20">
      {/* Logo */}
      <div className="hidden md:flex text-4xl text-purple-500">
        <a href="/">{"cryptico."}</a>
      </div>

      {/* Links */}
      <div className="md:flex space-x-6 pl-6 pr-3">
        <Link legacyBehavior href="/exchange">
          <a className="text-white hover:text-gray-400 transition duration-200 ease-in-out">Exchange</a>
        </Link>
        <Link legacyBehavior href="/portfolio">
          <a className="text-white hover:text-gray-400 transition duration-200 ease-in-out">Portfolio</a>
        </Link>
      </div>

      {/* Search Input */}
      <div className="flex-1 md:ml-4">
        <CoinSearchInput />
      </div>
    </nav>
  );
}
