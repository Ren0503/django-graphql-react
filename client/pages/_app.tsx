import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Head from "../src/components/main-ui/Head";
import store from "../src/redux/store";
import { getInitialTheme } from "../src/utils/getInitialTheme";
import { toggleTheme } from "../src/utils/toggleTheme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const dark = getInitialTheme() === "dark";
    toggleTheme(dark);
  });
  return (
    <ReduxProvider store={store}>
      <Head />
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
export default MyApp;
