import { ReactNode } from "react";

import { FrameLayout } from "../FrameLayout";

import * as S from "./CenteredLayout.styled";

export function CenteredLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<FrameLayout>
			<S.CenteredLayout>
				<S.CenteredLayout_Content>{children}</S.CenteredLayout_Content>
			</S.CenteredLayout>
		</FrameLayout>
	);
}
