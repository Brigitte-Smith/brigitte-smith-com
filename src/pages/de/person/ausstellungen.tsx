import type { GetStaticProps } from "next";

import { Locale } from "../../../lib/common";
import ExhibitionsPage, {
	getStaticExhibitionsPageProps,
} from "../../en/about/exhibitions";

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticExhibitionsPageProps({ locale: LOCALE });
};

export default ExhibitionsPage;
