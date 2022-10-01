import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { MetaTitle } from "../../components/MetaTitle";
import { useLocalization } from "../../context/LocalizationContext";
import { FrameLayout } from "../../layouts/FrameLayout";
import { getStaticAboutPaths, getStaticAboutProps } from "../../lib/about";
import type { Locale } from "../../lib/common";

const LOCALE: Locale = "en";

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticAboutPaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticAboutProps({
		locale: LOCALE,
		about_slug: params.about_slug,
	});
};

const AboutCategoryPage: NextPage = ({
	aboutCategoryLocalizationId,
}: {
	aboutCategoryLocalizationId: string;
}) => {
	const localizations = useLocalization();
	const { title, content } = localizations[aboutCategoryLocalizationId];

	return (
		<FrameLayout>
			<MetaTitle suffix={title} />
			<ReactMarkdown>{content}</ReactMarkdown>
		</FrameLayout>
	);
};

export default AboutCategoryPage;
