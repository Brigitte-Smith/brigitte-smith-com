import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import artworkData from "../../../../../dataArtwork.json";
import localizations from "../../../../../locales/en.json";
import { ImageGrid, ImageGridLink } from "../../../../components/ImageGrid";
import { MetaTitle } from "../../../../components/MetaTitle";
import { SvgIcon } from "../../../../components/SvgIcon";
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
	const pageCount = Math.ceil(artwork.length / ARTWORK_PER_PAGE);
	artwork = artwork.filter(
		(artwork, index) =>
			index >= (page_number - 1) * ARTWORK_PER_PAGE &&
			index < page_number * ARTWORK_PER_PAGE
	);

	return {
		props: {
			categoryLocalizationId,
			artwork,
			pageCount,
		},
	};
};

const CategoryNumberedPage: NextPage = ({
	categoryLocalizationId,
	artwork,
	pageCount,
}: {
	categoryLocalizationId: string;
	artwork: { id: string; images: { original: string; webp: string }[] };
	pageCount: number;
}) => {
	const {
		locale,
		query: { page_number },
	} = useRouter();
	const localizations = useLocalization();
	const { title, slug } = localizations[categoryLocalizationId];
	const pageNumber = parseInt(page_number);

	return (
		<FrameLayout>
			<MetaTitle
				suffix={`${title}, ${localizations.page.text} ${pageNumber}`}
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
			{pageNumber > 1 && (
				<Link
					href={`/${localizations.artwork.slug}/${slug}/${
						localizations.page.slug
					}/${pageNumber - 1}`}
					locale={locale}
				>
					<a aria-label={`go to previous page: ${pageNumber - 1}`}>
						<SvgIcon
							aria-hidden="true"
							className="icon"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
							/>
						</SvgIcon>
					</a>
				</Link>
			)}
			{pageCount > 1 && pageNumber < pageCount && (
				<Link
					href={`/${localizations.artwork.slug}/${slug}/${
						localizations.page.slug
					}/${pageNumber + 1}`}
					locale={locale}
				>
					<a aria-label={`go to next page: ${pageNumber + 1}`}>
						<SvgIcon
							aria-hidden="true"
							className="icon"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
							/>
						</SvgIcon>
					</a>
				</Link>
			)}
		</FrameLayout>
	);
};

export default CategoryNumberedPage;
