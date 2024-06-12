import _ from 'lodash';


export const getPlainOutput = (comparedFile, passedKey = "") => {
    const keys = Object.keys(comparedFile);

    const array = keys.map((key) => {

        const status = comparedFile[key]["status"];
        const currentKey = passedKey + key;

        if (status === "removed") {
           return `Property ${currentKey} was removed`;
        }
        if (status === "added") {
            return `Property ${currentKey} was added with value ${comparedFile[key]["property"]}`;
        }
        if (_.isPlainObject(comparedFile[key]["property"])) {
            return getPlainOutput(comparedFile[key]["property"], currentKey + ".");
        }
        if (status === "changedInsides") {
            return `Property ${currentKey} was updated from [complex value] to ${comparedFile[key]["property"]}`;
        }
        if (status === "changed") {
           return `Property ${currentKey} was updated from ${comparedFile[key]["oldProperty"]} to ${comparedFile[key]["property"]}`;
        }
    })
    return array.filter((elem)=> {return elem !== undefined}).join("\n");
}