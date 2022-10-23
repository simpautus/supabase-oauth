import { NavLink } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import supabase from "~/utils/supabase";

const Navigation = ({ user }: { user: User | null }) => {
  return (
    <nav className="mb-10 flex justify-between bg-white px-2 py-4 shadow-md md:px-8">
      <div className="navbar-brand">
        <div className="text-3xl font-bold text-blue-400">
          <span className="text-pink-400">Happy</span> Days
        </div>
      </div>
      <div className="flex">
        <ul className="flex items-center gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "border-b-4 border-blue-400 py-1" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            {user ? (
              <div
                className="transition-color flex cursor-pointer gap-2 rounded-sm bg-gray-700 px-4 py-2 text-white duration-200 hover:bg-gray-800 md:px-6"
                onClick={() => supabase.auth.signOut()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden h-6 md:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${isActive ? "border-b-4 border-blue-400 py-1" : ""}`
                }
              >
                Login
              </NavLink>
            )}{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
