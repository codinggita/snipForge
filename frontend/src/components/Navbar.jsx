import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  // Tailwind class helpers
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-indigo-400 border-b-2 border-indigo-400 pb-0.5"
        : "text-gray-300 hover:text-white"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      isActive
        ? "text-indigo-400 bg-indigo-400/10"
        : "text-gray-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand ── */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-1.5 group"
          >
            <span className="text-indigo-400 font-mono text-lg font-bold leading-none transition-colors duration-200 group-hover:text-violet-400">
              {"</>"}
            </span>
            <span className="text-white text-xl font-extrabold tracking-tight">
              SnipForge
            </span>
          </NavLink>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {/* Logged-in links */}
                <NavLink to="/" className={navLinkClass} end>
                  Explore
                </NavLink>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>

                {/* Greeting */}
                <span className="text-gray-400 text-sm select-none">
                  Hey,{" "}
                  <span className="text-white font-semibold">
                    {user.displayName || user.email?.split("@")[0] || "User"}
                  </span>
                </span>

                {/* New Snippet CTA */}
                <NavLink
                  to="/create"
                  className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md shadow-indigo-900/40"
                >
                  <span className="text-base leading-none">+</span>
                  New Snippet
                </NavLink>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest buttons */}
                <NavLink
                  to="/login"
                  className="text-sm font-semibold text-gray-300 border border-gray-600 hover:border-indigo-400 hover:text-indigo-400 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md shadow-indigo-900/40"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 bg-gray-900 border-t border-gray-700/60 flex flex-col gap-1">
          {user ? (
            <>
              {/* Greeting */}
              <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Hey,{" "}
                <span className="text-indigo-400">
                  {user.displayName || user.email?.split("@")[0] || "User"}
                </span>
              </p>

              <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu} end>
                Explore
              </NavLink>
              <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={closeMenu}>
                Dashboard
              </NavLink>
              <NavLink
                to="/create"
                onClick={closeMenu}
                className="flex items-center gap-1 mt-1 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <span>+</span> New Snippet
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-left px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className="block mt-1 text-center bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
