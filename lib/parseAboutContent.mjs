import path from "path";
import matter from "gray-matter";
import { writeFileSync } from "fs";

import { BASE_PATH, getChildDirectories, readFile } from "./utilities.mjs";

const LOCALES = ["de", "en"];

function parseAboutDirectory(directoryId, directoryPath) {
	const aboutDirectoryPath = path.join(directoryPath, directoryId);

	const locales = {};

	LOCALES.forEach((locale) => {
		const { data, content } = matter(
			readFile(aboutDirectoryPath, `${locale}.md`)
		);

		locales[locale] = {
			id: directoryId,
			...data,
			content,
		};
	});

	if (locales.de || locales.en) {
		return locales;
	} else {
		return;
	}
}

const aboutPath = path.join(BASE_PATH, "about");
const aboutDirectoryChildren = getChildDirectories(aboutPath);

const about = aboutDirectoryChildren.map(({ name }) => {
	return parseAboutDirectory(name, aboutPath);
});

const aboutCategories = {};

about.forEach((aboutCategory) => {
	aboutCategories[aboutCategory.de.id] = aboutCategory;
});

console.log(aboutCategories);

writeFileSync("data/about.json", JSON.stringify(aboutCategories));
