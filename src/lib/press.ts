import directoryMapAbout from "../../data/directoryMapAbout.json";
import { getLocalizations } from "./common";
import type { Locale } from "./common";

export function getStaticPressPaths(locale: Locale) {
	const localizations = getLocalizations(locale);

	const paths = directoryMapAbout
		.find(({ id }) => id === "about_press")
		.children.map(({ id }) => {
			return {
				params: {
					press_slug: localizations[id].slug,
				},
				locale,
			};
		});

	return {
		paths,
		fallback: false,
	};
}

export function getStaticPressProps({
	locale,
	press_slug,
}: {
	locale: Locale;
	press_slug: string;
}) {
	const localizations = getLocalizations(locale);

	const [pressLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === press_slug
	);

	return {
		props: {
			pressLocalizationId,
		},
	};
}
