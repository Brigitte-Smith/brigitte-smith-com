import path from "path";
import { readdirSync, readFileSync } from "fs";

export const BASE_PATH = path.join(process.cwd(), "content");
export const LOCALES = ["de", "en"];

export function readFile(filePath, fileName) {
	const fullPath = path.join(filePath, fileName);
	return readFileSync(fullPath, "utf8");
}

export function getChildFiles(directoryPath) {
	return readdirSync(directoryPath, {
		withFileTypes: true,
	}).filter((dirent) => dirent.isFile());
}

export function getChildDirectories(directoryPath) {
	return readdirSync(directoryPath, {
		withFileTypes: true,
	}).filter((dirent) => dirent.isDirectory());
}
