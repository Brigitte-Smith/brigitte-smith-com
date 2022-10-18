import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { useLocalization } from "../../context/LocalizationContext";
import { HomeLayout } from "../../layouts/HomeLayout";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {},
	};
};

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
	const { localizations } = useLocalization();

	return (
		<HomeLayout>
			<ReactMarkdown>{localizations.home.content}</ReactMarkdown>
		</HomeLayout>
	);
};

export default HomePage;
