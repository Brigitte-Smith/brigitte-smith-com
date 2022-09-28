import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import artworkData from "../../../../../dataArtwork.json";
import localizations from "../../../../../locales/en.json";
import { ImageGrid, ImageGridLink } from "../../../../components/ImageGrid";
import { MetaTitle } from "../../../../components/MetaTitle";
import { useLocalization } from "../../../../context/LocalizationContext";
import { FrameLayout } from "../../../../layouts/FrameLayout";

const ARTWORK_PER_PAGE = 9;

export const getStaticPaths: GetStaticPaths = async (props) => {
	const paths = artworkData
		.map(({ id, artwork }) => {
			const pageCount = Math.ceil(artwork.length / ARTWORK_PER_PAGE);
			return Array.apply(null, { length: pageCount }).map((i, index) => {
				return {
					params: {
						category_slug: localizations[id].slug,
						page_number: `${index + 1}`,
					},
					locale: "en",
				};
			});
		})
		.flat();

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { page_number, category_slug } = params;

	const [categoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === category_slug
	);

	let { artwork } = artworkData.find(
		({ id }) => id === categoryLocalizationId
	);
	artwork = artwork.filter(
		(artwork, index) =>
			index >= (page_number - 1) * ARTWORK_PER_PAGE &&
			index < page_number * ARTWORK_PER_PAGE
	);

	return {
		props: {
			categoryLocalizationId,
			artwork,
		},
	};
};

const CategoryNumberedPage: NextPage = ({
	categoryLocalizationId,
	artwork,
}: {
	categoryLocalizationId: string;
	artwork: { id: string; images: { original: string; webp: string }[] };
}) => {
	const {
		locale,
		query: { page_number },
	} = useRouter();
	const localizations = useLocalization();
	const { title, slug } = localizations[categoryLocalizationId];
	console.log(artwork, title, slug, artwork[0]);
	return (
		<FrameLayout>
			<MetaTitle
				suffix={`${title}, ${localizations.page.text} ${page_number}`}
			/>

			<ImageGrid>
				{artwork.map((artworkItem) => (
					<li key={artworkItem.id}>
						<Link
							href={`/${localizations.artwork.slug}/${slug}/${
								localizations[artworkItem.id].slug
							}`}
							locale={locale}
						>
							<ImageGridLink>
								<picture>
									<source
										srcSet={`/images/artwork/120/${artworkItem.images[0]}`.replace(
											/.(jpe?g|png)$/i,
											".webp"
										)}
										type="image/webp"
									/>
									<img
										alt={
											localizations[artworkItem.id].title
										}
										src={`/images/artwork/120/${artworkItem.images[0]}`}
									/>
								</picture>
							</ImageGridLink>
						</Link>
					</li>
				))}
			</ImageGrid>

			<Link
				href={`/${localizations.artwork.slug}/${slug}/${localizations.page.slug}/1`}
				locale={locale}
			>
				<a>
					{localizations.page.text} {page_number}
				</a>
			</Link>
		</FrameLayout>
	);
};

export default CategoryNumberedPage;
