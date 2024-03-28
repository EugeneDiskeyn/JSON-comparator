import { join, resolve } from 'path';
import { expectedAnswer } from "./expectedResult";
import { gendiff } from "../src/gendiff";

test('JSON files are compared correctly', () => {
    const path = resolve();

    const path1 = join(path + "/data/file1.json");
    const path2 = join(path + "/data/file2.json");

    const result = gendiff(path1, path2);

    expect(result).toBe(expectedAnswer);
  });