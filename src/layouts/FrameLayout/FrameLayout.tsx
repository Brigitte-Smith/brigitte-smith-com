import Link from "next/link";
import { ReactNode } from "react";

// import directoryMapArtwork from "../../../data/directoryMapArtwork.json";
import aboutCategoryMap from "../../../data/about.json";
import artworkCategoryMap from "../../../data/artwork.json";
// import directoryMapAbout from "../../../data/directoryMapAbout.json";
import topLevel from "../../../data/topLevel.json";

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
	const aboutCategories = Object.values(aboutCategoryMap);

	return (
		<S.FrameLayout>
			<S.FrameLayout_Header>
				<S.FrameLayout_LogoWrapper>
					<S.FrameLayout_NavTrigger href="#site-navigation">
						<svg viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
							/>
						</svg>
					</S.FrameLayout_NavTrigger>
					<Link href={`/${locale}`}>Brigitte Smith</Link>
				</S.FrameLayout_LogoWrapper>
				<a
					className="link--external"
					href="https://www.amazon.de/Brigitte-Smith-Art/dp/B01N2NA0DJ"
				>
					{localizations.artworkOnAmazon.text}{" "}
					<SvgIcon aria-hidden="true">
						<path
							fill="currentColor"
							d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
						></path>
					</SvgIcon>
				</a>
			</S.FrameLayout_Header>
			<S.FrameLayout_Body>
				<S.FrameLayout_NavMenu id="site-navigation">
					<S.FrameLayout_NavMenuClose href="#" />

					<S.FrameLayout_BodyPanels>
						<S.FrameLayout_MenuHeader>
							<Link href={`/${locale}`}>Brigitte Smith</Link>
						</S.FrameLayout_MenuHeader>
						<S.FrameLayout_Panel>
							<S.FrameLayout_PanelHeadline>
								{topLevel.about[locale].data.title}
							</S.FrameLayout_PanelHeadline>
							<NavigationLinkList
								links={aboutCategories.map((category) => (
									<Link
										key={`about-category_${category[locale].id}`}
										href={`/${locale}/${topLevel.about[locale].data.slug}/${category[locale].slug}`}
									>
										{category[locale].title}
									</Link>
								))}
							/>
						</S.FrameLayout_Panel>
						<S.FrameLayout_Panel>
							<S.FrameLayout_PanelHeadline>
								{topLevel.artwork[locale].data.title}
							</S.FrameLayout_PanelHeadline>
							<NavigationLinkList
								links={artworkCategoryMap.map((category) => (
									<Link
										key={`artwork-category_${category[locale].id}`}
										href={`/${locale}/${
											topLevel.artwork[locale].data.slug
										}/${getArtworkCategoryHref(
											category[locale],
											localizations.page.slug
										)}`}
									>
										{category[locale].title}
									</Link>
								))}
							/>
						</S.FrameLayout_Panel>
					</S.FrameLayout_BodyPanels>
				</S.FrameLayout_NavMenu>
				<S.FrameLayout_MainContentPanel>
					{children}
				</S.FrameLayout_MainContentPanel>
			</S.FrameLayout_Body>
			<S.FrameLayout_Footer>
				<Link href={`/${locale}/${topLevel.imprint[locale].data.slug}`}>
					{topLevel.imprint[locale].data.title}
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

				<Link href={`/${locale}/${topLevel.contact[locale].data.slug}`}>
					{topLevel.contact[locale].data.title}
				</Link>
			</S.FrameLayout_Footer>
		</S.FrameLayout>
	);
}
