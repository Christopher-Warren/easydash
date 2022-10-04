import { useState } from "react";

import { NavLink } from "react-router-dom";
const SideBar = () => {
  const [sideToggle, setSideToggle] = useState(false);

  const handleNavClick = (e: any) => {
    setSideToggle(false);
  };
  return (
    <div
      className={`fixed top-0 w-20  h-28 z-10 bg-white dark:border-gray-100/25 transition-all duration-200  overflow-hidden lg:h-screen lg:border-r lg:shadow-xl
      ${
        sideToggle
          ? "!h-screen border-r shadow-xl  dark:bg-gray-800  dark:border-gray-100/25 "
          : "bg-transparent"
      }
      
      
      `}
    >
      <div className="lg:mt-32 mt-10">
        {/* MOBILE-ONLY Menu Button */}
        <img
          src="/mstile-150x150.png"
          alt="dashboard logo"
          className="mx-auto -m-4 hidden lg:block"
        />
        <button
          className="relative w-16 h-16 flex justify-center items-center  text-purple-500 lg:hidden"
          onClick={() => {
            setSideToggle(!sideToggle);
          }}
        >
          {!sideToggle ? (
            <svg
              className="w-12 h-12 border-2 active:bg-slate-200 border-purple-400 rounded-full shadow dark:shadow-purple-500/50 bg-white dark:bg-gray-900 p-2.5"
              xmlns="http://www.w3.org/2000/svg"
              stroke="none"
              fill="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          ) : (
            <>
              <svg
                className="w-12 h-12 border-2 active:bg-slate-200 border-purple-400 rounded-full p-2.5 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </>
          )}
        </button>
        {/* Replaces menu button with Logo on lg+ */}
        <NavLink
          onClick={handleNavClick}
          to="/dashboard"
          activeClassName="activeNav"
          exact
        >
          <div className="p-4 my-2 transition-all text-gray-500">
            <svg
              className="mx-auto w-8 h-8 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
              <span className="inline">Home</span>
            </svg>
          </div>
        </NavLink>
        {/* Products Page */}
        <NavLink
          onClick={handleNavClick}
          to="/dashboard/products"
          activeClassName="activeNav"
        >
          <div className="p-4 my-2 transition-all text-gray-500">
            <svg
              className="mx-auto w-8 h-8 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="21 8 21 21 3 21 3 8"></polyline>
              <rect x="1" y="3" width="22" height="5"></rect>
              <line x1="10" y1="12" x2="14" y2="12"></line>
            </svg>
          </div>
        </NavLink>
        <NavLink
          onClick={handleNavClick}
          to="/dashboard/orders"
          activeClassName="activeNav"
        >
          <div className="p-4 my-2 transition-all text-gray-500">
            <svg
              className="mx-auto w-8 h-8 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
        </NavLink>
        {/* <NavLink onClick={handleNavClick} to="/dashboard/users" activeClassName="activeNav">
          <div className="p-4 my-2 transition-all text-gray-500">
            <svg
              className="mx-auto w-8 h-8 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </NavLink> */}
        {/* <NavLink onClick={handleNavClick} to="/dashboard/settings" activeClassName="activeNav">
          <div className="p-4 my-2 transition-all text-gray-500">
            <svg
              className="mx-auto w-8 h-8 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
        </NavLink> */}
      </div>
    </div>
  );
};

export default SideBar;
