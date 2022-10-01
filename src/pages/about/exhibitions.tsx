import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { MetaTitle } from "../../components/MetaTitle";
import { useLocalization } from "../../context/LocalizationContext";
import { FrameLayout } from "../../layouts/FrameLayout";

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return {
		props: {},
	};
};

const ExhibitionsPage: NextPage = () => {
	const localizations = useLocalization();
	const { title, content } = localizations.about_exhibitions;

	return (
		<FrameLayout>
			<MetaTitle suffix={title} />
			<ReactMarkdown>{content}</ReactMarkdown>
		</FrameLayout>
	);
};

export default ExhibitionsPage;
