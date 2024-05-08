import _ from 'lodash';


export const getPlainOutput = (comparedFile, passedKey="") => {
    const keys = Object.keys(comparedFile);
    const array = [];

    for (let key of keys) {

        const status = comparedFile[key]["status"];
        const currentKey = passedKey + key;

        if (status === "added") {
            if (_.isPlainObject(comparedFile[key]["property"])) {
                array.push(`Property ${currentKey} was added with value [complex value]`);
            } else {
                array.push(`Property ${currentKey} was added with value ${comparedFile[key]["property"]}`);
            }
        } else if (status === "removed") {
            array.push(`Property ${currentKey} was removed`);
        } else {

            if (_.isPlainObject(comparedFile[key]["property"])) {
                array.push(getPlainOutput(comparedFile[key]["property"], currentKey + "."));
            } else {
                if (status === "changed") {
                    if (_.isPlainObject(comparedFile[key]["oldProperty"])) {
                        array.push(`Property ${currentKey} was updated from [complex value] to ${comparedFile[key]["property"]}`);
                    } else {
                        array.push(`Property ${currentKey} was updated from ${comparedFile[key]["oldProperty"]} to ${comparedFile[key]["property"]}`);
                    }
                } else if (status === "changedInsides") {
                    array.push(`Property ${currentKey} was updated from [complex value] to ${comparedFile[key]["property"]}`)
                }
            }
        }
    }

    return array.join("\n");
}