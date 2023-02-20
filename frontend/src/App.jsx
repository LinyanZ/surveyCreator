import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegistrationPage from "./pages/registrationPage";
import Root from "./pages/root";
import Survey from "./components/survey";
import Home from "./pages/home";
import SurveyEditor from "./pages/surveyEditor";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

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
        path: "surveys/:id",
        element: <Survey />,
      },
      {
        path: "create",
        element: <SurveyEditor />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
