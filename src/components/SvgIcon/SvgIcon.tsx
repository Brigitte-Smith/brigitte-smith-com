import { ReactNode } from "react";

import * as S from "./SvgIcon.styled";

export function SvgIcon({ children }: { children: ReactNode }): JSX.Element {
	return (
		<S.SvgIcon height="24" width="24">
			{children}
		</S.SvgIcon>
	);
}
