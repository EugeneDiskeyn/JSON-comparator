import _ from 'lodash';

export const getStylishedOutput = (comparedFile, tabulation = "") => {

    const array = Object.keys(comparedFile).map((key) => {

        const property = getProperty(comparedFile[key]["property"]);
        const oldProperty = getProperty(comparedFile[key]["oldProperty"]);
        const sign = getSign(comparedFile[key]["status"]);

        if (_.isPlainObject(property)) {
            return `${tabulation}${sign} "${key}":\n${getStylishedOutput(comparedFile[key]["property"], tabulation + "    ")}`;
        }
        if (comparedFile[key]["status"] === "changed") {
            return `${tabulation}- "${key}": ${oldProperty}\n${tabulation}+ "${key}": ${property}`;
        }
        return `${tabulation}${sign} "${key}": ${property}`;
    })

    return array.join("\n");
}


const getSign = (status) => {
    switch (status) {
        case "unchanged":
        case "changedInsides":
        case "cargo":
            return " ";
        case "added":
            return "*";
        case "changed":
            return "+";
        case "removed":
            return "-";
        default:
            throw "There is no such status";
    }
}

const getProperty = (property) => {
    if (_.isString(property)) {
        return `"${property}"`;
    }
    if (_.isArray(property)) {
        return "[array];"
    }
    return property;
}