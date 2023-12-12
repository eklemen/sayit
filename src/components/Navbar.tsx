import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="px-4 flex justify-center w-full">
      <nav
        className="
          flex flex-wrap
          max-w-[1100px]
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-6
          text-lg text-gray-700
          bg-white
        "
      >
        <div>
          <Link to="/">
            <div className="flex items-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
              <p className="ml-2">Sayit</p>
            </div>
          </Link>
        </div>

        <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
          <ul
            className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between
              md:pt-0"
          >
            <li>
              <Link className="md:p-4 py-2 block hover:text-purple-400" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="md:p-4 py-2 block hover:text-purple-400" to="/manage">
                Manage words
              </Link>
            </li>
            <li>
              <Link className="md:p-4 py-2 block hover:text-purple-400" to="/">
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                to="/"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
