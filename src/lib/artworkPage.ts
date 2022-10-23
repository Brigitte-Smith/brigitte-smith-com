import artworkCategoryMap from "../../data/artwork.json";
import type { Locale } from "./common";

export function getStaticArtworkPagePaths(locale: Locale) {
	const paths = artworkCategoryMap
		.map((category) => {
			const category_slug = category[locale].slug;
			return category[locale].artwork.map((artwork) => {
				const artwork_slug = artwork.slug;
				return {
					params: {
						artwork_slug,
						category_slug,
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

export function getStaticArtworkPageProps({
	locale,
	category_slug,
	artwork_slug,
}: {
	locale: Locale;
	category_slug: string;
	artwork_slug: string;
}) {
	const category = artworkCategoryMap.find(
		(category) => category_slug === category[locale].slug
	)![locale];
	const artworkIndex = category.artwork.findIndex(
		(artwork) => artwork_slug === artwork.slug
	);
	const artwork = category.artwork[artworkIndex];
	const previousArtwork = category.artwork[artworkIndex - 1];
	const nextArtwork = category.artwork[artworkIndex + 1];

	const props = {
		category,
		artwork,
		artworkIndex,
	};

	if (previousArtwork) {
		props["previousArtwork"] = previousArtwork;
	}

	if (nextArtwork) {
		props["nextArtwork"] = nextArtwork;
	}

	return { props };
}
