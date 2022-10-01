import path from "path";
import { writeFileSync, readdirSync } from "fs";

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

const artwork = workDirectoryChildren
	.map(({ name: categoryId }) => {
		const artworkPath = path.join(workPath, categoryId);
		const artworkDirectoryChildren = getChildDirectories(artworkPath);

		return {
			id: `artwork_${categoryId}`,
			artwork: artworkDirectoryChildren
				.map(({ name: artworkId }) => ({
					id: `artwork_${categoryId}_${artworkId}`,
					images: readdirSync(path.join(artworkPath, artworkId), {
						withFileTypes: true,
					})
						.filter(
							(dirent) =>
								dirent.isFile() &&
								path
									.extname(dirent.name)
									.match(/.(jpe?g|png)$/i)
						)
						.map((dirent) => {
							return dirent.name;
						}),
				}))
				.filter((artwork) => artwork.images.length > 0),
		};
	})
	.filter((category) => category.artwork.length > 0);

console.log(artwork);

writeFileSync("data/directoryMapArtwork.json", JSON.stringify(artwork));
