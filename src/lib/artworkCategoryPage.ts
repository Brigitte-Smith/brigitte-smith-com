import artworkCategoryMap from "../../data/artwork.json";
import type { Locale } from "./common";

const ARTWORK_PER_PAGE = 9;

export function getStaticArtworkCategoryPagePaths(locale: Locale) {
	const paths = artworkCategoryMap
		.map((category) => {
			const category_slug = category[locale].slug;
			const pageCount = Math.ceil(
				category[locale].artwork.length / ARTWORK_PER_PAGE
			);
			return Array.apply(null, { length: pageCount }).map((i, index) => {
				return {
					params: {
						category_slug,
						page_number: `${index + 1}`,
					},
				};
			});
		})
		.flat();

	return {
		paths,
		fallback: false,
	};
}

export function getStaticArtworkCategoryPageProps({
	locale,
	category_slug,
	page_number,
}: {
	locale: Locale;
	category_slug: string;
	page_number: number;
}) {
	const category = artworkCategoryMap.find(
		(category) => category_slug === category[locale].slug
	)![locale];
	const artwork = category.artwork;
	const pageNumber = page_number;
	const pageCount = Math.ceil(artwork.length / ARTWORK_PER_PAGE);

	const props = {
		category,
		artwork: artwork.filter(
			(x, index) =>
				index >= (page_number - 1) * ARTWORK_PER_PAGE &&
				index < page_number * ARTWORK_PER_PAGE
		),
		pageNumber,
		pageCount,
	};

	return { props };
}
