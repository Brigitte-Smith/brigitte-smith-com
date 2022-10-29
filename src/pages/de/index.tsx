import type { GetStaticProps } from "next";

import { Locale } from "../../lib/common";
import HomePage, { getStaticHomePageProps } from "../en/index";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "de";

export const getStaticProps: GetStaticProps = async () => {
	return getStaticHomePageProps({ locale: LOCALE });
};

export default HomePage;
