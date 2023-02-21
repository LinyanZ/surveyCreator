import { NavLink } from "react-router-dom";
import { logout } from "../api/users";
import { useAuth } from "../context/auth";

export default function Navbar() {
  const [user, setUser] = useAuth();

  return (
    <nav className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.05)]">
      <ul className="flex flex-wrap items-center w-full h-full max-w-5xl gap-16 p-8 mx-auto text-xl">
        <li>
          <NavLink to="">Home</NavLink>
        </li>
        {user?.isAdmin && (
          <li>
            <NavLink to="create">Create Survey</NavLink>
          </li>
        )}
        {!user ? (
          <>
            <li className="ml-auto">
              <NavLink to="login">Login</NavLink>
            </li>
            <li className="">
              <NavLink to="register">Register</NavLink>
            </li>
          </>
        ) : (
          <li className="ml-auto">
            <button
              onClick={() => {
                setUser(null);
                logout();
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
