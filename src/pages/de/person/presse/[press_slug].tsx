import type { GetStaticPaths, GetStaticProps } from "next";

import { Locale } from "../../../../lib/common";
import PressPage, {
	getStaticPressPaths,
	getStaticPressProps,
} from "../../../en/about/press/[press_slug]";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

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
