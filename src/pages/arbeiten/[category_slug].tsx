import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import directoryMapArtwork from "../../../data/directoryMapArtwork.json";
import localizations from "../../../locales/de.json";

import CategoryPage from "../work/[category_slug]";

export const getStaticPaths: GetStaticPaths = async (props) => {
	const paths = directoryMapArtwork.map(({ id }) => {
		return {
			params: {
				category_slug: localizations[id].slug,
			},
			locale: "de",
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const [categoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === params.category_slug
	);

	return {
		props: {
			categoryLocalizationId,
		},
	};
};

export default CategoryPage;
