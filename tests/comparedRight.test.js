import { join, resolve } from 'path';
import { expectedResult } from "./expectedResult";
import { expectedComplexResult } from './expectedComplexResult';
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

    const complexJsonPath1 = join(path + "/data/complexFile1.json");
    const complexjsonPath2 = join(path + "/data/complexFile2.json");

    const complexYamlPath1 = join(path + "/data/complexFile1.yaml");
    const complexYamlPath2 = join(path + "/data/complexFile2.yaml");

    const complexYmlPath1 = join(path + "/data/complexFile1.yml");
    const complexYmlPath2 = join(path + "/data/complexFile2.yml");

    const jsonResult = gendiff(jsonPath1, jsonPath2);
    const yamlResult = gendiff(yamlPath1, yamlPath2);
    const ymlResult = gendiff(ymlPath1, ymlPath2);

    const complexJsonResult = gendiff(complexJsonPath1, complexjsonPath2);
    const complexYamlResult = gendiff(complexYamlPath1, complexYamlPath2);
    const complexYmlResult = gendiff(complexYmlPath1, complexYmlPath2);

    expect(jsonResult).toBe(expectedResult);
    expect(yamlResult).toBe(expectedResult);
    expect(ymlResult).toBe(expectedResult);
    expect(complexJsonResult).toBe(expectedComplexResult);
    expect(complexYamlResult).toBe(expectedComplexResult);
    expect(complexYmlResult).toBe(expectedComplexResult);
  });