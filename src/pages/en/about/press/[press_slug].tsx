import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { MetaTitle } from "../../../../components/MetaTitle";
import { useLocalization } from "../../../../context/LocalizationContext";
import { FrameLayout } from "../../../../layouts/FrameLayout";
import type { Locale } from "../../../../lib/common";
import pressArticles from "../../../../../data/press.json";
import { Iframe } from "../../../../components/Iframe";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "en";

interface IPressPageProps {
	title: string;
	content: string;
	language?: Locale;
	files?: string[];
}

export function getStaticPressPaths(locale: Locale) {
	const paths = pressArticles.map((pressArticle) => {
		return {
			params: {
				press_slug: pressArticle[locale].slug,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticPressPaths(LOCALE);
};

export function getStaticPressProps({
	locale,
	press_slug,
}: {
	locale: Locale;
	press_slug: string;
}) {
	const press = pressArticles.find(
		(pressArticle) => pressArticle[locale].slug === press_slug
	)![locale];
	const { title, content, language = "en", files } = press;

	return {
		props: { title, content, language, files },
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticPressProps({
		locale: LOCALE,
		press_slug: params.press_slug,
	});
};

const PressPage: NextPage<IPressPageProps> = ({
	title,
	content,
	language,
	files,
}) => {
	const { locale, localizations } = useLocalization();

	return (
		<FrameLayout>
			<MetaTitle suffix={title} />
			<div lang={language !== locale && language}>
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
			{files && files.length > 0 && <Iframe src={`/${files[0]}`} />}
		</FrameLayout>
	);
};

export default PressPage;
