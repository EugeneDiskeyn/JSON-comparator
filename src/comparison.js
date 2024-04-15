import pkg from 'lodash';
const { isPlainObject } = pkg;


export const showComparation = (file1, file2, format) => {
    const comparedFile = getComparedObjectWithSigns(file1, file2);
    
    switch (format) {
        case "plain":
            return getPlainAnswer(comparedFile);
        case "JSON":
            return getJSONAnswer(comparedFile);
        default:
            return getStylishedComparedFile(comparedFile);
    }
}


const getStylishedComparedFile = (comparedFile, tabulation = "") => {
    const array = Object.keys(comparedFile).map((key) => {
        const sign = getSign(comparedFile[key]["status"]);
        if (isPlainObject(comparedFile[key]["property"])) {

            return `${tabulation}${sign} "${key}":\n${getStylishedComparedFile(comparedFile[key]["property"], tabulation + "    ")}`;
        } else {
            let line = ``;
            if (comparedFile[key]["oldProperty"] !== undefined) {
                line += `${tabulation}- "${key}": "${comparedFile[key]["oldProperty"]}"\n`;
            }
            line += `${tabulation}${sign} "${key}": "${comparedFile[key]["property"]}"`;

            return line;
        }
    })

    return array.join("\n");
}


const getPlainAnswer = (comparedFile, passedKey="") => {
    const keys = Object.keys(comparedFile);
    const array = [];

    for (let key of keys) {

        const status = comparedFile[key]["status"];
        const currentKey = passedKey + key;

        if (status === "added") {
            if (isPlainObject(comparedFile[key]["property"])) {
                array.push(`Property ${currentKey} was added with value [complex value]`);
            } else {
                array.push(`Property ${currentKey} was added with value ${comparedFile[key]["property"]}`);
            }
        } else if (status === "removed") {
            array.push(`Property ${currentKey} was removed`);
        } else {

            if (isPlainObject(comparedFile[key]["property"])) {
                array.push(getPlainAnswer(comparedFile[key]["property"], currentKey + "."));
            } else {
                if (status === "changed") {
                    array.push(`Property ${currentKey} was updated from ${comparedFile[key]["oldProperty"]} to ${comparedFile[key]["property"]}`)
                } else if (status === "changedInsides") {
                    array.push(`Property ${currentKey} was updated from ${comparedFile[key]["oldProperty"]} to ${comparedFile[key]["property"]}`)
                }
            }
        }
    }

    return array.join("\n");
}


const getJSONAnswer = (comparedFile, tabulation = "    ", depth = 0) => {
    const keys = Object.keys(comparedFile);
    const array = keys.map((key, index)=> {
        let line = "";
        if (isPlainObject(comparedFile[key]["property"])) {
            line += `${tabulation}"${key}": {\n`;
            line += `${tabulation+"    "}"status": "${comparedFile[key]["status"]}",\n`;
            line += `${tabulation+"    "}"property": {\n`;
            line += `${getJSONAnswer(comparedFile[key]["property"], tabulation + "        ", depth + 1)}\n`;
            line += `${tabulation+"    "}}\n`
            line += index === keys.length-1? `${tabulation}}` : `${tabulation}},`;
        } else {
            line += `${tabulation}"${key}": {\n`
            line += `${tabulation+"    "}"status": "${comparedFile[key]["status"]}",\n`;
            line += `${tabulation+"    "}"property": "${comparedFile[key]["property"]}"\n`;
            line += index === keys.length-1? `${tabulation}}` : `${tabulation}},`;
        }
        return line;
    });
    return depth === 0? `{\n${array.join("\n")}\n}` : `${array.join("\n")}`;
}


const getComparedObjectWithSigns = (file1, file2) => {
    const comparedFile = getComparedObject(file1, file2)
    return comparedFile;
}


const getComparedObject = (file1, file2) => {

    const keys1 = file1 === undefined? [] : Object.keys(file1);
    const keys2 = file2 === undefined? [] : Object.keys(file2);

    const keys = getAllKeys(keys1, keys2).sort();

    const comparedFile = {}
    
    for (let key of keys) {
        comparedFile[key] = {};

        if (file1[key] !== undefined && file2[key] !== undefined) {

            if (isPlainObject(file1[key]) && isPlainObject(file2[key])) {
                comparedFile[key]["status"] = getIfObjectWasChanged(file1[key], file2[key])? "changedInsides" : "unchanged";
                comparedFile[key]["property"] = getComparedObject(file1[key], file2[key]);

            } else if (!isPlainObject(file1[key]) && !isPlainObject(file2[key])) {

                comparedFile[key]["status"] = file1[key] === file2[key]? "unchanged" : "changed";
                comparedFile[key]["oldProperty"] = file1[key] === file2[key]? undefined : file1[key];
                comparedFile[key]["property"] = file2[key];

            } else {
                comparedFile[key]["status"] = "changed";
                comparedFile[key]["property"] = file2[key];
                comparedFile[key]["oldProperty"] = "[complex value]";
            }

        } else if (file1[key] !== undefined && file2[key] === undefined) {

            comparedFile[key]["status"] = keys2.length === 0? "nothing" : "removed";
            comparedFile[key]["property"] = typeof(file1[key]) === "object"? getComparedObject(file1[key], {}) : file1[key]
            
        } else {

            comparedFile[key]["status"] = keys1.length === 0? "nothing" : "added";
            comparedFile[key]["property"] = typeof(file2[key]) === "object"? getComparedObject({}, file2[key]) : file2[key];

        }
    }
    return comparedFile;
}


const getAllKeys = (keys1, keys2) => {

    let keys = [];
    let flag;

    for (let key1 of keys1) {
        keys.push(key1);
    }

    for (let key2 of keys2) {
        flag = true;
        for (let key of keys) {
            if (key2 === key) {
                flag = false;
            }
        }
        if (flag === true) {
            keys.push(key2);
        }
    }
    return keys;
}


const getIfObjectWasChanged = (file1, file2) => {
    
    const keys1 = file1 === undefined? [] : Object.keys(file1);
    const keys2 = file2 === undefined? [] : Object.keys(file2);

    const keys = getAllKeys(keys1, keys2).sort();

    for (let key of keys) {
        if (file1[key] !== undefined && file2[key] !== undefined) {
            if (isPlainObject(file1[key]) && isPlainObject(file2[key])) {
                return getIfObjectWasChanged(file1[key], file2[key]);
            } else {
                return true;
            }
        }
    }

    return false;
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
    }
}