import Link from "next/link";
import { ReactNode } from "react";

import directoryMapArtwork from "../../../data/directoryMapArtwork.json";
import directoryMapAbout from "../../../data/directoryMapAbout.json";

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
	const { locale, localizations } = useLocalization();

	return (
		<S.FrameLayout>
			<S.FrameLayout_Header>
				<Link href={`/${locale}`}>Brigitte Smith</Link>
				<a
					className="link--external"
					href="https://www.amazon.de/Brigitte-Smith-Art/dp/B01N2NA0DJ"
				>
					{localizations.channels.amazon.text}
					<SvgIcon aria-hidden="true">
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
							{localizations.about.title}
						</S.FrameLayout_PanelHeadline>
						<NavigationLinkList
							links={directoryMapAbout.map(({ id }) => (
								<Link
									key={`about-category_${id}`}
									href={`/${locale}/${localizations.about.slug}/${localizations[id].slug}`}
								>
									{localizations[id].title}
								</Link>
							))}
						/>
					</S.FrameLayout_Panel>
					<S.FrameLayout_Panel>
						<S.FrameLayout_PanelHeadline>
							{localizations.artwork.title}
						</S.FrameLayout_PanelHeadline>
						<NavigationLinkList
							links={directoryMapArtwork.map(({ id }) => (
								<Link
									key={`artwork-category_${id}`}
									href={`/${locale}/${
										localizations.artwork.slug
									}/${getArtworkCategoryHref(
										localizations[id],
										localizations.page.slug
									)}`}
								>
									{localizations[id].title}
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
				<Link href={`/${locale}/${localizations.imprint.slug}`}>
					{localizations.imprint.title}
				</Link>

				{locale === "en" ? (
					<Link href={`/de`}>
						<a hrefLang="de">Deutsch</a>
					</Link>
				) : (
					<Link href={`/en`}>
						<a hrefLang="en">English</a>
					</Link>
				)}

				<Link href={`/${locale}/${localizations.contact.slug}`}>
					{localizations.contact.title}
				</Link>
			</S.FrameLayout_Footer>
		</S.FrameLayout>
	);
}
