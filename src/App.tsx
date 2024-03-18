import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppProvider } from "./state";
import Navbar from "./components/navbar";
import SoftOffer from "./pages/soft-offer";
import Registration from "./pages/registration";
import Verification from "./pages/verification";
import EmploymentInfo from "./pages/employment-info";
import LoadRequirement from "./pages/loan-requirement";
import PersonalInformation from "./pages/personal-information";
import Documents from "./pages/documents";
import FinancialInfo from "./pages/financial-info";

const router = createBrowserRouter([
  { path: "/", element: <Registration /> },
  { path: "/verification", element: <Verification /> },
  { path: "/personal-information", element: <PersonalInformation /> },
  { path: "/employment-info", element: <EmploymentInfo /> },
  { path: "/loan-requirement", element: <LoadRequirement /> },
  { path: "/soft-offer", element: <SoftOffer /> },
  { path: "/documents", element: <Documents /> },
  { path: "/financial-info", element: <FinancialInfo /> },
]);

export default function App() {
  return (
    <AppProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <RouterProvider router={router} />
        </div>
      </div>
    </AppProvider>
  );
}
