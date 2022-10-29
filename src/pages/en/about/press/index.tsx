import type { GetStaticProps, NextPage } from "next";

import aboutCategories from "../../../../../data/about.json";
import pressArticles from "../../../../../data/press.json";

import { MetaTitle } from "../../../../components/MetaTitle";
import { PressList } from "../../../../components/PressList";
import { FrameLayout } from "../../../../layouts/FrameLayout";
import { Locale } from "../../../../lib/common";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "en";

interface Press {}

interface IPressIndexPageProps {
	title: string;
	press?: Press[];
}

export function getStaticPressIndexPageProps({ locale }: { locale: Locale }) {
	const { title } = aboutCategories.press[locale];
	const press = pressArticles.map((pressArticle) => pressArticle[locale]);

	return {
		props: { title, press },
	};
}

export const getStaticProps: GetStaticProps = async () => {
	return getStaticPressIndexPageProps({ locale: LOCALE });
};

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
// 	let { children } = directoryMapAbout.find(({ id }) => id === "about_press");

// 	return {
// 		props: {
// 			press: children,
// 		},
// 	};
// };

const PressIndexPage: NextPage<IPressIndexPageProps> = ({ title, press }) => {
	// const { localizations } = useLocalization();
	// const { children: press } = directoryMapAbout.find(
	// 	({ id }) => id === "about_press"
	// );

	return (
		<FrameLayout>
			<MetaTitle suffix={title} />

			<PressList press={press} />
		</FrameLayout>
	);
};

export default PressIndexPage;
