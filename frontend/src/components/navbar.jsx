import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="h-[4rem] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.05)]">
      <ul className="flex gap-8 text-xl h-full items-center max-w-5xl mx-auto">
        <li>
          <NavLink to="">Home</NavLink>
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
