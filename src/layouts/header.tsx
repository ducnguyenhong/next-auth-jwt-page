import useAuth from '@/auth/context';
import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <Flex gap={5}>
      <Link href="/">Home</Link>
      {!isAuthenticated && <Link href="/login">Login</Link>}
      {isAuthenticated && (
        <Flex gap={3}>
          <Button onClick={logout}>Logout</Button>

          <Text>{user.fullName}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default memo(Header);
