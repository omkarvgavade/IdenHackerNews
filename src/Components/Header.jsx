import React from "react";
import { NavLink } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-dark text-white dark:bg-gray-800 transition-colors shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <Newspaper className="w-6 h-6" />
              <span>Hacker News</span>
            </NavLink>

            <div className="flex gap-6 text-sm">
              <NavLink
                to="/top"
                className={({ isActive }) =>
                  `hover:text-blue-200 ${isActive ? "text-blue-200" : ""}`
                }
              >
                Top
              </NavLink>
              <NavLink
                to="/new"
                className={({ isActive }) =>
                  `hover:text-blue-200 ${isActive ? "text-blue-200" : ""}`
                }
              >
                New
              </NavLink>
              <NavLink
                to="/best"
                className={({ isActive }) =>
                  `hover:text-blue-200 ${isActive ? "text-blue-200" : ""}`
                }
              >
                Best
              </NavLink>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
