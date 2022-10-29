import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import aboutCategories from "../../../../data/about.json";

import { MetaTitle } from "../../../components/MetaTitle";
import { FrameLayout } from "../../../layouts/FrameLayout";
import { Locale } from "../../../lib/common";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "en";

interface IBiographyPageProps {
	title: string;
	content: string;
}

export function getStaticBiographyPageProps({ locale }: { locale: Locale }) {
	const { title, content } = aboutCategories.biography[locale];

	return {
		props: { title, content },
	};
}

export const getStaticProps: GetStaticProps = async () => {
	return getStaticBiographyPageProps({ locale: LOCALE });
};

const BiographyPage: NextPage<IBiographyPageProps> = ({ title, content }) => {
	return (
		<FrameLayout>
			<MetaTitle suffix={title} />
			<ReactMarkdown>{content}</ReactMarkdown>
		</FrameLayout>
	);
};

export default BiographyPage;
