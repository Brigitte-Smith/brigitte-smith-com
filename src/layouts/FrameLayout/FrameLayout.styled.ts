import styled from "styled-components";

export const FrameLayout = styled.div`
	background: hsl(0deg 0% 78%);
	margin: 10px auto;
	padding: 1rem;
	width: min(100%, 882px);

	@media (min-width: 900px) {
		padding: 40px 80px;
	}
`;

export const FrameLayout_Header = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	text-transform: uppercase;

	a {
		color: inherit;
		margin-left: 1rem;
		text-align: right;

		&:focus,
		&:hover {
			font-weight: bold;
			text-decoration: none;
		}

		&:first-child {
			margin-left: 0;
			text-align: left;
		}
	}
`;

export const FrameLayout_Footer = styled.footer`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;

	a {
		color: inherit;

		&:focus,
		&:hover {
			font-weight: bold;
			text-decoration: none;
		}
	}
`;

export const FrameLayout_Body = styled.div`
	background: hsl(0deg 0% 100%);
	padding: 10px;

	@media (min-width: 900px) {
		display: grid;
		gap: 10px;
		grid-template-columns: 166px auto;
	}
`;

export const FrameLayout_Panel = styled.nav`
	background: hsl(0deg 0% 87%);
	overflow: hidden;
	padding: 10px;
`;

export const FrameLayout_PanelHeadline = styled.h2`
	font: inherit;
	font-weight: bold;
	margin-block: 0;
	margin-bottom: 8px;
	text-transform: uppercase;
`;

export const FrameLayout_LogoWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-shrink: 0;

	a {
		text-align: inherit;
	}
`;

export const FrameLayout_NavTrigger = styled.a`
	display: inline-flex;

	> svg {
		height: 2em;
		width: 2em;
	}

	@media (min-width: 900px) {
		display: none;
	}
`;

export const FrameLayout_NavMenu = styled.div`
	display: none;
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1;

	&:target {
		display: block;
	}

	@media (min-width: 900px) {
		display: block;
		position: static;
	}
`;

export const FrameLayout_NavMenuClose = styled.a`
	background: hsl(0 0% 0% / 0.75);
	inset: 0;
	position: absolute;
	z-index: -1;

	@media (min-width: 900px) {
		display: none;
	}
`;

export const FrameLayout_MenuHeader = styled.div`
	margin-top: 2rem;
	padding: 10px;
	text-transform: uppercase;

	a {
		color: inherit;
	}

	@media (min-width: 900px) {
		display: none;
	}
`;

export const FrameLayout_BodyPanels = styled.div`
	background: white;
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: 100%;
	max-width: calc(100% - 4rem);
	overflow-y: auto;
	width: 15rem;

	> * {
		flex-shrink: 0;
	}

	@media (min-width: 900px) {
		background: none;
		max-width: none;
		width: auto;
	}
`;

export const FrameLayout_MainContentPanel = styled.main`
	min-height: 380px;
`;
