import Link from "next/link";
import { useRouter } from "next/router";
import { useLocalization } from "../../context/LocalizationContext";
import * as S from "./PressList.styled";

export function PressList({ press }): JSX.Element {
	const localizations = useLocalization();
	const { locale } = useRouter();
	console.log({ press });
	return (
		<S.PressList>
			{press.map(({ id }) => (
				<li key={id}>
					<div>
						<Link
							href={`/${localizations.about.slug}/${localizations.about_press.slug}/${localizations[id].slug}`}
						>
							<a
								hrefLang={
									localizations[id]?.language !== locale &&
									localizations[id]?.language
								}
							>
								<S.PressList_Title>
									{localizations[id].title}
								</S.PressList_Title>
							</a>
						</Link>
						{localizations[id]?.language &&
							localizations[id]?.language !== locale && (
								<S.PressList_Language>
									{localizations[id].language === "de" &&
										localizations.inGerman.text}
								</S.PressList_Language>
							)}
					</div>
					<S.PressList_Summary>
						{localizations[id].summary}
					</S.PressList_Summary>
				</li>
			))}
		</S.PressList>
	);
}
