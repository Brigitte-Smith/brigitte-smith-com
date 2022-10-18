import type { GetStaticPaths, GetStaticProps } from "next";

import {
	getStaticArtworkCategoryPagePaths,
	getStaticArtworkCategoryPageProps,
} from "../../../../../lib/artworkCategoryPage";
import type { Locale } from "../../../../../lib/common";
import CategoryNumberedPage from "../../../../en/work/[category_slug]/page/[page_number]";

const LOCALE: Locale = "de";

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

export default CategoryNumberedPage;
