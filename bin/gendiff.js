import { program } from "commander";
import { isAbsolute } from "path";
import file from "fs";

import { parse } from "../src/parse.js"

program
.description("Compares two configuration files and shows a difference.You can specify the full path to a file or only the name of it, if it is located in the working directory")
.version('1.0.0', '-V, --version', 'output the version number')
.option('-h, --help', 'output the version nuber')
.argument("<first>", "First file path")
.argument("<second>", "Second file path")
.action((path1, path2)=>{
    if (file.existsSync(`../${path1}`) && file.existsSync(`../${path2}`) || file.existsSync(path1) && file.existsSync(path2)) {
        const jsonFile1 = isAbsolute(path1)? file.readFileSync(path1) : file.readFileSync(`../${path1}`);
        const jsonFile2 = isAbsolute(path2)? file.readFileSync(path2) : file.readFileSync(`../${path2}`);

        const file1 = parse(jsonFile1);
        const file2 = parse(jsonFile2);

        console.log(file1);
        console.log(file2);
    } else {
        console.log("Wrong path");
    }
})

program.parse();

const options = program.opts();

if (options.help) {
    program.help();
}