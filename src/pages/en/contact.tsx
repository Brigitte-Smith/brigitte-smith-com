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

const ContactPage: NextPage = () => {
	const { localizations } = useLocalization();

	return (
		<>
			<MetaTitle suffix={localizations.contact.title} />
			<CenteredLayout>
				{/* <h1>{localizations.contact.title}</h1> */}
				<ReactMarkdown>{localizations.contact.content}</ReactMarkdown>
			</CenteredLayout>
		</>
	);
};

export default ContactPage;
