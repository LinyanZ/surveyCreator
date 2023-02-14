import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegistrationPage from "./pages/registrationPage";
import Root from "./pages/root";
import Survey from "./components/survey";
import survey from "./survey";
import Home from "./pages/home";
import SurveyEditor from "./pages/surveyEditor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegistrationPage />,
      },
      {
        path: "survey",
        element: <Survey survey={survey} />,
      },
      {
        path: "create",
        element: <SurveyEditor />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
