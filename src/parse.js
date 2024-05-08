import yaml from "js-yaml";


export const parse = (data, fileType) => {
    switch (fileType) {
        case "json":
            return JSON.parse(data);
        case "yaml":
        case "yml":
            return yaml.load(data);
        default:
            throw new "Unknown file extension";
    }
}