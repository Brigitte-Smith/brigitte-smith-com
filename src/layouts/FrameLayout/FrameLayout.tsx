import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { SvgIcon } from "../../components/SvgIcon";

import { useLocalization } from "../../context/LocalizationContext";

import * as S from "./FrameLayout.styled";

export function FrameLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const { locale } = useRouter();

	const localization = useLocalization();
	console.log(localization);

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
							{localization.about.text}
						</S.FrameLayout_PanelHeadline>
					</S.FrameLayout_Panel>
					<S.FrameLayout_Panel>
						<S.FrameLayout_PanelHeadline>
							{localization.artwork.text}
						</S.FrameLayout_PanelHeadline>
					</S.FrameLayout_Panel>
				</S.FrameLayout_BodyPanels>
				<S.FrameLayout_MainContentPanel>
					{children}
				</S.FrameLayout_MainContentPanel>
			</S.FrameLayout_Body>

			<S.FrameLayout_Footer>
				<Link href={localization.imprint.slug} locale={locale}>
					{localization.imprint.text}
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
					{localization.contact.text}
				</Link>
			</S.FrameLayout_Footer>
		</S.FrameLayout>
	);
}
