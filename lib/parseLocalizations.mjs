import matter from "gray-matter";
import { writeFileSync } from "fs";

import { readFile, BASE_PATH, LOCALES } from "./utilities.mjs";

const localizations = {};

LOCALES.forEach((locale) => {
	const { data } = matter(readFile(BASE_PATH, `${locale}.md`));
	Object.entries(data).forEach(([key, entry]) => {
		if (localizations[key] === undefined) {
			localizations[key] = {};
		}
		localizations[key][locale] = entry;
	});
});

console.log(localizations);

writeFileSync("data/localizations.json", JSON.stringify(localizations));
