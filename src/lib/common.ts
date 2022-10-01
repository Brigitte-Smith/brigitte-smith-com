import localizationsDe from "../../locales/de.json";
import localizationsEn from "../../locales/en.json";

export type Locale = "de" | "en";

export function getLocalizations(locale: Locale) {
	return locale === "de" ? localizationsDe : localizationsEn;
}
