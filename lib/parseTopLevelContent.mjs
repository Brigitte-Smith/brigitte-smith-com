import path from "path";
import matter from "gray-matter";
import { writeFileSync } from "fs";

import {
	getChildDirectories,
	BASE_PATH,
	LOCALES,
	readFile,
} from "./utilities.mjs";

const topLevel = {};

getChildDirectories(BASE_PATH)
	// .filter(({ name }) => name !== "artwork" && name !== "about")
	.forEach(({ name }) => {
		LOCALES.forEach((locale) => {
			const directoryPath = path.join(BASE_PATH, name);
			const { data, content } = matter(
				readFile(directoryPath, `${locale}.md`)
			);

			if (topLevel[name] === undefined) {
				topLevel[name] = {};
			}

			topLevel[name][locale] = {
				data,
				content,
			};
		});
	});

console.log(topLevel);

writeFileSync("data/topLevel.json", JSON.stringify(topLevel));
