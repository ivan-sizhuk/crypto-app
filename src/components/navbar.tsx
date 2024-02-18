import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-4 px-14 fixed top-0 w-full bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-md">
      <div className="flex items-center justify-between mx-auto">
        {/* Logo */}
        <div>
          <img className="h-14" src="https://i.ibb.co/mGQFfbn/Screenshot-2024-02-18-at-3-30-17-PM.png" alt="Logo" />
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6 pl-6 pr-3">
          <Link legacyBehavior href="/coins">
            <a className="text-white hover:text-gray-400 transition duration-200 ease-in-out">Coins</a>
          </Link>
          <Link legacyBehavior href="/exchange">
            <a className="text-white hover:text-gray-400 transition duration-200 ease-in-out">Exchange</a>
          </Link>
          <Link legacyBehavior href="/portfolio">
            <a className="text-white hover:text-gray-400 transition duration-200 ease-in-out">Portfolio</a>
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex-1 md:ml-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-md text-white rounded-md focus:outline-none transition duration-200 ease-in-out hover:bg-opacity-20 hover:border-glow"
          />
        </div>
      </div>
    </nav>
  );
}
