import Link from "next/link";
import styled from "styled-components";

export const PressList = styled.ul`
	list-style: none;
	margin: 0;
	padding-left: 0;

	> li {
		margin-bottom: 1rem;
	}
`;

export const PressList_Title = styled.span`
	color: hsl(0 0% 0%);
	font-weight: bold;
`;

export const PressList_Summary = styled.div`
	padding-left: 3rem;
`;
