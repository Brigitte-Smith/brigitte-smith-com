import Head from "next/head";

export function MetaTitle({ suffix }: { suffix?: string }): JSX.Element {
	return (
		<Head>
			<title>Brigitte Smith{suffix && ` | ${suffix}`}</title>
		</Head>
	);
}
