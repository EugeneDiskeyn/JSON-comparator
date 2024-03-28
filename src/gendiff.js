import { parse } from "../src/parse.js";
import { showComparation } from "../src/comparison.js";
import { getData } from "./getData.js";
import { getFileType } from "./getFileType.js";

export const gendiff = (path1, path2) => {

    const data1 = getData(path1);
    const data2 = getData(path2);

    const fileType1 = getFileType(path1);
    const fileType2 = getFileType(path2);

    const file1 = parse(data1, fileType1);
    const file2 = parse(data2, fileType2);
  
    return showComparation(file1, file2);
}