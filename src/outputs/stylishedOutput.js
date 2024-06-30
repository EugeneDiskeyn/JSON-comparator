import _ from 'lodash';

export const getStylishedOutput = (comparedFile, tabulation = "") => {

    const array = Object.keys(comparedFile).map((key) => {

        const property = getProperty(comparedFile[key]["property"]);
        const oldProperty = getProperty(comparedFile[key]["oldProperty"]);
        const sign = getSign(comparedFile[key]["status"]);

        if (comparedFile[key]["status"] === "changed") {
            return `${tabulation}- "${key}": ${_.isPlainObject(oldProperty)? getOldProperty(oldProperty, tabulation + "    ") : oldProperty}\n${tabulation}+ "${key}": ${getPreviousProperty(property, tabulation)}`;
        }
        if (_.isPlainObject(property)) {
            return `${tabulation}${sign} "${key}":\n${getStylishedOutput(property, tabulation + "    ")}`;
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

const getOldProperty = (property, tabulation) => {
    const array =  Object.keys(property).map((key) => {
        if (_.isPlainObject(property[key])) {
            return getOldProperty(property[key], tabulation + "    ")
        }
        return `${tabulation}  "${key}": ${property[key]}`;
    })
    return `\n${array}`;
}

const getPreviousProperty = (property, tabulation) => {
    if (!_.isPlainObject(property)) {
        return property;
    }
    return `\n${getStylishedOutput(property, tabulation + "    ")}`;
}

const getProperty = (property) => {
    if (_.isArray(property)) {
        return JSON.stringify(property);
    }
    return property;
}