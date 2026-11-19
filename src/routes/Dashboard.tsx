import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Timetable", path: "timetable" },
  { name: "Assignments", path: "assignments" },
  { name: "Activities", path: "activities" },
  { name: "Notebook", path: "notebook" },
  { name: "Groups", path: "groups" },
  { name: "Profile", path: "profile" },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <nav className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col">
        <div className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block py-2 px-4 rounded hover:bg-primary-100 dark:hover:bg-primary-900 " +
                (isActive ? "bg-primary-200 dark:bg-primary-700 font-medium" : "")`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <button
          onClick={() => {
            // simple sign‑out
            if (user) {
              // Firebase signOut is handled in AuthContext
            }
          }}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
