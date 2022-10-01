import type { GetStaticProps } from "next";

import BiographyPage from "../about/biography";

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return {
		props: {},
	};
};

export default BiographyPage;
