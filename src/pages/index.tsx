import type { NextPage } from "next";

import { HomeBillboard } from "../components/HomeBillboard";

// dirty way to render static pages without next's script files
export const config = {
	unstable_runtimeJS: false,
};

const SplashScreen: NextPage = (): JSX.Element => {
	return <HomeBillboard />;
};

export default SplashScreen;
