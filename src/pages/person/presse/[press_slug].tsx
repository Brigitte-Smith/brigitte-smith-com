import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Locale } from "../../../lib/common";
import { getStaticPressPaths, getStaticPressProps } from "../../../lib/press";
import PressPage from "../../about/press/[press_slug]";

const LOCALE: Locale = "de";

export const getStaticPaths: GetStaticPaths = async (props) => {
	return getStaticPressPaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return getStaticPressProps({
		locale: LOCALE,
		press_slug: params.press_slug,
	});
};

export default PressPage;
