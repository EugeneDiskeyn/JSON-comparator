import { parse } from "../src/parse.js";
import { showComparation } from "../src/comparison.js";
import { isAbsolute } from "path";
import Path from "path"
import file from "fs"


export const gendiff = (path1, path2, format) => {

    const relativePath = "../data/";

    if (doesFileExist(path1, relativePath) && doesFileExist(path2, relativePath)) {

        const data1 = getData(path1, relativePath);
        const data2 = getData(path2, relativePath);

        const fileType1 = getFileType(path1);
        const fileType2 = getFileType(path2);

        const file1 = parse(data1, fileType1);
        const file2 = parse(data2, fileType2);
    
        return showComparation(file1, file2, format);
    } else {
        return "Check your path"
    }
}


const getData = (path, relativePath) => {
        const data = isAbsolute(path)? file.readFileSync(path) : file.readFileSync(`${relativePath + path}`);
        return data;
}


const getFileType = (path) => {
    const fileName = Path.basename(path);
    return fileName.split(".").pop();
}


const doesFileExist = (path, relativePath) => {
    if (file.existsSync(`${relativePath + path}`) || file.existsSync(path)) {
        return true;
    }
    return false;
}