import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { ArtworkColumns } from "../../../../components/ArtworkColumns";
import { ImageGrid, ImageGridLink } from "../../../../components/ImageGrid";
import { MetaTitle } from "../../../../components/MetaTitle";
import { SvgIcon } from "../../../../components/SvgIcon";
import { useLocalization } from "../../../../context/LocalizationContext";
import { FrameLayout } from "../../../../layouts/FrameLayout";
import {
	getStaticArtworkCategoryPagePaths,
	getStaticArtworkCategoryPageProps,
} from "../../../../lib/artworkCategoryPage";
import type { Locale } from "../../../../lib/common";

const LOCALE: Locale = "en";

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticArtworkCategoryPagePaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticArtworkCategoryPageProps({
		locale: LOCALE,
		category_slug: params.category_slug,
		page_number: parseInt(params.page_number),
	});
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
			<ArtworkColumns
				slotImage={
					<ImageGrid>
						{artwork.map((artworkItem) => (
							<li key={artworkItem.id}>
								<Link
									href={`/${
										localizations.artwork.slug
									}/${slug}/${
										localizations[artworkItem.id].slug
									}`}
									locale={locale}
								>
									<a>
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
														localizations[
															artworkItem.id
														].title
													}
													src={`/images/artwork/120/${artworkItem.images[0]}`}
												/>
											</picture>
										</ImageGridLink>
									</a>
								</Link>
							</li>
						))}
					</ImageGrid>
				}
				slotContent={
					<>
						<h1>{title}</h1>
						<div>
							{localizations.overview.text}
							<br />
							{page_number}/{pageCount}
						</div>
					</>
				}
				slotNav={
					<>
						{pageNumber > 1 ? (
							<Link
								href={`/${localizations.artwork.slug}/${slug}/${
									localizations.page.slug
								}/${pageNumber - 1}`}
								locale={locale}
							>
								<a
									aria-label={`${
										localizations.previousPage.text
									}: ${pageNumber - 1}`}
								>
									<SvgIcon aria-hidden="true">
										<path
											fill="currentColor"
											d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
										/>
									</SvgIcon>
								</a>
							</Link>
						) : (
							<span />
						)}
						{pageCount > 1 && pageNumber < pageCount && (
							<Link
								href={`/${localizations.artwork.slug}/${slug}/${
									localizations.page.slug
								}/${pageNumber + 1}`}
								locale={locale}
							>
								<a
									aria-label={`${
										localizations.nextPage.text
									}: ${pageNumber + 1}`}
								>
									<SvgIcon aria-hidden="true">
										<path
											fill="currentColor"
											d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
										/>
									</SvgIcon>
								</a>
							</Link>
						)}
					</>
				}
			/>
		</FrameLayout>
	);
};

export default CategoryNumberedPage;
