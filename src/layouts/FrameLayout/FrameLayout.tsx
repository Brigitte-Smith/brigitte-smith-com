import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import artworkData from "../../../dataArtwork.json";
import aboutData from "../../../dataAbout.json";

import { SvgIcon } from "../../components/SvgIcon";
import { useLocalization } from "../../context/LocalizationContext";

import * as S from "./FrameLayout.styled";
import { NavigationLinkList } from "../../components/NavigationLinkList";

function getArtworkCategoryHref(localization, pageSlug: string) {
	if (localization.content !== "") {
		return localization.slug;
	}
	return `${localization.slug}/${pageSlug}/1`;
}

export function FrameLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const { locale } = useRouter();
	const localization = useLocalization();

	return (
		<S.FrameLayout>
			<S.FrameLayout_Header>
				<Link href="/home/" locale={locale}>
					Brigitte Smith
				</Link>
				<a
					className="link--external"
					href="https://www.amazon.de/Brigitte-Smith-Art/dp/B01N2NA0DJ"
				>
					{localization.channels.amazon.text}
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
			</S.FrameLayout_Header>

			<S.FrameLayout_Body>
				<S.FrameLayout_BodyPanels>
					<S.FrameLayout_Panel>
						<S.FrameLayout_PanelHeadline>
							{localization.about.title}
						</S.FrameLayout_PanelHeadline>
						<NavigationLinkList
							links={aboutData.map(({ id }) => (
								<Link
									key={`about-category_${id}`}
									href={`/${localization.about.slug}/${localization[id].slug}`}
									locale={locale}
								>
									{localization[id].title}
								</Link>
							))}
						/>
					</S.FrameLayout_Panel>
					<S.FrameLayout_Panel>
						<S.FrameLayout_PanelHeadline>
							{localization.artwork.title}
						</S.FrameLayout_PanelHeadline>
						<NavigationLinkList
							links={artworkData.map(({ id }) => (
								<Link
									key={`artwork-category_${id}`}
									href={`/${
										localization.artwork.slug
									}/${getArtworkCategoryHref(
										localization[id],
										localization.page.slug
									)}`}
									locale={locale}
								>
									{localization[id].title}
								</Link>
							))}
						/>
					</S.FrameLayout_Panel>
				</S.FrameLayout_BodyPanels>
				<S.FrameLayout_MainContentPanel>
					{children}
				</S.FrameLayout_MainContentPanel>
			</S.FrameLayout_Body>

			<S.FrameLayout_Footer>
				<Link href={localization.imprint.slug} locale={locale}>
					{localization.imprint.title}
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

				<Link href={localization.contact.slug} locale={locale}>
					{localization.contact.title}
				</Link>
			</S.FrameLayout_Footer>
		</S.FrameLayout>
	);
}
