import { program } from "commander";
import { gendiff } from "../src/gendiff.js";

program
.description("Compares two configuration files and shows a difference.You can specify the full path to a file or only the name of it, if it is located in the working directory")
.version('1.0.0', '-V, --version', 'output the version number')
.helpOption('-h, --help', 'output the version nuber')
.argument("<first>", "First file path")
.argument("<second>", "Second file path")
.action((path1, path2)=>{
        console.log(gendiff(path1, path2));
})

program.parse();

const options = program.opts();

if (options.help) {
    program.help();
}