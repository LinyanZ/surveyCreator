import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegistrationPage from "./pages/registrationPage";
import Root from "./pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegistrationPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
