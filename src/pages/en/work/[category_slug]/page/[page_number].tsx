import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

import { ArtworkColumns } from "../../../../../components/ArtworkColumns";
import { ImageGrid, ImageGridLink } from "../../../../../components/ImageGrid";
import { MetaTitle } from "../../../../../components/MetaTitle";
import { SvgIcon } from "../../../../../components/SvgIcon";
import { useLocalization } from "../../../../../context/LocalizationContext";
import { Artwork, ArtworkCategory } from "../../../../../data.annotations";
import { FrameLayout } from "../../../../../layouts/FrameLayout";
import {
	getStaticArtworkCategoryPagePaths,
	getStaticArtworkCategoryPageProps,
} from "../../../../../lib/artworkCategoryPage";
import type { Locale } from "../../../../../lib/common";

const LOCALE: Locale = "en";

export const getStaticPaths: GetStaticPaths = async () => {
	return getStaticArtworkCategoryPagePaths(LOCALE);
};

export interface ArtworkCategoryPageParams extends ParsedUrlQuery {
	category_slug: string;
	page_number: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { category_slug, page_number } = params as ArtworkCategoryPageParams;

	return getStaticArtworkCategoryPageProps({
		locale: LOCALE,
		category_slug: category_slug,
		page_number: parseInt(page_number),
	});
};

const CategoryNumberedPage: NextPage = ({
	category,
	artwork,
	pageNumber,
	pageCount,
}: {
	category: ArtworkCategory;
	artwork: Artwork[];
	pageNumber: number;
	pageCount: number;
}) => {
	const { locale, localizations } = useLocalization();

	const categorySlug = category.slug;
	const categoryName = category.title;

	return (
		<FrameLayout>
			<MetaTitle
				suffix={`${categoryName}, ${localizations.page.text} ${pageNumber}`}
			/>
			<ArtworkColumns
				slotImage={
					<ImageGrid>
						{artwork.map((artworkItem) => (
							<li key={artworkItem.id}>
								<Link
									href={`/${locale}/${localizations.artwork.slug}/${categorySlug}/${artworkItem.slug}`}
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
													alt={artworkItem.title}
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
						<h1>{categoryName}</h1>
						<div>
							{localizations.overview.text}
							<br />
							{pageNumber}/{pageCount}
						</div>
					</>
				}
				slotNav={
					<>
						{pageNumber > 1 ? (
							<Link
								href={`/${locale}/${
									localizations.artwork.slug
								}/${categorySlug}/${localizations.page.slug}/${
									pageNumber - 1
								}`}
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
								href={`/${locale}/${
									localizations.artwork.slug
								}/${categorySlug}/${localizations.page.slug}/${
									pageNumber + 1
								}`}
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
