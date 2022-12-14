import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

import { ArtworkColumns } from "../../../../components/ArtworkColumns";
import { ArtworkImage } from "../../../../components/ArtworkImage";
import { MetaTitle } from "../../../../components/MetaTitle";
import { SvgIcon } from "../../../../components/SvgIcon";
import { ArtworkStatistic } from "../../../../components/ArtworkStatistic";
import { VisuallyHidden } from "../../../../components/VisuallyHidden";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import type { Breadcrumb } from "../../../../components/Breadcrumbs/Breadcrumbs.annotations";

import { useLocalization } from "../../../../context/LocalizationContext";

import { FrameLayout } from "../../../../layouts/FrameLayout";

import type { Locale } from "../../../../lib/common";
import {
	getStaticArtworkPagePaths,
	getStaticArtworkPageProps,
} from "../../../../lib/artworkPage";

import {
	Artwork,
	ArtworkCategory,
	ArtworkSize,
} from "../../../../data.annotations";
import topLevel from "../../../../../data/topLevel.json";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

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
	return `${size.height.value}${
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
	const artworkSlug = artwork.slug;
	const artworkSize = artwork.size ? getArtworkSize(artwork.size) : undefined;
	const artworkDate = artwork.date
		? new Date(artwork.date.toString())
		: undefined;
	const artworkCount = category.artwork.length;
	const categorySlug = category.slug;
	const categoryName = category.title;
	const previousArtworkSlug = previousArtwork?.slug;
	const previousArtworkTitle = previousArtwork?.title;
	const nextArtworkSlug = nextArtwork?.slug;
	const nextArtworkTitle = nextArtwork?.title;

	const jsonLD = {
		"@context": "https://schema.org",
		"@type": "VisualArtwork",
		name: artworkName,
		artist: "Brigitte Smith",
		image: `http://www.brigitte-smith.com/images/artwork/${image}`,
	};

	if (artworkDate) {
		jsonLD["dateCreated"] = artworkDate;
	}

	if (artworkSize) {
		jsonLD["width"] = [
			{
				"@type": "Distance",
				name: `${artwork.size?.width.value} ${artwork.size?.width.unit}`,
			},
		];
		jsonLD["height"] = [
			{
				"@type": "Distance",
				name: `${artwork.size?.height.value} ${artwork.size?.height.unit}`,
			},
		];
	}

	const breadcrumbs: Breadcrumb[] = [
		{
			href: `/${locale}/`,
			text: "Home",
		},
		{
			href: `/${locale}/${topLevel.artwork[locale].data.slug}/`,
			text: topLevel.artwork[locale].data.title,
		},
		{
			href: `/${locale}/${topLevel.artwork[locale].data.slug}/${categorySlug}/`,
			text: categoryName,
		},
		{
			href: `/${locale}/${topLevel.artwork[locale].data.slug}/${categorySlug}/${artworkSlug}/`,
			text: artworkName,
		},
	];

	return (
		<>
			<Head>
				<script type="application/ld+json">
					{JSON.stringify(jsonLD)}
				</script>
			</Head>
			<FrameLayout>
				<MetaTitle suffix={artworkName} />
				<VisuallyHidden>
					<Breadcrumbs levels={breadcrumbs} />
				</VisuallyHidden>
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
								{artworkSize && (
									<ArtworkStatistic label="size">
										{artworkSize}
									</ArtworkStatistic>
								)}
								{artworkDate && (
									<ArtworkStatistic label="year">
										{
											<time>
												{artworkDate.getFullYear()}
											</time>
										}
									</ArtworkStatistic>
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
									href={`/${locale}/${topLevel.artwork[locale].data.slug}/${categorySlug}/${previousArtworkSlug}`}
								>
									<a
										aria-label={`go to ${previousArtworkTitle}`}
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
							{nextArtwork && (
								<Link
									href={`/${locale}/${topLevel.artwork[locale].data.slug}/${categorySlug}/${nextArtworkSlug}`}
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
		</>
	);
}
