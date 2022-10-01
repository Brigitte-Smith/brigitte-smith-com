import type { GetStaticProps } from "next";

import ExhibitionsPage from "../about/exhibitions";

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return {
		props: {},
	};
};

export default ExhibitionsPage;
