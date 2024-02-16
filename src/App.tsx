import { MenuIcon } from 'lucide-react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AppProvider } from './state';
import { Button } from './components/ui/button';
import Verification from './pages/verification';
import Registration from './pages/registration';
import EmploymentInfo from './pages/employment-info';
import PersonalInformation from './pages/personal-information';

const router = createBrowserRouter([
  { path: '/', element: <Registration /> },
  { path: '/verification', element: <Verification /> },
  { path: '/personal-information', element: <PersonalInformation /> },
  { path: '/employment-info', element: <EmploymentInfo /> },
]);

export default function App() {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex items-center h-12 px-4 space-x-2 text-white bg-primary">
          <Button className="w-6 h-6 p-1" variant="default">
            <MenuIcon className="text-sm" />
          </Button>
          <p className="font-mono font-bold">Loanify</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <RouterProvider router={router} />
        </div>
      </div>
    </AppProvider>
  );
}
