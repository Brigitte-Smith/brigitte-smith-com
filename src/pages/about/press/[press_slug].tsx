import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import { MetaTitle } from "../../../components/MetaTitle";
import { PressList } from "../../../components/PressList";

import { useLocalization } from "../../../context/LocalizationContext";
import { FrameLayout } from "../../../layouts/FrameLayout";
import { Locale } from "../../../lib/common";
import { getStaticPressPaths, getStaticPressProps } from "../../../lib/press";

const LOCALE: Locale = "en";

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticPressPaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticPressProps({
		locale: LOCALE,
		press_slug: params.press_slug,
	});
};

const PressPage: NextPage = ({ pressLocalizationId }) => {
	const localizations = useLocalization();

	return (
		<FrameLayout>
			<MetaTitle suffix={"title"} />
			<ReactMarkdown>
				{localizations[pressLocalizationId].content}
			</ReactMarkdown>
		</FrameLayout>
	);
};

export default PressPage;
