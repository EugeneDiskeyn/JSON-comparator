import _ from 'lodash';


export const getStylishedOutput = (comparedFile, tabulation = "") => {

    const array = Object.keys(comparedFile).map((key) => {
        const sign = getSign(comparedFile[key]["status"]);
        
        if (comparedFile[key]["status"] === undefined && _.isPlainObject(comparedFile[key])) {
            return `${tabulation}  "${key}":\n${getStylishedOutput(comparedFile[key], tabulation + "    ")}`;
        }
        if (comparedFile[key]["status"] === undefined && !_.isPlainObject(comparedFile[key])) {
            return `${tabulation}  "${key}": "${comparedFile[key]}"`;
        }

        let line = "";

        if (comparedFile[key]["status"] === "changed" && _.isPlainObject(comparedFile[key]["oldProperty"])) {
            line += `${tabulation}- "${key}": [complex value]\n`;
        }

        if (comparedFile[key]["status"] === "changed" && !_.isPlainObject(comparedFile[key]["oldProperty"])) {
            line += `${tabulation}- "${key}": "${comparedFile[key]["oldProperty"]}"\n`;
        }

        if (_.isPlainObject(comparedFile[key]["property"])) {
            return `${tabulation}${sign} "${key}":\n${getStylishedOutput(comparedFile[key]["property"], tabulation + "    ")}`
        }

        line += `${tabulation}${sign} "${key}": "${comparedFile[key]["property"]}"`;

        return line;
    })

    return array.join("\n");
}


const getSign = (status) => {
    switch (status) {
        case "unchanged":
        case "changedInsides":
        case undefined:
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