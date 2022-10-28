import { GetStaticProps } from "next";

import { Locale } from "../../lib/common";
import ImprintPage, { getStaticImprintPageProps } from "../en/imprint";

export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticImprintPageProps({ locale: LOCALE });
};

export default ImprintPage;
