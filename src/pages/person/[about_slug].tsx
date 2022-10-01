import type { GetStaticPaths, GetStaticProps } from "next";

import { getStaticAboutPaths, getStaticAboutProps } from "../../lib/about";
import AboutCategoryPage from "../../pages/about/[about_slug]";

const LOCALE = "de";

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticAboutPaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticAboutProps({
		locale: LOCALE,
		about_slug: params.about_slug,
	});
};

export default AboutCategoryPage;
