import type { GetStaticProps } from "next";

import { Locale } from "../../../lib/common";
import ExhibitionsPage, {
	getStaticExhibitionsPageProps,
} from "../../en/about/exhibitions";

export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticExhibitionsPageProps({ locale: LOCALE });
};

export default ExhibitionsPage;
