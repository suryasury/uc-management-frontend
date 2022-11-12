import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from "./components/user/user";
import Dashboard from "./components/dashBoard/dashboard";
import CompanyDetails from "./components/companyDetails/companyDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/company/:companyId",
      element: <CompanyDetails />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
