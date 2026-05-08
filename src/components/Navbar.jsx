import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-[#9B1B30] flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l7 14h-14l7-14z"/></svg>
            FindYourThing
          </Link>
          <Link to="/browse" className={`hidden sm:block font-medium text-sm transition-colors ${isActive("/browse") ? "text-[#9B1B30] bg-[#FFF0E6] px-4 py-2 rounded-full" : "text-gray-500 hover:text-gray-900 px-4 py-2"}`}>Browse Items</Link>
        </div>
        <Link to="/report" className="bg-[#9B1B30] hover:bg-[#801527] text-white font-medium px-5 py-2.5 rounded-full transition-colors text-sm flex items-center gap-2">
          <span>+</span> Report Item
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
