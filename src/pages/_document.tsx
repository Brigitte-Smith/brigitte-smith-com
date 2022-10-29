import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			const { pathname } = ctx;
			const locale = pathname.startsWith("/de") ? "de" : "en";

			return {
				...initialProps,
				locale,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang={this.props.locale}>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
