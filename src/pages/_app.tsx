import type { AppProps } from "next/app";
import Head from "next/head";

import { GlobalStyle } from "../components/Global";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Brigitte Smith</title>
			</Head>
			<GlobalStyle />
			<Component {...pageProps} />{" "}
		</>
	);
}

export default MyApp;
