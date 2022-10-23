import type { GetStaticProps } from "next";

import { Locale } from "../../../lib/common";
import BiographyPage, {
	getStaticBiographyPageProps,
} from "../../en/about/biography";

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticBiographyPageProps({ locale: LOCALE });
};

export default BiographyPage;
