import { join, resolve } from 'path';
import { expectedAnswer } from "./expectedResult";
import { gendiff } from "../src/gendiff";
import { test, expect } from '@jest/globals';


test('JSON files are compared correctly', () => {
    const path = resolve();

    const jsonPath1 = join(path + "/data/file1.json");
    const jsonPath2 = join(path + "/data/file2.json");

    const yamlPath1 = join(path + "/data/file1.yaml");
    const yamlPath2 = join(path + "/data/file2.yaml");

    const ymlPath1 = join(path + "/data/file1.yml");
    const ymlPath2 = join(path + "/data/file2.yml");

    const jsonResult = gendiff(jsonPath1, jsonPath2);
    const yamlResult = gendiff(yamlPath1, yamlPath2);
    const ymlResult = gendiff(ymlPath1, ymlPath2);

    expect(jsonResult).toBe(expectedAnswer);
    expect(yamlResult).toBe(expectedAnswer);
    expect(ymlResult).toBe(expectedAnswer);
  });