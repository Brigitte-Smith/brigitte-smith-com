import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { CenteredLayout } from "../../layouts/CenteredLayout";
import { MetaTitle } from "../../components/MetaTitle";
import { useLocalization } from "../../context/LocalizationContext";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {},
	};
};

const ImprintPage: NextPage = () => {
	const { localizations } = useLocalization();

	return (
		<>
			<MetaTitle suffix={localizations.imprint.title} />
			<CenteredLayout>
				{/* <h1>{localizations.imprint.title}</h1> */}
				<ReactMarkdown>{localizations.imprint.content}</ReactMarkdown>
			</CenteredLayout>
		</>
	);
};

export default ImprintPage;
