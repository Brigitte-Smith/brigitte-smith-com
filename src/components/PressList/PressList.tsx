import Link from "next/link";

import { useLocalization } from "../../context/LocalizationContext";
import * as S from "./PressList.styled";
import topLevel from "../../../data/topLevel.json";
import about from "../../../data/about.json";

export function PressList({ press }: { press: Press }): JSX.Element {
	const { locale, localizations } = useLocalization();

	return (
		<S.PressList>
			{press.map((article) => (
				<li key={article.id}>
					<div>
						<Link
							href={`/${locale}/${topLevel.about[locale].data.slug}/${about.press[locale].slug}/${article.slug}`}
						>
							<a
								hrefLang={
									article?.language !== locale &&
									article?.language
								}
							>
								<S.PressList_Title>
									{article.title}
								</S.PressList_Title>
							</a>
						</Link>
						{article?.language && article?.language !== locale && (
							<S.PressList_Language>
								{article.language === "de" &&
									localizations.inGerman.text}
							</S.PressList_Language>
						)}
					</div>
					<S.PressList_Summary>{article.summary}</S.PressList_Summary>
				</li>
			))}
		</S.PressList>
	);
}
