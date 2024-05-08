import fs from "fs";
import { parse } from "../src/parse.js";
import { showComparation } from "../src/comparison.js";
import { isAbsolute, basename } from "path";


export const gendiff = (path1, path2, format = "stylish") => {

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
        return "Check your path";
    }
}


const getData = (path, relativePath) => {
        return isAbsolute(path)? fs.readFileSync(path) : fs.readFileSync(`${relativePath + path}`);
}


const getFileType = (path) => {
    const fileName = basename(path);
    return fileName.split(".").pop();
}


const doesFileExist = (path, relativePath) => {
    return fs.existsSync(`${relativePath + path}`) || fs.existsSync(path)? true : false;
}