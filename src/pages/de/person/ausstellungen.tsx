import type { GetStaticProps } from "next";

import ExhibitionsPage from "../../en/about/exhibitions";

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return {
		props: {},
	};
};

export default ExhibitionsPage;
