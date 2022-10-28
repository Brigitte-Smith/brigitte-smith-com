import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import aboutCategories from "../../../../data/about.json";

import { MetaTitle } from "../../../components/MetaTitle";
import { Timeline } from "../../../components/Timeline";
import { FrameLayout } from "../../../layouts/FrameLayout";
import { Locale } from "../../../lib/common";

export const config = {
	unstable_runtimeJS: false,
};

const LOCALE: Locale = "en";

interface IExhibitionsPageProps {
	title: string;
	exhibitions: Record<string, string[]>[];
	content: string;
}

export function getStaticExhibitionsPageProps({ locale }: { locale: Locale }) {
	const { title, exhibitions, content } = aboutCategories.exhibitions[locale];

	return {
		props: { title, exhibitions, content },
	};
}

export const getStaticProps: GetStaticProps = async () => {
	return getStaticExhibitionsPageProps({ locale: LOCALE });
};

const ExhibitionsPage: NextPage<IExhibitionsPageProps> = ({
	title,
	exhibitions,
	content,
}) => {
	const parsedExhibitions = exhibitions.map((exhibitionYear) => {
		const [exhibitionYearObject] = Object.entries(exhibitionYear);
		const [year, exhibitions] = exhibitionYearObject;
		return { year, exhibitions };
	});

	return (
		<FrameLayout>
			<MetaTitle suffix={title} />
			{content && <ReactMarkdown>{content}</ReactMarkdown>}
			<Timeline list={parsedExhibitions} />
		</FrameLayout>
	);
};

export default ExhibitionsPage;
