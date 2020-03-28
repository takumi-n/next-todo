import { AppProps } from "next/app";
import { CssBaseline } from "@material-ui/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
