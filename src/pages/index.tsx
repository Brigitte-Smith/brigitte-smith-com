import type { NextPage } from "next";

import { HomeBillboard } from "../components/HomeBillboard";

export const config = {
	unstable_runtimeJS: false,
};

const SplashScreen: NextPage = (): JSX.Element => {
	return <HomeBillboard />;
};

export default SplashScreen;
