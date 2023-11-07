import useAuth from '@/auth/context';
import { Box, Button } from '@chakra-ui/react';
import { NextPage } from 'next';

const Login: NextPage = () => {
  const { login } = useAuth();
  return (
    <Box>
      <Button onClick={login}>Login</Button>
    </Box>
  );
};

export default Login;
