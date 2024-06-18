import _ from 'lodash';


export const getPlainOutput = (comparedFile, passedKey = "") => {
    const keys = Object.keys(comparedFile);

    const array = keys.map((key) => {

        const status = comparedFile[key]["status"];
        const currentKey = passedKey + key;
        
        switch (status) {
            case "changedInsides":
                return getPlainOutput(comparedFile[key]["property"], currentKey + ".");
            case "removed":
                return `Property ${currentKey} was removed`;
            case "added":
                return `Property ${currentKey} was added with value ${comparedFile[key]["property"]}`;
            case "changed":
                return `Property ${currentKey} was updated from ${comparedFile[key]["oldProperty"]} to ${comparedFile[key]["property"]}`;
            case "unchanged":
            case "cargo":
                break;
            default:
                throw "There is no such status";
        }
    })
    return array.filter((elem)=> {return elem !== undefined}).join("\n");
}