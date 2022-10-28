import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import topLevel from "../../../data/topLevel.json";

import { Locale } from "../../lib/common";
import { HomeLayout } from "../../layouts/HomeLayout";

export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "en";

export interface HomePageProps {
	content: string;
}

export function getStaticHomePageProps({ locale }: { locale: Locale }) {
	const { content } = topLevel.home[locale];

	return {
		props: {
			content,
		},
	};
}

export const getStaticProps: GetStaticProps = async () => {
	return getStaticHomePageProps({ locale: LOCALE });
};

const HomePage: NextPage<HomePageProps> = ({ content }) => {
	return (
		<HomeLayout>
			<ReactMarkdown>{content}</ReactMarkdown>
		</HomeLayout>
	);
};

export default HomePage;
