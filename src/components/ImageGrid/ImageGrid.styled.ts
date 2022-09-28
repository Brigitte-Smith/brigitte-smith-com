import styled from "styled-components";

export const ImageGrid = styled.ul`
	display: grid;
	gap: 4px;
	grid-template-columns: 1fr 1fr 1fr;
	list-style: none;
	margin: 0;
	padding-left: 0;
	width: 360px;
`;

export const ImageGridLink = styled.a`
	aspect-ratio: 1 / 1;
	display: block;
	position: relative;

	img {
		height: 100%;
		inset: 0 auto auto 0;
		object-fit: cover;
		position: absolute;
		width: 100%;
	}
`;
