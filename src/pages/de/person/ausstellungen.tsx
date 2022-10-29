import type { GetStaticProps } from "next";

import { Locale } from "../../../lib/common";
import ExhibitionsPage, {
	getStaticExhibitionsPageProps,
} from "../../en/about/exhibitions";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticExhibitionsPageProps({ locale: LOCALE });
};

export default ExhibitionsPage;
