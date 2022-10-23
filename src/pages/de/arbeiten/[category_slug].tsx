import type { GetStaticPaths, GetStaticProps } from "next";

import type { Locale } from "../../../lib/common";
import CategoryPage, {
	getStaticArtworkPaths,
	getStaticArtworkProps,
} from "../../en/work/[category_slug]";

const LOCALE: Locale = "de";

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticArtworkPaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticArtworkProps({
		locale: LOCALE,
		category_slug: params.category_slug,
	});
};

export default CategoryPage;
