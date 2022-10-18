export interface ArtworkCategory {
	id: string;
	title: string;
	slug: string;
	content?: string;
	contentLocale?: "de" | "en";
	sortField: "id" | "title" | "date";
	sortDirection: "asc" | "desc";
	artwork: Artwork[];
}

export interface Artwork {
	id: string;
	title: string;
	slug: string;
	categorySlug: string;
	date?: number;
	taxonomy?: ArtworkTaxonomy;
	size?: ArtworkSize;
	content?: string;
	contentLocale?: "de" | "en";
	images: string[];
	order?: number;
}

interface Size {
	value: number;
	unit: "m" | "cm";
}

export interface ArtworkSize {
	height: Size;
	width: Size;
}

interface ArtworkTaxonomy {
	tag?: string[];
	// category: ArtworkCategory;
}

interface ArtworkCategoryData {
	categories: ArtworkCategory[];
}
