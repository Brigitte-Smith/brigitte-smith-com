import Head from "next/head";
import { ReactNode } from "react";

import { GlobalStyle } from "../Global";

export function BaseLayout({ children }: { children: ReactNode }): JSX.Element {
	return (
		<>
			<Head>
				<title>Brigitte Smith</title>
			</Head>
			<GlobalStyle />
			{children}
		</>
	);
}
