import file from "fs";
import { isAbsolute } from "path";

export const parse = (path, fileType) => {
    const relativePath = "../data/"

    if (file.existsSync(`${relativePath + path}`) || file.existsSync(path)) {
        const jsonFile = isAbsolute(path)? file.readFileSync(path) : file.readFileSync(`${relativePath + path}`);
        return JSON.parse(jsonFile);
    }

    console.log("Wrong path");
    return null;
}