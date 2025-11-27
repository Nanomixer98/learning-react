import { RouterProvider } from 'react-router';
import { UserContextProvider } from './context/UserContext';
import { appRouter } from './router/app.router';

export const ProffessionalApp = () => {
  return (
    <UserContextProvider>
      <div className="bg-gradient">
        <RouterProvider router={appRouter} />
      </div>
    </UserContextProvider>
  );
};
