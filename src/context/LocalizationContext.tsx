import { createContext, ReactNode, useContext } from "react";
import { useRouter } from "next/router";

import en from "../../locales/en.json";
import de from "../../locales/de.json";

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
	const { locale } = useRouter();

	// assign t as either of the translation json files localted in '../locales' according to the current locale
	const localization = locale === "en" ? en : de;

	// create app context to retrieve t value across the app
	const Context = createContext(localization);

	return <Context.Provider value={localization}>{children}</Context.Provider>;
};

export function useLocalization() {
	const { locale } = useRouter();
	const localization = locale === "en" ? en : de;

	// create app context to retrieve t value across the app
	const Context = createContext(localization);

	return useContext(Context);
}
