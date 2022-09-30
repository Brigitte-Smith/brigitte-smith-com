import { GetStaticPaths, GetStaticProps } from "next";

import artworkData from "../../../../dataArtwork.json";
import localizations from "../../../../locales/de.json";
import ArtworkPage from "../../work/[category_slug]/[artwork_slug]";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const paths = artworkData
		.map(({ id: categoryId, artwork }) => {
			return artwork.map(({ id }) => {
				return {
					params: {
						category_slug: localizations[categoryId].slug,
						artwork_slug: localizations[id].slug,
					},
					locale: "de",
				};
			});
		})
		.flat();
	console.log(paths);

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { artwork_slug, category_slug } = params;

	const [categoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === category_slug
	);

	const { artwork: categoryArtwork } = artworkData.find(
		({ id }) => id === categoryLocalizationId
	);

	const [artworkLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === artwork_slug
	);

	const artworkIndex = categoryArtwork.findIndex(
		({ id }) => id === artworkLocalizationId
	);

	const image = categoryArtwork[artworkIndex].images[0];

	const props = {
		artworkId: artworkLocalizationId,
		image,
		imageCount: categoryArtwork.length,
		imageIndex: artworkIndex,
	};

	const previousArtworkId = categoryArtwork[artworkIndex - 1]?.id;
	if (previousArtworkId) {
		props["previousArtworkId"] = previousArtworkId;
	}

	const nextArtworkId = categoryArtwork[artworkIndex + 1]?.id;
	if (nextArtworkId) {
		props["nextArtworkId"] = nextArtworkId;
	}

	return {
		props,
	};
};

export default ArtworkPage;
