import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

import { useState, useEffect } from "react";

import {
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(() => {
      return (
        localStorage.getItem(
          "theme"
        ) !== "light"
      );
    });

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-64
          transform transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-300"
          }
          border-r
          p-6 flex flex-col justify-between
        `}
      >

        <div>

          {/* Logo + Close */}
          <div className="flex items-center justify-between">

            <h1 className="text-3xl font-bold text-blue-500">
              Smart Leads
            </h1>

            <button
              className="lg:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <X size={28} />
            </button>

          </div>

          {/* Navigation */}
          <nav className="mt-10 space-y-3">

            <NavLink
              to="/dashboard"
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-700 hover:bg-slate-200"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/leads"
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-700 hover:bg-slate-200"
                }`
              }
            >
              Leads
            </NavLink>

            <NavLink
              to="/analytics"
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-700 hover:bg-slate-200"
                }`
              }
            >
              Analytics
            </NavLink>

          </nav>
        </div>

        {/* Bottom Buttons */}
        <div className="space-y-3">

          {/* Theme Toggle */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition font-medium ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-200 hover:bg-slate-300"
            }`}
          >

            {darkMode ? (
              <>
                <Sun size={18} />
                Light Mode
              </>
            ) : (
              <>
                <Moon size={18} />
                Dark Mode
              </>
            )}

          </button>

          {/* Logout */}
          <button
            className="w-full px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-medium"
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              window.location.href =
                "/login";
            }}
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile Navbar */}
        <header
          className={`
            lg:hidden flex items-center justify-between
            px-4 py-4 border-b
            ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-300"
            }
          `}
        >

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu size={28} />
          </button>

          <h1 className="text-xl font-bold text-blue-500">
            Smart Leads
          </h1>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? (
              <Sun size={24} />
            ) : (
              <Moon size={24} />
            )}
          </button>

        </header>

        {/* Page Content */}
         <main
            className={`
              flex-1
              p-4 sm:p-6 lg:p-8
              overflow-y-auto
              transition-colors duration-300
              ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }
            `}
          >
            {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;