import type { AppProps } from "next/app";
import Head from "next/head";

import { GlobalStyle } from "../components/Global";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Brigitte Smith</title>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
			</Head>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
