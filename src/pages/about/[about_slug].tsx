import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import directoryMapAbout from "../../../data/directoryMapAbout.json";
import localizations from "../../../locales/en.json";
import { MetaTitle } from "../../components/MetaTitle";
import { useLocalization } from "../../context/LocalizationContext";
import { FrameLayout } from "../../layouts/FrameLayout";

export const getStaticPaths: GetStaticPaths = async (props) => {
	const paths = directoryMapAbout.map(({ id }) => {
		return {
			params: {
				about_slug: localizations[id].slug,
			},
			locale: "en",
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const [aboutCategoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === params.about_slug
	);

	return {
		props: {
			aboutCategoryLocalizationId,
		},
	};
};

const AboutCategoryPage: NextPage = ({
	aboutCategoryLocalizationId,
}: {
	aboutCategoryLocalizationId: string;
}) => {
	const { locale } = useRouter();
	const localizations = useLocalization();
	const { title, content, slug } = localizations[aboutCategoryLocalizationId];

	return (
		<FrameLayout>
			<MetaTitle suffix={title} />
			<ReactMarkdown>{content}</ReactMarkdown>
		</FrameLayout>
	);
};

export default AboutCategoryPage;
