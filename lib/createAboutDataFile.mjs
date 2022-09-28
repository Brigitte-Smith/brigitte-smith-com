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
	return { id };
	// const aboutPath = path.join(aboutPath, id);
	// const aboutDirectoryChildren = getChildDirectories(aboutPath);

	// return { id, about: aboutDirectoryChildren.map(({ name: id }) => id) };
});

// console.log(about);

writeFileSync("dataAbout.json", JSON.stringify(about));
