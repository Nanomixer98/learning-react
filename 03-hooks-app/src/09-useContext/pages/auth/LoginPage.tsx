import { useContext, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { UserContext } from '../../context/UserContext';

export const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [userId, setUserId] = useState('');

  const navigation = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = login(+userId);

    if (!result) {
      toast.error('User Not Found');
      return;
    }

    navigation('/profile');
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Login</h1>
      <hr />
      <form className="flex flex-col gap-2 my-10" onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <Button type="submit" disabled={!userId}>
          Login
        </Button>
      </form>

      <Link to="/about">
        <Button variant="ghost">Return to main page</Button>
      </Link>
    </div>
  );
};
