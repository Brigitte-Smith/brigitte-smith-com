import { readdirSync, mkdirSync, existsSync } from "fs";
import path from "path";
import sharp from "sharp";

function getChildDirectories(path) {
	return readdirSync(path, {
		withFileTypes: true,
	}).filter((dirent) => dirent.isDirectory());
}

const IMAGE_WIDTHS = [120, 380];

const baseFilePath = path.join(process.cwd(), "public", "images", "artwork");

IMAGE_WIDTHS.forEach((width) => {
	const directoryPath = path.join(baseFilePath, `${width}`);
	if (!existsSync(directoryPath)) {
		mkdirSync(directoryPath);
	}
});

// WORK
const workPath = path.join(process.cwd(), "content", "artwork");
const workDirectoryChildren = getChildDirectories(workPath);

// CATEGORIES
workDirectoryChildren.forEach(({ name }) => {
	const categoryPath = path.join(workPath, name);
	const categoryDirectoryChildren = getChildDirectories(categoryPath);

	// ARTWORK
	categoryDirectoryChildren.forEach(({ name }) => {
		const originalFilePath = path.join(categoryPath, name);

		readdirSync(originalFilePath, {
			withFileTypes: true,
		})
			.filter(
				(dirent) =>
					dirent.isFile() &&
					path.extname(dirent.name).match(/.(jpe?g|png)$/i)
			)
			.forEach(async (dirent) => {
				const originalFileName = dirent.name;
				const originalFile = path.join(
					originalFilePath,
					originalFileName
				);

				const baseFile = path.join(baseFilePath, originalFileName);
				const baseFileWebp = baseFile.replace(
					/.(jpe?g|png)$/i,
					".webp"
				);

				try {
					await sharp(originalFile)
						.resize({ width: 1200 })
						.toFile(baseFile);
					console.log("Image created", baseFile);

					await sharp(baseFile)
						.webp({ quality: 80 })
						.toFile(baseFileWebp);
					console.log("Image created", baseFileWebp);
				} catch (error) {
					console.warn(
						"Error processing base image:",
						error,
						baseFile
					);
				}

				IMAGE_WIDTHS.forEach(async (width) => {
					const baseFileResized = path.join(
						baseFilePath,
						`${width}`,
						originalFileName
					);
					const baseFileWebpResized = baseFileResized.replace(
						/.(jpe?g|png)$/i,
						".webp"
					);

					try {
						await sharp(baseFile)
							.resize({ width })
							.toFile(baseFileResized);
						console.log("Image created", baseFileResized);

						await sharp(baseFileWebp)
							.resize({ width })
							.toFile(baseFileWebpResized);
						console.log("Image created", baseFileWebpResized);
					} catch (error) {
						console.warn(
							"Error processing resized image:",
							error,
							baseFile
						);
					}
				});
			});
	});
});
