import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

import localizations from "../../../../../locales/en.json";
import { ArtworkColumns } from "../../../../components/ArtworkColumns";
import { ArtworkImage } from "../../../../components/ArtworkImage";
import { MetaTitle } from "../../../../components/MetaTitle";
import { SvgIcon } from "../../../../components/SvgIcon";
import { useLocalization } from "../../../../context/LocalizationContext";
import { FrameLayout } from "../../../../layouts/FrameLayout";
import type { Locale } from "../../../../lib/common";
import {
	Artwork,
	ArtworkCategory,
	ArtworkSize,
} from "../../../../data.annotations";
import {
	getStaticArtworkPagePaths,
	getStaticArtworkPageProps,
} from "../../../../lib/artworkPage";

const LOCALE: Locale = "en";

export const getStaticPaths: GetStaticPaths = async () => {
	return getStaticArtworkPagePaths(LOCALE);
};

export interface ArtworkPageParams extends ParsedUrlQuery {
	artwork_slug: string;
	category_slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { artwork_slug, category_slug } = params as ArtworkPageParams;

	return getStaticArtworkPageProps({
		locale: LOCALE,
		category_slug,
		artwork_slug,
	});
};

function getArtworkSize(size: ArtworkSize): string {
	return `${size.height.value} ${
		size.height.unit !== size.width.unit ? ` ${size.height.unit}` : ""
	}x${size.width.value} ${size.width.unit}`;
}

export interface ArtworkPageProps {
	category: ArtworkCategory;
	artwork: Artwork;
	artworkIndex: number;
	previousArtwork?: Artwork;
	nextArtwork?: Artwork;
}

export default function ArtworkPage({
	category,
	artwork,
	artworkIndex,
	previousArtwork,
	nextArtwork,
}: ArtworkPageProps): JSX.Element {
	const { locale } = useLocalization();

	const image = artwork.images[0];
	const artworkName = artwork.title;
	const artworkSize = artwork.size ? getArtworkSize(artwork.size) : undefined;
	const artworkDate = artwork.date
		? new Date(artwork.date.toString())
		: undefined;
	const artworkCount = category.artwork.length;
	const categorySlug = category.slug;
	const previousArtworkSlug = previousArtwork?.slug;
	const previousArtworkTitle = previousArtwork?.title;
	const nextArtworkSlug = nextArtwork?.slug;
	const nextArtworkTitle = nextArtwork?.title;

	return (
		<FrameLayout>
			<MetaTitle suffix={artworkName} />
			<ArtworkColumns
				slotImage={
					<Link href={`/images/artwork/${image}`}>
						<a>
							<picture>
								<source
									srcSet={`/images/artwork/380/${image}`.replace(
										/.(jpe?g|png)$/i,
										".webp"
									)}
									type="image/webp"
								/>
								<ArtworkImage
									alt={artworkName}
									src={`/images/artwork/380/${image}`}
								/>
							</picture>
						</a>
					</Link>
				}
				slotContent={
					<>
						<div>
							<h1>{artworkName}</h1>
							{artworkSize && <div>{artworkSize}</div>}
							{artworkDate && (
								<div>
									{<time>{artworkDate.getFullYear()}</time>}
								</div>
							)}
						</div>
						<div>
							{artworkIndex + 1}/{artworkCount}
						</div>
					</>
				}
				slotNav={
					<>
						{previousArtwork ? (
							<Link
								href={`/${locale}/${localizations.artwork.slug}/${categorySlug}/${previousArtworkSlug}`}
							>
								<a aria-label={`go to ${previousArtworkTitle}`}>
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
						{nextArtwork && (
							<Link
								href={`/${locale}/${localizations.artwork.slug}/${categorySlug}/${nextArtworkSlug}`}
							>
								<a aria-label={`go to ${nextArtworkTitle}`}>
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
}
