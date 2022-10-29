import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { MetaTitle } from "../../../components/MetaTitle";
import { useLocalization } from "../../../context/LocalizationContext";
import { FrameLayout } from "../../../layouts/FrameLayout";
import type { Locale } from "../../../lib/common";
import { SvgIcon } from "../../../components/SvgIcon";
import artworkCategoryMap from "../../../../data/artwork.json";
import localizations from "../../../../data/localizations.json";
import topLevel from "../../../../data/topLevel.json";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "en";

interface ICategoryPageProps {
	title: string;
	content: string;
	slug: string;
}

export function getStaticArtworkPaths(locale: Locale) {
	const paths = artworkCategoryMap.map((category) => {
		return {
			params: {
				category_slug: category[locale].slug,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticArtworkPaths(LOCALE);
};

export function getStaticArtworkProps({
	locale,
	category_slug,
}: {
	locale: Locale;
	category_slug: string;
}) {
	const { title, content, slug } = artworkCategoryMap.find((category) => {
		return category[locale].slug === category_slug;
	})![locale];

	return {
		props: {
			title,
			content,
			slug,
		},
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticArtworkProps({
		locale: LOCALE,
		category_slug: params.category_slug,
	});
};

const CategoryPage: NextPage<ICategoryPageProps> = ({
	title,
	content,
	slug,
}: {
	categoryLocalizationId: string;
}) => {
	const { locale } = useLocalization();

	return (
		<FrameLayout>
			<MetaTitle suffix={title} />
			<ReactMarkdown>{content}</ReactMarkdown>
			<Link
				href={`/${locale}/${topLevel.artwork[locale].data.slug}/${slug}/${localizations.page[locale].slug}/1`}
			>
				<a>
					{localizations.toArtwork[locale].text}
					<SvgIcon aria-hidden="true">
						<path
							fill="currentColor"
							d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
						/>
					</SvgIcon>
				</a>
			</Link>
		</FrameLayout>
	);
};

export default CategoryPage;
