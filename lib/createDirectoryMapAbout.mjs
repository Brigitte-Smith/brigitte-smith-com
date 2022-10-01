import path from "path";
import { writeFileSync } from "fs";

import { getChildDirectories } from "./utilities.mjs";

/*

about: [
    {
        id: biography,
    },
    {
        id: press,
        children: [
            {
                id: african-bride
            },
            {
                id: african-spirit
            }
            ...
        ]
    },
    ...
]

*/

const aboutPath = path.join(process.cwd(), "content", "about");
const aboutDirectoryChildren = getChildDirectories(aboutPath);

const about = aboutDirectoryChildren.map(({ name: id }) => {
	const aboutCategoryPath = path.join(aboutPath, id);
	const aboutCategoryDirectoryChildren =
		getChildDirectories(aboutCategoryPath);

	return {
		id,
		about: aboutCategoryDirectoryChildren.map(({ name: id }) => id),
	};
});

console.log(about);

writeFileSync("data/directoryMapAbout.json", JSON.stringify(about));
