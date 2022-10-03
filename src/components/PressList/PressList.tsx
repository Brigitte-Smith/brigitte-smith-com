import Link from "next/link";
import { useLocalization } from "../../context/LocalizationContext";
import * as S from "./PressList.styled";

export function PressList({ press }): JSX.Element {
	const localizations = useLocalization();

	return (
		<S.PressList>
			{press.map((id) => (
				<li key={id}>
					<Link
						href={`/${localizations.about.slug}/${localizations.about_press.slug}/${localizations[id].slug}`}
					>
						<a>
							<S.PressList_Title>
								{localizations[id].title}
							</S.PressList_Title>
						</a>
					</Link>
					<S.PressList_Summary>
						{localizations[id].summary}
					</S.PressList_Summary>
				</li>
			))}
		</S.PressList>
	);
}
