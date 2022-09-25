import { createContext, ReactNode, useContext } from "react";
import { useRouter } from "next/router";

import en from "../../public/locales/en.json";
import de from "../../public/locales/de.json";

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
	const { locale } = useRouter();

	// assign t as either of the translation json files localted in '../locales' according to the current locale
	const translations = locale === "en" ? en : de;

	// create app context to retrieve t value across the app
	const Context = createContext(translations);

	return <Context.Provider value={translations}>{children}</Context.Provider>;
};

export function useLocalization() {
	const { locale } = useRouter();
	const translations = locale === "en" ? en : de;

	// create app context to retrieve t value across the app
	const Context = createContext(translations);

	return useContext(Context);
}
