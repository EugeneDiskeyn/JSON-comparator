export const getJsonOutput = (comparedFile) => {
    const stringified = JSON.stringify(comparedFile)
    const length = stringified.length;

    let beautified = "";
    let tabulation = "";

    for (let i = 0; i < length; i++) {
        beautified += stringified[i];
        
        if (stringified[i] === "{") {
            tabulation += "    ";
            beautified += `\n${tabulation}`;
        }
        if (stringified[i+1] === "}") {
            tabulation = tabulation.slice(0, -4);
            beautified += `\n${tabulation}`;
        }
        if (stringified[i] === ",") {
            beautified += `\n${tabulation}`;
        }
        if (stringified[i] === ":") {
            beautified += " "
        }
    }
    return beautified;
}