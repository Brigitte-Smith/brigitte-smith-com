import { GetStaticProps } from "next";

import { Locale } from "../../lib/common";
import ContactPage, { getStaticContactPageProps } from "../en/contact";

export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticContactPageProps({ locale: LOCALE });
};

export default ContactPage;
