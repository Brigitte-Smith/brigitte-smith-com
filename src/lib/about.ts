import directoryMapAbout from "../../data/directoryMapAbout.json";
import { getLocalizations } from "./common";
import type { Locale } from "./common";

export function getStaticAboutPaths(locale: Locale) {
	const localizations = getLocalizations(locale);

	const paths = directoryMapAbout.map(({ id }) => {
		return {
			params: {
				about_slug: localizations[id].slug,
			},
			locale,
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export function getStaticAboutProps({
	locale,
	about_slug,
}: {
	locale: Locale;
	about_slug: string;
}) {
	const localizations = getLocalizations(locale);

	const [aboutCategoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === about_slug
	);

	return {
		props: {
			aboutCategoryLocalizationId,
		},
	};
}
