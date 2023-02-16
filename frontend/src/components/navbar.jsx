import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.05)]">
      <ul className="flex flex-wrap items-center w-full h-full max-w-5xl gap-16 p-8 mx-auto text-xl">
        <li>
          <NavLink to="">Home</NavLink>
        </li>
        <li>
          <NavLink to="survey">Survey</NavLink>
        </li>
        <li>
          <NavLink to="create">Create Survey</NavLink>
        </li>
        <li className="ml-auto">
          <NavLink to="login">Login</NavLink>
        </li>
        <li className="">
          <NavLink to="register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
}
