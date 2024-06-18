import _ from 'lodash';


export const getStylishedOutput = (comparedFile, tabulation = "") => {

    const array = Object.keys(comparedFile).map((key) => {
        
        const sign = getSign(comparedFile[key]["status"]);

        if (_.isPlainObject(comparedFile[key]["property"])) {
            return `${tabulation}${sign} "${key}":\n${getStylishedOutput(comparedFile[key]["property"], tabulation + "    ")}`
        }
        if (comparedFile[key]["status"] === "changed") {
            return `${tabulation}- "${key}": "${comparedFile[key]["oldProperty"]}"\n${tabulation}+ "${key}": "${comparedFile[key]["property"]}"`;
        }
        return `${tabulation}${sign} "${key}": "${comparedFile[key]["property"]}"`;
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