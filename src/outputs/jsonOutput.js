export const getJsonOutput = (comparedFile) => {
    const stringified = JSON.stringify(comparedFile)

    let beautified = "";
    let tabulation = "";

    for (let sign of stringified) {
        switch (sign) {
            case "{":
                tabulation += "    ";
                beautified += `${sign}\n${tabulation}`;
                break;
            case "}":
                tabulation = tabulation.slice(0, -4);
                beautified += `\n${tabulation}${sign}`;
                break;
            case ",":
                beautified += `${sign}\n${tabulation}`;
                break;
            case ":":
                beautified += `${sign} `;
                break
            default:
                beautified += sign;
        }
    }
    return beautified;
}