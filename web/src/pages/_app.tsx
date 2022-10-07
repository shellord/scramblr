import type { AppProps } from 'next/app';
import { SocketContext, ws } from '../context/socket';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketContext.Provider value={ws}>
      <Component {...pageProps} />
    </SocketContext.Provider>
  );
}

export default MyApp;
