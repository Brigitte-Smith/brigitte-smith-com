import path from "path";
import matter from "gray-matter";
import { writeFileSync, readdirSync } from "fs";

import { getChildDirectories, readFile } from "./utilities.mjs";

const LOCALES = ["de", "en"];
const DEFAULT_SORT_FIELD = "title";
const DEFAULT_SORT_DIRECTION = "asc";

function parseArtwork(artworkId, artworkCategoryPath, locale, categorySlug) {
	const artworkPath = path.join(artworkCategoryPath, artworkId);

	const { data, content } = matter(readFile(artworkPath, `${locale}.md`));
	const images = readdirSync(artworkPath, {
		withFileTypes: true,
	})
		.filter(
			(dirent) =>
				dirent.isFile() &&
				path.extname(dirent.name).match(/.(jpe?g|png)$/i)
		)
		.map((dirent) => {
			return dirent.name;
		});

	return {
		id: artworkId,
		...data,
		categorySlug,
		content,
		images,
	};
}

function parseArtworkCategory(categoryId, categoryPath) {
	const artworkCategoryPath = path.join(categoryPath, categoryId);

	const locales = {};

	LOCALES.forEach((locale) => {
		const { data, content } = matter(
			readFile(artworkCategoryPath, `${locale}.md`)
		);
		data.sortField = data.sortField ?? DEFAULT_SORT_FIELD;
		data.sortDirection = data.sortDirection ?? DEFAULT_SORT_DIRECTION;

		const artwork = getChildDirectories(artworkCategoryPath)
			.map(({ name }) =>
				parseArtwork(name, artworkCategoryPath, locale, data.slug)
			)
			.filter((artwork) => artwork.images.length > 0)
			.sort((a, b) => {
				if (data.sortDirection === "desc") {
					const defaultValue =
						data.sortField === "date" || data.sortField === "order"
							? 0
							: "";
					const currentValue = a[data.sortField] ?? defaultValue;
					const previousValue = b[data.sortField] ?? defaultValue;
					console.log(artworkCategoryPath, data.sortDirection, {
						defaultValue,
						currentValue,
						previousValue,
					});
					return currentValue < previousValue ? 1 : -1;
				} else {
					const defaultValue =
						data.sortField === "date" || data.sortField === "order"
							? 9999
							: "zzzz";
					const currentValue = a[data.sortField] ?? defaultValue;
					const previousValue = b[data.sortField] ?? defaultValue;
					console.log(
						artworkCategoryPath,
						data.sortDirection,
						data.sortField,
						{
							defaultValue,
							currentValue,
							previousValue,
						}
					);
					return currentValue > previousValue ? 1 : -1;
				}
			});

		if (artwork.length > 0) {
			locales[locale] = {
				id: categoryId,
				...data,
				content,
				artwork,
			};
		}
	});

	if (locales.de || locales.en) {
		return locales;
	} else {
		return;
	}
}

const workPath = path.join(process.cwd(), "content", "artwork");
const workDirectoryChildren = getChildDirectories(workPath);

const artworkCategories = workDirectoryChildren
	.map(({ name }) => {
		return parseArtworkCategory(name, workPath);
	})
	.filter((artworkCategory) => {
		// console.log(artworkCategory);
		return artworkCategory;
	});

// console.log(artworkCategories);

writeFileSync("data/artwork.json", JSON.stringify(artworkCategories));

// const locales = { de: [], en: [] };

// artworkCategories.flat().forEach((artworkCategory) => {
// 	Object.entries(artworkCategory).forEach(([locale, category]) => {
// 		locales[locale].push(category);
// 	});
// });

// console.log(locales["de"][11].artwork);
// // console.log(locales["de"][1]);
