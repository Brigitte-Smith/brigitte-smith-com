import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import directoryMapArtwork from "../../../../data/directoryMapArtwork.json";
import localizations from "../../../../locales/en.json";
import { ArtworkColumns } from "../../../components/ArtworkColumns";
import { ArtworkImage } from "../../../components/ArtworkImage";
import { MetaTitle } from "../../../components/MetaTitle";
import { SvgIcon } from "../../../components/SvgIcon";
import { FrameLayout } from "../../../layouts/FrameLayout";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const paths = directoryMapArtwork
		.map(({ id: categoryId, artwork }) => {
			return artwork.map(({ id }) => {
				return {
					params: {
						category_slug: localizations[categoryId].slug,
						artwork_slug: localizations[id].slug,
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
	const { artwork_slug, category_slug } = params;

	const [categoryLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === category_slug
	);
	const sortByField = localizations[categoryLocalizationId].sortBy;

	let { artwork: categoryArtwork } = directoryMapArtwork.find(
		({ id }) => id === categoryLocalizationId
	);

	categoryArtwork = categoryArtwork.map((artworkObject) => {
		return {
			...artworkObject,
			date: localizations[artworkObject.id].date ?? 0,
		};
	});

	if (sortByField === "date") {
		categoryArtwork = categoryArtwork.sort((a, b) =>
			a[sortByField] < b[sortByField] ? 1 : -1
		);
	}

	const [artworkLocalizationId] = Object.entries(localizations).find(
		([, localization]) => localization?.slug === artwork_slug
	);

	const artworkIndex = categoryArtwork.findIndex(
		({ id }) => id === artworkLocalizationId
	);

	const image = categoryArtwork[artworkIndex].images[0];

	const props = {
		artworkId: artworkLocalizationId,
		image,
		imageCount: categoryArtwork.length,
		imageIndex: artworkIndex,
	};

	const previousArtworkId = categoryArtwork[artworkIndex - 1]?.id;
	if (previousArtworkId) {
		props["previousArtworkId"] = previousArtworkId;
	}

	const nextArtworkId = categoryArtwork[artworkIndex + 1]?.id;
	if (nextArtworkId) {
		props["nextArtworkId"] = nextArtworkId;
	}

	return {
		props,
	};
};

function getArtworkSize(size): string {
	return `${size.height.value} ${
		size.height.unit !== size.width.unit ? ` ${size.height.unit}` : ""
	} x ${size.width.value} ${size.width.unit}`;
}

export default function ArtworkPage({
	artworkId,
	image,
	nextArtworkId,
	previousArtworkId,
	imageCount,
	imageIndex,
}: {
	artworkId: string;
	image: string;
	nextArtworkId?: string;
	previousArtworkId?: string;
	imageCount: number;
	imageIndex: number;
}): JSX.Element {
	const {
		defaultLocale,
		query: { category_slug },
	} = useRouter();
	const artwork = localizations[artworkId];
	const artworkName = artwork.title;
	const artworkDate = artwork.date
		? new Date(artwork.date.toString())
		: undefined;
	const artworkSize = artwork.size ? getArtworkSize(artwork.size) : undefined;
	console.log(artwork.date, artworkDate);
	return (
		<FrameLayout>
			<MetaTitle suffix={artworkName} />
			<ArtworkColumns
				slotImage={
					<Link
						href={`/images/artwork/${image}`}
						locale={defaultLocale}
					>
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
							{imageIndex + 1}/{imageCount}
						</div>
					</>
				}
				slotNav={
					<>
						{previousArtworkId ? (
							<Link
								href={`/${localizations.artwork.slug}/${category_slug}/${localizations[previousArtworkId].slug}`}
							>
								<a
									aria-label={`go to ${localizations[previousArtworkId].title}`}
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
						{nextArtworkId && (
							<Link
								href={`/${localizations.artwork.slug}/${category_slug}/${localizations[nextArtworkId].slug}`}
							>
								<a
									aria-label={`go to ${localizations[nextArtworkId].title}`}
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
}
