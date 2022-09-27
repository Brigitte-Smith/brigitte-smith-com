import { readdirSync, writeFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

import { getChildDirectories, readFile } from "./utilities.mjs";
import nextConfig from "../next.config.js";

/*
{
	[locale]: {
		work: {
			name: string;
			slug: string;
			categories: {
				name: string;
				slug: string;
				content: string;
				artworks: {
					name: string;
					slug: string;
					content: string;
					images: string[];
				}[];
			}[];
		};
		about: {}
	};
}
*/

const data = {};

// create locales
nextConfig.i18n.locales.forEach((locale) => {
	data[locale] = {};

	// WORK
	const workPath = path.join(process.cwd(), "content", "artwork");
	const workDirectoryChildren = getChildDirectories(workPath);
	const workDirectoryReadMe = readFile(workPath, `${locale}.md`);

	const {
		data: { title: workTitle, slug: workSlug },
	} = matter(workDirectoryReadMe);

	// CATEGORIES
	const categories = workDirectoryChildren
		.map(({ name }) => {
			const categoryPath = path.join(workPath, name);
			const categoryDirectoryChildren = getChildDirectories(categoryPath);
			const categoryDirectoryReadMe = readFile(
				categoryPath,
				`${locale}.md`
			);

			const {
				content,
				data: { title: categoryTitle, slug: categorySlug },
			} = matter(categoryDirectoryReadMe);

			// ARTWORK
			const artwork = categoryDirectoryChildren
				.map(({ name }) => {
					const artworkPath = path.join(categoryPath, name);
					const artworkDirectoryReadMe = readFile(
						artworkPath,
						`${locale}.md`
					);

					const {
						content,
						data: { title: artworkTitle, slug: artworkSlug },
					} = matter(artworkDirectoryReadMe);

					const images = readdirSync(artworkPath, {
						withFileTypes: true,
					})
						.filter(
							(dirent) =>
								dirent.isFile() &&
								path
									.extname(dirent.name)
									.match(/.(jpe?g|png)$/i)
						)
						.map((dirent) => dirent.name);

					return {
						name: artworkTitle,
						slug: artworkSlug,
						images,
						content: content.trim(),
					};
				})
				.filter((artwork) => artwork.images.length > 0);

			return {
				name: categoryTitle,
				slug: categorySlug,
				artwork,
				content: content.trim(),
			};
		})
		.filter((category) => category.artwork.length > 0);

	data[locale]["work"] = {
		name: workTitle,
		slug: workSlug,
		categories,
	};
});

// unlinkSync("data.json");
writeFileSync("data.json", JSON.stringify(data));
