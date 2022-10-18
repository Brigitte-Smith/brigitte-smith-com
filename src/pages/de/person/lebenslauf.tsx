import type { GetStaticProps } from "next";

import BiographyPage from "../../en/about/biography";

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return {
		props: {},
	};
};

export default BiographyPage;
