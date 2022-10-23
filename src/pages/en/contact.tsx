import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { CenteredLayout } from "../../layouts/CenteredLayout";
import { MetaTitle } from "../../components/MetaTitle";
import topLevel from "../../../data/topLevel.json";
import type { Locale } from "../../lib/common";

const LOCALE: Locale = "en";

interface IContactPageProps {
	title: string;
	content: string;
}

export function getStaticContactPageProps({ locale }: { locale: Locale }) {
	const {
		data: { title },
		content,
	} = topLevel.contact[locale];

	return {
		props: {
			title,
			content,
		},
	};
}

export const getStaticProps: GetStaticProps = async () => {
	return getStaticContactPageProps({ locale: LOCALE });
};

const ContactPage: NextPage<IContactPageProps> = ({ title, content }) => {
	return (
		<>
			<MetaTitle suffix={title} />
			<CenteredLayout>
				{/* <h1>{title}</h1> */}
				<ReactMarkdown>{content}</ReactMarkdown>
			</CenteredLayout>
		</>
	);
};

export default ContactPage;
