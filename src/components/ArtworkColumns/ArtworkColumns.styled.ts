import styled from "styled-components";

export const ArtworkColumns = styled.div`
	@media (min-width: 900px) {
		display: grid;
		gap: 8px;
		grid-template-columns: 23rem 1fr auto;
		min-height: 22rem;
	}
`;

export const ArtworkColumns_Artwork = styled.div`
	margin-bottom: 1.5rem;

	@media (min-width: 900px) {
		margin-bottom: 0;
	}
`;

export const ArtworkColumns_Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ArtworkColumns_Nav = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
