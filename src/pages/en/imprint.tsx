import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { CenteredLayout } from "../../layouts/CenteredLayout";
import { MetaTitle } from "../../components/MetaTitle";
import topLevel from "../../../data/topLevel.json";
import type { Locale } from "../../lib/common";

export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "en";

interface IImprintPageProps {
	title: string;
	content: string;
}

export function getStaticImprintPageProps({ locale }: { locale: Locale }) {
	const {
		data: { title },
		content,
	} = topLevel.imprint[locale];

	return {
		props: {
			title,
			content,
		},
	};
}

export const getStaticProps: GetStaticProps = async () => {
	return getStaticImprintPageProps({ locale: LOCALE });
};

const ImprintPage: NextPage<IImprintPageProps> = ({ title, content }) => {
	return (
		<>
			<MetaTitle suffix={title} />
			<CenteredLayout>
				<ReactMarkdown>{content}</ReactMarkdown>
			</CenteredLayout>
		</>
	);
};

export default ImprintPage;
