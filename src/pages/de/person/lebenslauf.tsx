import type { GetStaticProps } from "next";

import { Locale } from "../../../lib/common";
import BiographyPage, {
	getStaticBiographyPageProps,
} from "../../en/about/biography";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticBiographyPageProps({ locale: LOCALE });
};

export default BiographyPage;
