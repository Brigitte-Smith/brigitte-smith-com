import { ReactNode } from "react";

import { FrameLayout } from "../FrameLayout";

import * as S from "./HomeLayout.styled";

export function HomeLayout({ children }: { children: ReactNode }): JSX.Element {
	return (
		<FrameLayout>
			<S.HomeLayout>
				<S.HomeLayout_Content>{children}</S.HomeLayout_Content>
			</S.HomeLayout>
		</FrameLayout>
	);
}
