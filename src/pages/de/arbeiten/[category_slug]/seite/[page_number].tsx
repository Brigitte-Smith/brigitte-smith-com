import type { GetStaticPaths, GetStaticProps } from "next";

import {
	getStaticArtworkCategoryPagePaths,
	getStaticArtworkCategoryPageProps,
} from "../../../../../lib/artworkCategoryPage";
import type { Locale } from "../../../../../lib/common";
import CategoryNumberedPage, {
	ArtworkCategoryPageParams,
} from "../../../../en/work/[category_slug]/page/[page_number]";

const LOCALE: Locale = "de";

export const getStaticPaths: GetStaticPaths = async () => {
	return getStaticArtworkCategoryPagePaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { category_slug, page_number } = params as ArtworkCategoryPageParams;

	return getStaticArtworkCategoryPageProps({
		locale: LOCALE,
		category_slug: category_slug,
		page_number: parseInt(page_number),
	});
};

export default CategoryNumberedPage;
