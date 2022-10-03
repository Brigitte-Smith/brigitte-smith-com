import type { GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { MetaTitle } from "../../components/MetaTitle";
import { Timeline } from "../../components/Timeline";
import { useLocalization } from "../../context/LocalizationContext";
import { FrameLayout } from "../../layouts/FrameLayout";

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return {
		props: {},
	};
};

const ExhibitionsPage: NextPage = () => {
	const localizations = useLocalization();
	const { title, exhibitions, content } = localizations.about_exhibitions;

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
