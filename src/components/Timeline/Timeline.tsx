import ReactMarkdown from "react-markdown";
import * as S from "./Timeline.styled";

function isoDate(year: string) {
	const date = new Date(year);
	return date.toISOString();
}

export function Timeline({ list }): JSX.Element {
	return (
		<S.Timeline>
			{list.map(({ year, exhibitions }) => (
				<>
					<S.Timeline_Year key={year}>
						<time dateTime={isoDate(year)}>{year}</time>
					</S.Timeline_Year>
					{exhibitions.map((exhibition) => (
						<S.Timeline_Exhibitions key={exhibition}>
							<ReactMarkdown>{exhibition}</ReactMarkdown>
						</S.Timeline_Exhibitions>
					))}
				</>
			))}
		</S.Timeline>
	);
}
