import path from "path";
import { writeFileSync, readdirSync } from "fs";

import { getChildDirectories } from "./utilities.mjs";

const aboutPath = path.join(process.cwd(), "content", "about");
const aboutDirectoryChildren = getChildDirectories(aboutPath);

const about = aboutDirectoryChildren.map(({ name: id }) => {
	const aboutCategoryPath = path.join(aboutPath, id);
	const aboutCategoryDirectoryChildren =
		getChildDirectories(aboutCategoryPath);

	return {
		id: `about_${id}`,
		children: aboutCategoryDirectoryChildren.map(({ name: pressId }) => {
			return {
				id: `about_${id}_${pressId}`,
				files: readdirSync(path.join(aboutCategoryPath, pressId), {
					withFileTypes: true,
				})
					.filter(
						(dirent) =>
							dirent.isFile() &&
							path
								.extname(dirent.name)
								.match(/.(jpe?g|png|pdf)$/i)
					)
					.map((dirent) => {
						return dirent.name;
					}),
			};
		}),
	};
});

console.log(about);

writeFileSync("data/directoryMapAbout.json", JSON.stringify(about));
