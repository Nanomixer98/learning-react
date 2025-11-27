import { use } from 'react';
import { Link } from 'react-router';
import { Button } from '../../../components/ui/button';
import { UserContext } from '../../context/UserContext';

export const AboutPage = () => {
  const { isAuthenticated, logout } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Page about me</h1>
      <hr />
      <div className="flex flex-col gap-2">
        {isAuthenticated && (
          <Link
            to="/profile"
            className="hover:text-blue-500 underline text-2xl"
          >
            Profile
          </Link>
        )}

        {isAuthenticated && (
          <Button variant="destructive" className="mt-4" onClick={logout}>
            Exit
          </Button>
        )}
        {!isAuthenticated && (
          <Link to="/login" className="hover:text-blue-500 underline text-2xl">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
