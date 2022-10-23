import { createContext, ReactNode, useContext } from "react";
import { useRouter } from "next/router";

// import en from "../../locales/en.json";
// import de from "../../locales/de.json";
import localizations from "../../data/localizations.json";

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
	const { pathname } = useRouter();

	const locale = pathname.startsWith("/en") ? "en" : "de";
	// const localizations = locale === "en" ? en : de;

	const Context = createContext({ locale, localizations });

	return (
		<Context.Provider value={{ locale, localizations }}>
			{children}
		</Context.Provider>
	);
};

export function useLocalization() {
	const { pathname } = useRouter();

	const locale = pathname.startsWith("/en") ? "en" : "de";

	const singleLocaleLocalizations = {};
	Object.entries(localizations).forEach(([key, data]) => {
		singleLocaleLocalizations[key] = data[locale];
	});

	const Context = createContext({
		locale,
		localizations: singleLocaleLocalizations,
	});

	return useContext(Context);
}
