import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegistrationPage from "./pages/registrationPage";
import Root from "./pages/root";
import Survey from "./pages/survey";
import SurveySubmissions from "./pages/surveySubmissions";
import Home from "./pages/home";
import SurveyEditor from "./pages/surveyEditor";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./context/auth";
import ProtectedRoute from "./components/protectedRoute";

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
        path: "surveys/:id/submissions",
        element: <SurveySubmissions />,
      },
      {
        path: "create",
        element: (
          <ProtectedRoute admin>
            <SurveyEditor />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
