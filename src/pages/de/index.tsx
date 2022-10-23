import type { GetStaticProps } from "next";

import { Locale } from "../../lib/common";
import HomePage, { getStaticHomePageProps } from "../en/index";

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticHomePageProps({ locale: LOCALE });
};

export default HomePage;
