import yaml from "js-yaml";

export const parse = (data, fileType) => {
    switch (fileType) {
        case "json":
            return JSON.parse(data);
        case "yml":
            return yaml.load(data);
    }
}