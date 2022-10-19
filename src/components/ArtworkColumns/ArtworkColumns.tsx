import { ReactNode } from "react";
import * as S from "./ArtworkColumns.styled";

export function ArtworkColumns({
	slotImage,
	slotContent,
	slotNav,
}: {
	slotImage: ReactNode;
	slotContent: ReactNode;
	slotNav: ReactNode;
}): JSX.Element {
	return (
		<S.ArtworkColumns>
			<S.ArtworkColumns_Artwork>{slotImage}</S.ArtworkColumns_Artwork>
			<S.ArtworkColumns_Content>{slotContent}</S.ArtworkColumns_Content>
			<S.ArtworkColumns_Nav>{slotNav}</S.ArtworkColumns_Nav>
		</S.ArtworkColumns>
	);
}
