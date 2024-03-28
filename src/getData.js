import file from "fs"
import { isAbsolute } from "path";

export const getData = (path) => {
    const relativePath = "../data/"

    if (file.existsSync(`${relativePath + path}`) || file.existsSync(path)) {
        const data = isAbsolute(path)? file.readFileSync(path) : file.readFileSync(`${relativePath + path}`);
        return data;
    }
    return null;
}