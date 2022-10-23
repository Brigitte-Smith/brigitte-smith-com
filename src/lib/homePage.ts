import topLevel from "../../data/topLevel.json";
import { Locale } from "./common";

export interface HomePageProps {
	content: string;
}

export function getStaticHomePageProps({ locale }: { locale: Locale }) {
	const content = topLevel.home[locale];

	return {
		props: {
			content,
		},
	};
}
