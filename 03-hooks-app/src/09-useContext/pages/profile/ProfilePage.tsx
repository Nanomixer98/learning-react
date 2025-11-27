import { use } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/ui/button';
import { UserContext } from '../../context/UserContext';

export const ProfilePage = () => {
  // const { user } = useContext(UserContext);
  const navigator = useNavigate();
  const { user, logout } = use(UserContext);

  const handleExit = () => {
    logout();
    navigator('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">User Profile</h1>
      <hr />
      <pre className="my-4 w-[50%] overflow-x-auto">
        {JSON.stringify(user, null, 2)}
      </pre>

      <Button variant="destructive" onClick={handleExit}>
        Exit
      </Button>
    </div>
  );
};
