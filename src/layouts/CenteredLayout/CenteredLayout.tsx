import { ReactNode } from "react";

import { FrameLayout } from "../FrameLayout";

import * as S from "./CenteredLayout.styled";

export function CenteredLayout({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}): JSX.Element {
	return (
		<FrameLayout>
			<S.CenteredLayout className={className}>
				<S.CenteredLayout_Content>{children}</S.CenteredLayout_Content>
			</S.CenteredLayout>
		</FrameLayout>
	);
}
