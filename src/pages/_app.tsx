import useAuth, { AuthProvider } from '@/auth/context';
import Header from '@/layouts/header';
import '@/styles/globals.css';
import { ChakraProvider, Text } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

const MainLayout: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { loading } = useAuth();

  if (loading) {
    return <Text fontSize={30}>loading</Text>;
  }

  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
};

export default function App(props: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <MainLayout {...props} />
      </AuthProvider>
    </ChakraProvider>
  );
}
