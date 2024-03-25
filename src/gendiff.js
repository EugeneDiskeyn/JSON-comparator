import { parse } from "../src/parse.js";
import { showComparation } from "../src/comparison.js";

export const gendiff = (path1, path2) => {
    const file1 = parse(path1, "json");
    const file2 = parse(path2, "json");
  
    console.log(showComparation(file1, file2));
}