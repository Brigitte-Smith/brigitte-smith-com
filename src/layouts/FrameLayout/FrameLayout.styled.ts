import styled from "styled-components";

export const FrameLayout = styled.div`
	background: hsl(0deg 0% 78%);
	margin: 10px auto;
	padding: 40px 80px;
	width: 882px;
`;

export const FrameLayout_Header = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	text-transform: uppercase;

	a {
		color: inherit;

		&:focus,
		&:hover {
			font-weight: bold;
			text-decoration: none;
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
	display: grid;
	gap: 10px;
	grid-template-columns: 166px auto;
	padding: 10px;
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

export const FrameLayout_BodyPanels = styled.div`
	display: grid;
	gap: 10px;
	grid-template-rows: auto 1fr;
`;

export const FrameLayout_MainContentPanel = styled.main`
	min-height: 380px;
`;
