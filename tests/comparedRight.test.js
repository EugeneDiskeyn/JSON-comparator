import { showComparation } from "../src/comparison";
import { parse } from "../src/parse";
import { join, resolve } from 'path';

test('JSON files are compared correctly', () => {
    const path = resolve();

    const path1 = join(path + "/data/file1.json");
    const path2 = join(path + "/data/file2.json");

    const file1 = parse(path1);
    const file2 = parse(path2);

    const result = showComparation(file1, file2);

    expect(result).toBe(`- "follow": "false"
  "host": "hexlet.io"
- "proxy": "123.234.53.22"
+ "timeout": "50"
* "verbose": "true"`);
  });