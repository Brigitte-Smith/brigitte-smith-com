import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { CategoryConfig } from "../../annotations";
import { useLocalization } from "../../context/LocalizationContext";
import { Navigation } from "../Navigation";
import { SvgIcon } from "../SvgIcon";

import * as S from "./HomeLayout.styled";

export function HomeLayout({
	children,
	workSlug,
	workHeadline,
	workCategories,
}: {
	children: ReactNode;
	workSlug: string;
	workHeadline: string;
	workCategories: CategoryConfig[];
}): JSX.Element {
	const { locale } = useRouter();

	const translations = useLocalization();
	console.log(translations);

	return (
		<S.HomeLayout>
			<S.HomeLayoutHeader>
				<Link href="/home/" hreflang={locale} locale={locale}>
					Brigitte Smith
				</Link>
				<a
					className="link--external"
					href="https://www.amazon.de/Brigitte-Smith-Art/dp/B01N2NA0DJ"
				>
					{translations.channels.amazon.text}
					<SvgIcon
						aria-hidden="true"
						className="icon"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
						></path>
					</SvgIcon>
				</a>
			</S.HomeLayoutHeader>

			<S.HomeLayoutBody>
				<S.HomeLayoutBodyPanels>
					<S.HomeLayoutPanel></S.HomeLayoutPanel>
					<S.HomeLayoutPanel>
						<Navigation
							headline={workHeadline}
							links={workCategories.map(
								({
									slug: categorySlug,
									name: categoryName,
									content: categoryContent,
								}) => (
									<Link
										key={categorySlug}
										href={`/${workSlug}/${categorySlug}${
											categoryContent ? "" : "/page/1"
										}`}
									>
										{categoryName}
									</Link>
								)
							)}
						/>
					</S.HomeLayoutPanel>
				</S.HomeLayoutBodyPanels>
				<S.HomeLayoutBodyPanel>{children}</S.HomeLayoutBodyPanel>
			</S.HomeLayoutBody>

			<S.HomeLayoutFooter>
				<Link href={translations.imprint.slug} locale={locale}>
					{translations.imprint.text}
				</Link>

				{locale === "en" ? (
					<Link href="/home" locale="de">
						Deutsch
					</Link>
				) : (
					<Link href="/home" locale="en">
						English
					</Link>
				)}

				<Link href={translations.contact.slug} locale={locale}>
					{translations.contact.text}
				</Link>
			</S.HomeLayoutFooter>
		</S.HomeLayout>
	);
}
