import { AppProps } from "next/app";
import { CssBaseline } from "@material-ui/core";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
