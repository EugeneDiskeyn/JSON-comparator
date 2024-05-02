import pkg from 'lodash';
const { isPlainObject } = pkg;


export const getStylishedOutput = (comparedFile, tabulation = "") => {
    const array = Object.keys(comparedFile).map((key) => {
        const sign = getSign(comparedFile[key]["status"]);
        
        if (isPlainObject(comparedFile[key]["property"])) {
            return `${tabulation}${sign} "${key}":\n${getStylishedOutput(comparedFile[key]["property"], tabulation + "    ")}`;
        } else {
            let line = ``;
            if (comparedFile[key]["oldProperty"] !== undefined) {
                if (isPlainObject(comparedFile[key]["oldProperty"])) {
                    line += `${tabulation}- "${key}": "[complex value]"\n`;
                } else {
                    line  += `${tabulation}- "${key}": "${comparedFile[key]["oldProperty"]}"\n`;
                }
            }
            line += `${tabulation}${sign} "${key}": "${comparedFile[key]["property"]}"`;

            return line;
        }
    })

    return array.join("\n");
}


const getSign = (status) => {
    switch (status) {
        case "nothing":
        case "unchanged":
        case "changedInsides":
            return " ";
        case "added":
            return "*";
        case "changed":
            return "+";
        case "removed":
            return "-";
        default:
            return;
    }
}