import path from "path";
import { writeFileSync } from "fs";

import { getChildDirectories } from "./utilities.mjs";

/*

artwork: [
    {
        id: plotin,
        artwork: [
            {
                id: plotin-1
            },
            {
                id: plotin-2
            }
            ...
        ]
    },
    {
        id: tafelbilder,
        artwork: [
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

const workPath = path.join(process.cwd(), "content", "artwork");
const workDirectoryChildren = getChildDirectories(workPath);

const artwork = workDirectoryChildren.map(({ name: id }) => {
	const artworkPath = path.join(workPath, id);
	const artworkDirectoryChildren = getChildDirectories(artworkPath);

	return { id, artwork: artworkDirectoryChildren.map(({ name: id }) => id) };
});

console.log(artwork);

writeFileSync("dataArtwork.json", JSON.stringify(artwork));
