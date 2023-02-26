import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [collapse, setCollapse] = useState(true);

  // sm:flex-row flex-wrap items-center w-full h-full max-w-5xl gap-16 p-8 mx-auto text-xl
  return (
    <nav
      className={`shadow-[0px_0px_10px_2px_rgba(0,0,0,0.05)] ${
        collapse ? "h-[60px]" : "h-[260px]"
      } sm:h-[92px] flex flex-col sm:flex-row py-[10px] px-8 transition-all overflow-hidden absolute top-0 w-full z-10 bg-white`}
    >
      <button
        className={`h-[40px] sm:hidden ml-auto mb-[10px] ${
          collapse ? "rotate-0" : "rotate-180"
        } transition-transform`}
        title={collapse ? "expand" : "collapse"}
        onClick={() => setCollapse(!collapse)}
      >
        <img
          src="/icons/down.svg"
          alt={collapse ? "expand" : "collapse"}
          className="h-full aspect-square"
        />
      </button>
      <ul className="flex flex-col gap-y-8 flex-grow text-2xl sm:flex-row sm:gap-x-16 sm:text-2xl sm:max-w-5xl sm:mx-auto sm:w-full sm:h-full sm:my-0 sm:items-center">
        <li>
          <NavLink to="" onClick={() => setCollapse(true)}>
            Home
          </NavLink>
        </li>
        {user?.isAdmin && (
          <li>
            <NavLink to="create" onClick={() => setCollapse(true)}>
              Create Survey
            </NavLink>
          </li>
        )}
        {!user ? (
          <>
            <li className="sm:ml-auto">
              <NavLink to="login" onClick={() => setCollapse(true)}>
                Login
              </NavLink>
            </li>
            <li className="">
              <NavLink to="register" onClick={() => setCollapse(true)}>
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li className="sm:ml-auto" onClick={() => setCollapse(true)}>
            <button onClick={() => logout()}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
