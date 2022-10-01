import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import directoryMapAbout from "../../../../data/directoryMapAbout.json";
import { MetaTitle } from "../../../components/MetaTitle";
import { useLocalization } from "../../../context/LocalizationContext";
import { FrameLayout } from "../../../layouts/FrameLayout";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {},
	};
};

const PressIndexPage: NextPage = () => {
	const localizations = useLocalization();
	const { children } = directoryMapAbout.find(
		({ id }) => id === "about_press"
	);
	console.log({ children, localizations });
	return (
		<FrameLayout>
			<MetaTitle suffix={localizations.about_press.title} />

			<ul>
				{children.map((id) => (
					<li key={id}>
						<div>
							<Link
								href={`/${localizations.about.slug}/${localizations.about_press.slug}/${localizations[id].slug}`}
							>
								{localizations[id].title}
							</Link>
						</div>
						<div>{localizations[id].summary}</div>
					</li>
				))}
			</ul>
		</FrameLayout>
	);
};

export default PressIndexPage;
