import styled from "styled-components";

import { ResetList } from "../ResetList";

export const Breadcrumbs_List = styled(ResetList)`
	> li {
		display: inline;

		+ li::before {
			display: inline-block;
			margin: 0 0.75ch;
			transform: rotate(15deg);
			border-right: 0.1rem solid currentcolor;
			height: 0.8em;
			content: "";
		}
	}

	[aria-current="page"] {
		color: inherit;
		text-decoration: none;
	}
`;
