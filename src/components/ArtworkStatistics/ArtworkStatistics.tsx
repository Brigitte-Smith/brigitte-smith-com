import { ReactNode } from "react";

import * as S from "./ArtworkStatistics.styled";

export function ArtworkStatistics({
	statistics,
}: {
	statistics: {
		label: string;
		value: ReactNode;
	}[];
}): JSX.Element {
	return (
		<S.ArtworkStatistics>
			{statistics.map(({ label, value }) => (
				<>
					<S.ArtworkStatistics_Label>
						{label}:
					</S.ArtworkStatistics_Label>
					<S.ArtworkStatistics_Value>
						{value}
					</S.ArtworkStatistics_Value>
				</>
			))}
		</S.ArtworkStatistics>
	);
}
