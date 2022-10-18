import { Head, Html, Main, NextScript } from "next/document";

function Document({ __NEXT_DATA__ }: any) {
	return (
		<Html lang={__NEXT_DATA__.page.startsWith("/en") ? "en" : "de"}>
			<Head></Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default Document;
