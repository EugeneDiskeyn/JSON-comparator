export const getJsonOutput = (comparedFile) => {
    const stringified = JSON.stringify(comparedFile);
    
    let beautified = "";
    let tabulation = "";
    let bracketsCounter = 0;

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
                if (bracketsCounter === 0) {
                    beautified += `${sign}\n${tabulation}`;
                } else {
                    beautified += `${sign} `;
                }
                break;
            case ":":
                beautified += `${sign} `;
                break
            case "[":
                bracketsCounter++;
                beautified += sign;
                break;
            case "]":
                bracketsCounter--;
                beautified += sign;
                break;
            default:
                beautified += sign;
        }
    }
    return beautified;
}