import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { MetaTitle } from "../../components/MetaTitle";
import { useLocalization } from "../../context/LocalizationContext";
import { FrameLayout } from "../../layouts/FrameLayout";
import type { Locale } from "../../lib/common";
import {
	getStaticArtworkPaths,
	getStaticArtworkProps,
} from "../../lib/artwork";
import { SvgIcon } from "../../components/SvgIcon";

const LOCALE: Locale = "en";

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticArtworkPaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticArtworkProps({
		locale: LOCALE,
		category_slug: params.category_slug,
	});
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
				<a>
					{localizations.toArtwork.text}
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
