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
`;

export const FrameLayout_Footer = styled.footer`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
`;

export const FrameLayout_Body = styled.main`
	background: hsl(0deg 0% 100%);
	display: grid;
	gap: 10px;
	grid-template-columns: 166px auto;
	padding: 10px;
`;

export const FrameLayout_Panel = styled.section`
	background: hsl(0deg 0% 87%);
	padding: 10px;
`;

export const FrameLayout_PanelHeadline = styled.h2`
	font: inherit;
	font-weight: bold;
	margin-block: 0;
	text-transform: uppercase;
`;

export const FrameLayout_BodyPanels = styled.main`
	display: grid;
	gap: 10px;
	grid-template-rows: auto auto;
`;

export const FrameLayout_MainContentPanel = styled.div``;