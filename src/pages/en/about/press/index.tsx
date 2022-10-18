import type { GetStaticProps, NextPage } from "next";

import directoryMapAbout from "../../../../../data/directoryMapAbout.json";
import { MetaTitle } from "../../../../components/MetaTitle";
import { PressList } from "../../../../components/PressList";
import { useLocalization } from "../../../../context/LocalizationContext";
import { FrameLayout } from "../../../../layouts/FrameLayout";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	let { children } = directoryMapAbout.find(({ id }) => id === "about_press");

	return {
		props: {
			press: children,
		},
	};
};

const PressIndexPage: NextPage = ({}) => {
	const { localizations } = useLocalization();
	const { children: press } = directoryMapAbout.find(
		({ id }) => id === "about_press"
	);

	return (
		<FrameLayout>
			<MetaTitle suffix={localizations.about_press.title} />

			<PressList press={press} />
		</FrameLayout>
	);
};

export default PressIndexPage;
