import type { GetStaticPaths, GetStaticProps } from "next";

import type { Locale } from "../../lib/common";
import { getStaticWorkPaths, getStaticWorkProps } from "../../lib/workCategory";
import CategoryPage from "../work/[category_slug]";

const LOCALE: Locale = "en";

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticWorkPaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticWorkProps({
		locale: LOCALE,
		category_slug: params.category_slug,
	});
};

export default CategoryPage;
