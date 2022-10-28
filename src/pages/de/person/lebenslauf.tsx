import type { GetStaticProps } from "next";

import { Locale } from "../../../lib/common";
import BiographyPage, {
	getStaticBiographyPageProps,
} from "../../en/about/biography";

export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticBiographyPageProps({ locale: LOCALE });
};

export default BiographyPage;
