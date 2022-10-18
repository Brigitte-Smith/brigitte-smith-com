import { GetStaticPaths, GetStaticProps } from "next";

import {
	getStaticArtworkPagePaths,
	getStaticArtworkPageProps,
} from "../../../../lib/artworkPage";
import { Locale } from "../../../../lib/common";
import ArtworkPage from "../../../en/work/[category_slug]/[artwork_slug]";

const LOCALE: Locale = "de";

export const getStaticPaths: GetStaticPaths = async () => {
	return getStaticArtworkPagePaths(LOCALE);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { artwork_slug, category_slug } = params;
	return getStaticArtworkPageProps({
		locale: LOCALE,
		category_slug,
		artwork_slug,
	});
};

export default ArtworkPage;
