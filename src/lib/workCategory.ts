import directoryMapArtwork from "../../data/directoryMapArtwork.json";
import { getLocalizations } from "./common";
import type { Locale } from "./common";

export function getStaticWorkPaths(locale: Locale) {
	const localizations = getLocalizations(locale);

	const paths = directoryMapArtwork.map(({ id }) => {
		return {
			params: {
				category_slug: localizations[id].slug,
			},
			locale,
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export function getStaticWorkProps({
	locale,
	category_slug,
}: {
	locale: Locale;
	category_slug: string;
}) {
	const localizations = getLocalizations(locale);

	const [categoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === category_slug
	);

	return {
		props: {
			categoryLocalizationId,
		},
	};
}
