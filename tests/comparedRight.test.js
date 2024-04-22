import { join, resolve } from 'path';
import { expectedStylishedResult } from "./stylished/expectedStylishedResult";
import { expectedStylishedComplexResult } from './stylished/expectedStylishedComplexResult';
import { expectedPlainResult } from './plain/expectedPlainResult';
import { expectedPlainComplexResult } from './plain/expectedPlainComplexResult';
import { expectedJsonResult } from "./json/expectedJsonResult";
import { expectedJsonComplexResult } from "./json/expectedJsonComplexResult"

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
    const complexJsonPath2 = join(path + "/data/complexFile2.json");

    const complexYamlPath1 = join(path + "/data/complexFile1.yaml");
    const complexYamlPath2 = join(path + "/data/complexFile2.yaml");

    const complexYmlPath1 = join(path + "/data/complexFile1.yml");
    const complexYmlPath2 = join(path + "/data/complexFile2.yml");


    const stylishedJsonResult = gendiff(jsonPath1, jsonPath2, "stylish");
    const stylishedYamlResult = gendiff(yamlPath1, yamlPath2, "stylish");
    const stylishedYmlResult = gendiff(ymlPath1, ymlPath2, "stylish");

    const complexStylishedJsonResult = gendiff(complexJsonPath1, complexJsonPath2, "stylish");
    const complexStylishedYamlResult = gendiff(complexYamlPath1, complexYamlPath2, "stylish");
    const complexStylishedYmlResult = gendiff(complexYmlPath1, complexYmlPath2, "stylish");

    const plainJsonResult = gendiff(jsonPath1, jsonPath2, "plain");
    const plainYamlResult = gendiff(yamlPath1, yamlPath2, "plain");
    const plainYmlResult = gendiff(ymlPath1, ymlPath2, "plain");

    const plainComplexJsonResult = gendiff(complexJsonPath1, complexJsonPath2, "plain");
    const plainComplexYamlResult = gendiff(complexYamlPath1, complexYamlPath2, "plain");
    const plainComplexYmlResult = gendiff(complexYmlPath1, complexYmlPath2, "plain");

    const jsonJsonResult = gendiff(jsonPath1, jsonPath2, "JSON"); 
    const jsonYamlResult = gendiff(yamlPath1, yamlPath2, "JSON"); 
    const jsonYmlResult = gendiff(ymlPath1, ymlPath2, "JSON");
    
    const jsonJsonComplexResult = gendiff(complexJsonPath1, complexJsonPath2, "JSON"); 
    const jsonYamlComplexResult = gendiff(complexYamlPath1, complexYamlPath2, "JSON"); 
    const jsonYmlComplexResult = gendiff(complexYmlPath1, complexYmlPath2, "JSON");


    expect(stylishedJsonResult).toBe(expectedStylishedResult);
    expect(stylishedYamlResult).toBe(expectedStylishedResult);
    expect(stylishedYmlResult).toBe(expectedStylishedResult);

    expect(complexStylishedJsonResult).toBe(expectedStylishedComplexResult);
    expect(complexStylishedYamlResult).toBe(expectedStylishedComplexResult);
    expect(complexStylishedYmlResult).toBe(expectedStylishedComplexResult);

    expect(plainJsonResult).toBe(expectedPlainResult);
    expect(plainYamlResult).toBe(expectedPlainResult);
    expect(plainYmlResult).toBe(expectedPlainResult);

    expect(plainComplexJsonResult).toBe(expectedPlainComplexResult);
    expect(plainComplexYamlResult).toBe(expectedPlainComplexResult);
    expect(plainComplexYmlResult).toBe(expectedPlainComplexResult);

    expect(jsonJsonResult).toBe(expectedJsonResult);
    expect(jsonYamlResult).toBe(expectedJsonResult);
    expect(jsonYmlResult).toBe(expectedJsonResult);

    expect(jsonJsonComplexResult).toBe(expectedJsonComplexResult);
    expect(jsonYamlComplexResult).toBe(expectedJsonComplexResult);
    expect(jsonYmlComplexResult).toBe(expectedJsonComplexResult);
  });