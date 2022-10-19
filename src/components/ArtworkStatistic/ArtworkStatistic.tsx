import { ReactNode } from "react";

import * as S from "./ArtworkStatistic.styled";

export function ArtworkStatistic({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}): JSX.Element {
	return (
		<S.ArtworkStatistic>
			<S.ArtworkStatistic_Label>{label}:</S.ArtworkStatistic_Label>
			<S.ArtworkStatistic_Value>{children}</S.ArtworkStatistic_Value>
		</S.ArtworkStatistic>
	);
}
