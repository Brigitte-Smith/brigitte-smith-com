import Head from "next/head";

export function MetaTitle({ suffix }: { suffix?: string }): JSX.Element {
	const title = `Brigitte Smith${suffix && ` | ${suffix}`}`;
	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
}
