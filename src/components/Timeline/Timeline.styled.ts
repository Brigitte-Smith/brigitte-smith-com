import styled from "styled-components";

export const Timeline = styled.dl`
	margin-bottom: 0;
	margin-top: 0;
`;

export const Timeline_Year = styled.dt`
	font-weight: bold;
	margin-bottom: -1.4em;

	&:not(:first-child) {
		margin-top: 0.75rem;
	}
`;

export const Timeline_Exhibitions = styled.dd`
	& + & {
		margin-top: 0.25rem;
	}

	> *:first-child {
		margin-top: 0;
	}

	> *:last-child {
		margin-bottom: 0;
	}
`;
