import styled from "styled-components";

export const HomeBillboard = styled.main`
	aspect-ratio: 9 / 10;
	margin: 1rem auto;
	max-height: calc(100vh - 2rem);
	position: relative;
	width: min(90%, 45rem);

	@media (min-width: 500px) {
		aspect-ratio: auto;
		margin: 7rem auto;
		max-height: none;
	}
`;

export const HomeBillboard_Img = styled.img`
	position: absolute;
	object-fit: cover;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	@media (min-width: 500px) {
		position: relative;
	}
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
