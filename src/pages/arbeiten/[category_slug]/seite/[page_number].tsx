import type { GetStaticPaths, GetStaticProps } from "next";

import artworkData from "../../../../../dataArtwork.json";
import localizations from "../../../../../locales/de.json";
import CategoryNumberedPage from "../../../work/[category_slug]/page/[page_number]";

const ARTWORK_PER_PAGE = 9;

export const getStaticPaths: GetStaticPaths = async (props) => {
	const paths = artworkData
		.map(({ id, artwork }) => {
			const pageCount = Math.ceil(artwork.length / ARTWORK_PER_PAGE);
			return Array.apply(null, { length: pageCount }).map((i, index) => {
				return {
					params: {
						category_slug: localizations[id].slug,
						page_number: `${index + 1}`,
					},
					locale: "de",
				};
			});
		})
		.flat();

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { page_number, category_slug } = params;

	const [categoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === category_slug
	);

	let { artwork } = artworkData.find(
		({ id }) => id === categoryLocalizationId
	);
	const pageCount = Math.ceil(artwork.length / ARTWORK_PER_PAGE);
	artwork = artwork.filter(
		(artwork, index) =>
			index >= (page_number - 1) * ARTWORK_PER_PAGE &&
			index < page_number * ARTWORK_PER_PAGE
	);

	return {
		props: {
			categoryLocalizationId,
			artwork,
			pageCount,
		},
	};
};

export default CategoryNumberedPage;
