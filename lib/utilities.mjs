import path from "path";
import { readdirSync, readFileSync } from "fs";

export function readFile(filepath, filename) {
	const fullPath = path.join(filepath, filename);
	return readFileSync(fullPath, "utf8");
}

export function getChildDirectories(path) {
	return readdirSync(path, {
		withFileTypes: true,
	}).filter((dirent) => dirent.isDirectory());
}
