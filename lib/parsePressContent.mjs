import path from "path";
import matter from "gray-matter";
import { writeFileSync, readdirSync } from "fs";

import { BASE_PATH, getChildDirectories, readFile } from "./utilities.mjs";

const LOCALES = ["de", "en"];

const pressPath = path.join(BASE_PATH, "about", "press");
const pressDirectoryChildren = getChildDirectories(pressPath);

const pressArticles = pressDirectoryChildren.map(({ name: pressId }) => {
	const pressArticlePath = path.join(pressPath, pressId);
	const locales = {};

	LOCALES.forEach((locale) => {
		const { data, content } = matter(
			readFile(pressArticlePath, `${locale}.md`)
		);

		locales[locale] = {
			id: pressId,
			...data,
			content,
			files: readdirSync(path.join(pressPath, pressId), {
				withFileTypes: true,
			})
				.filter(
					(dirent) =>
						dirent.isFile() &&
						path.extname(dirent.name).match(/.(jpe?g|png|pdf)$/i)
				)
				.map((dirent) => {
					return dirent.name;
				}),
		};
	});

	return locales;
});

console.log(pressArticles);

writeFileSync("data/press.json", JSON.stringify(pressArticles));
