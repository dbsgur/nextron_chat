import Head from "next/head";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { wrapper } from "../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/actions/user_action";
import { useRouter } from "next/router";
import { fbAuth } from "../../models/firebase_auth";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        router.push("/home");
        dispatch(clearUser());
      }
    });
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>마음의 소리</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
