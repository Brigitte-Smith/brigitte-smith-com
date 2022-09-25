import styled from "styled-components";

export const HomeBillboard = styled.main`
	margin: 7rem auto;
	position: relative;
	width: 45rem;
`;

export const HomeBillboard_Foreground = styled.nav`
	bottom: 0;
	font-weight: bold;
	letter-spacing: 2px;
	padding: 6px;
	position: absolute;
`;

export const HomeBillboard_Headline = styled.h1`
	font: inherit;
	margin: 0;
`;

export const HomeBillboard_Links = styled.span`
	a {
		color: hsl(0deg 0% 37%);
	}
`;

export const HomeBillboard_Divider = styled.span`
	&::before {
		content: "|";
		display: inline-block;
		margin-inline: 6px;
	}
`;
