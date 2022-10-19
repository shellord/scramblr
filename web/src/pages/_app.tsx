import type { AppProps } from "next/app";
import SocketProvider from "../context/socket";
import "../styles/globals.css";

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

if (!WEBSOCKET_URL) {
  throw new Error("WEBSOCKET_URL is not set");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider url={WEBSOCKET_URL!} reconnectInterval={1000}>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
