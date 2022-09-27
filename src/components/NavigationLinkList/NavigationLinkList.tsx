import * as S from "./NavigationLinkList.styled";

export function NavigationLinkList({
	links,
}: {
	links: JSX.Element[];
}): JSX.Element {
	return (
		<S.NavigationLinkList>
			{links.map((link, index) => (
				<li key={`linklist_${index}`}>{link}</li>
			))}
		</S.NavigationLinkList>
	);
}
