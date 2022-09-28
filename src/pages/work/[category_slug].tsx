import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import artworkData from "../../../dataArtwork.json";
import localizations from "../../../locales/en.json";
import { MetaTitle } from "../../components/MetaTitle";
import { useLocalization } from "../../context/LocalizationContext";
import { FrameLayout } from "../../layouts/FrameLayout";

export const getStaticPaths: GetStaticPaths = async (props) => {
	const paths = artworkData.map(({ id }) => {
		return {
			params: {
				category_slug: localizations[id].slug,
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
	const [categoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === params.category_slug
	);

	return {
		props: {
			categoryLocalizationId,
		},
	};
};

const CategoryPage: NextPage = ({
	categoryLocalizationId,
}: {
	categoryLocalizationId: string;
}) => {
	const { locale } = useRouter();
	const localizations = useLocalization();
	const { title, content, slug } = localizations[categoryLocalizationId];

	return (
		<FrameLayout>
			<MetaTitle suffix={title} />
			<ReactMarkdown>{content}</ReactMarkdown>
			<Link
				href={`/${localizations.artwork.slug}/${slug}/${localizations.page.slug}/1`}
				locale={locale}
			>
				<a>{localizations.page.text} 1</a>
			</Link>
		</FrameLayout>
	);
};

export default CategoryPage;
