import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from "./components/auth/registrationForm";
import LoginForm from "./components/auth/loginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
        Hello
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
        <RegistrationForm />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
