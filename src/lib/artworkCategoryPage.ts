import directoryMapArtwork from "../../data/directoryMapArtwork.json";
import { getLocalizations } from "./common";
import type { Locale } from "./common";

const ARTWORK_PER_PAGE = 9;

export function getStaticArtworkCategoryPagePaths(locale: Locale) {
	const localizations = getLocalizations(locale);

	const paths = directoryMapArtwork
		.map(({ id, artwork }) => {
			const pageCount = Math.ceil(artwork.length / ARTWORK_PER_PAGE);
			return Array.apply(null, { length: pageCount }).map((i, index) => {
				return {
					params: {
						category_slug: localizations[id].slug,
						page_number: `${index + 1}`,
					},
					locale,
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
	const localizations = getLocalizations(locale);

	const [categoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === category_slug
	);

	const sortByField = localizations[categoryLocalizationId].sortBy;

	let { artwork } = directoryMapArtwork.find(
		({ id }) => id === categoryLocalizationId
	);

	artwork = artwork.map((artworkObject) => {
		return {
			...artworkObject,
			date: localizations[artworkObject.id].date ?? 0,
		};
	});

	if (sortByField === "date") {
		artwork = artwork.sort((a, b) =>
			a[sortByField] < b[sortByField] ? 1 : -1
		);
	}

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
}
