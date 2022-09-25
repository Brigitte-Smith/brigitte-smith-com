import styled from "styled-components";

export const HomeLayout = styled.div`
	background: hsl(0deg 0% 78%);
	margin: 10px auto;
	padding: 40px 80px;
	width: 882px;
`;

export const HomeLayoutHeader = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	text-transform: uppercase;
`;

export const HomeLayoutFooter = styled.footer`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
`;

export const HomeLayoutBody = styled.div`
	background: hsl(0deg 0% 100%);
	display: grid;
	gap: 10px;
	grid-template-columns: 166px auto;
	padding: 10px;
`;

export const HomeLayoutPanel = styled.div`
	background: hsl(0deg 0% 87%);
	padding: 10px;
`;

export const HomeLayoutBodyPanels = styled.div`
	display: grid;
	gap: 10px;
	grid-template-rows: auto auto;
`;

export const HomeLayoutBodyPanel = styled.div``;

export const HomeIframeWork = styled.div`
	border: 0;
	width: 100%;
	height: 320px;
`;
