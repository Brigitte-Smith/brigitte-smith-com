import { writeFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

import { getChildDirectories, readFile } from "./utilities.mjs";
import nextConfig from "../next.config.js";

const BASE_PATH = path.join(process.cwd(), "content");
const LOCALES = nextConfig.i18n.locales;

let localizations = {};

function readChildren(childrenPath, parentName) {
	getChildDirectories(childrenPath).forEach(({ name }) => {
		LOCALES.forEach((locale) => {
			const directoryPath = path.join(childrenPath, name);
			const { data, content } = matter(
				readFile(directoryPath, `${locale}.md`)
			);
			const key = parentName ? `${parentName}_${name}` : name;
			localizations[locale] = {
				...localizations[locale],
				[key]: { ...data, content: content.trim() },
			};

			readChildren(directoryPath, key);
		});
	});
}

LOCALES.forEach((locale) => {
	const { data } = matter(readFile(BASE_PATH, `${locale}.md`));
	localizations[locale] = { ...localizations[locale], ...data };
});

readChildren(BASE_PATH);

nextConfig.i18n.locales.forEach((locale) => {
	console.log(locale, localizations);

	writeFileSync(
		path.join(process.cwd(), "locales", `${locale}.json`),
		JSON.stringify(localizations[locale])
	);
});
