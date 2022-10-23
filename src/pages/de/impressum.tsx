import { GetStaticProps } from "next";

import { Locale } from "../../lib/common";
import ImprintPage, { getStaticImprintPageProps } from "../en/imprint";

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticImprintPageProps({ locale: LOCALE });
};

export default ImprintPage;
