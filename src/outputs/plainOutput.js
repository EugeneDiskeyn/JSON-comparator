import _ from 'lodash';


export const getPlainOutput = (comparedFile, passedKey = "") => {
    const keys = Object.keys(comparedFile);

    const array = keys.reduce((newArray, key) => {

        const status = comparedFile[key]["status"];
        const currentKey = passedKey + key;

        if (status === "removed") {
            newArray.push(`Property ${currentKey} was removed`);
            return newArray;
        }
        if (status === "added" && _.isPlainObject(comparedFile[key]["property"])) {
            newArray.push(`Property ${currentKey} was added with value [complex value]`);
            return newArray;
        }
        if (status === "added") {
            newArray.push(`Property ${currentKey} was added with value ${comparedFile[key]["property"]}`);
            return newArray;
        }
        if (_.isPlainObject(comparedFile[key]["property"])) {
            newArray.push(getPlainOutput(comparedFile[key]["property"], currentKey + "."));
            return newArray;
        }
        if (status === "changedInsides") {
            newArray.push(`Property ${currentKey} was updated from [complex value] to ${comparedFile[key]["property"]}`);
            return newArray;
        }
        if (status === "changed" && _.isPlainObject(comparedFile[key]["oldProperty"])) {
            newArray.push(`Property ${currentKey} was updated from [complex value] to ${comparedFile[key]["property"]}`);
            return newArray;
        }
        if (status === "changed" && !_.isPlainObject(comparedFile[key]["oldProperty"])) {
            newArray.push(`Property ${currentKey} was updated from ${comparedFile[key]["oldProperty"]} to ${comparedFile[key]["property"]}`);
            return newArray;
        }
        return newArray;
    }, [])
    return array.join("\n");
}