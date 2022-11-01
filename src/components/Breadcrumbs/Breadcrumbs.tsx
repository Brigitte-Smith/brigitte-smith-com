import Link from "next/link";

import { Breadcrumb } from "./Breadcrumbs.annotations";
import * as S from "./Breadcrumbs.styled";

export function Breadcrumbs({
	label = "Breadcrumb",
	levels,
}: {
	label?: string;
	levels: Breadcrumb[];
}) {
	return (
		<nav aria-label={label}>
			<S.Breadcrumbs_List as="ol">
				{levels.map(({ href, text }, index) => (
					<li key={href}>
						<Link href={href}>
							<a
								aria-current={
									index + 1 === levels.length
										? "page"
										: undefined
								}
							>
								{text}
							</a>
						</Link>
					</li>
				))}
			</S.Breadcrumbs_List>
		</nav>
	);
}
