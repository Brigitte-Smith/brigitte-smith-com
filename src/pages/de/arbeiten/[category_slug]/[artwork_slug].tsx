import { GetStaticPaths, GetStaticProps } from "next";

import {
	getStaticArtworkPagePaths,
	getStaticArtworkPageProps,
} from "../../../../lib/artworkPage";
import { Locale } from "../../../../lib/common";
import ArtworkPage, {
	ArtworkPageParams,
} from "../../../en/work/[category_slug]/[artwork_slug]";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "de";

export const getStaticPaths: GetStaticPaths = async () => {
	return getStaticArtworkPagePaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { artwork_slug, category_slug } = params as ArtworkPageParams;
	return getStaticArtworkPageProps({
		locale: LOCALE,
		category_slug,
		artwork_slug,
	});
};

export default ArtworkPage;
