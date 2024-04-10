export const showComparation = (file1, file2) => {
    const comparedFile = getComparedObjectWithSigns(file1, file2);
    return getPlainAnswer(comparedFile);
}


const getComparedFileAsString = (comparedFile, tabulation = "") => {
    const array = Object.keys(comparedFile).map((key) => {
        const sign = getSign(comparedFile[key]["status"]);
        if (typeof(comparedFile[key]["property"]) !== "object") {

            let line = ``;
            if (comparedFile[key]["oldProperty"] !== undefined) {
                line += `${tabulation}- "${key}": "${comparedFile[key]["oldProperty"]}"\n`;
            }
            line += `${tabulation}${sign} "${key}": "${comparedFile[key]["property"]}"`;

            return line;
        } else {
            return `${tabulation}${sign} "${key}":\n${getComparedFileAsString(comparedFile[key]["property"], tabulation + "    ")}`;
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
            if (typeof(comparedFile[key]["property"]) === "object") {
                array.push(`Property ${currentKey} was added with value [complex value]`);
            } else {
                array.push(`Property ${currentKey} was added with value ${comparedFile[key]["property"]}`);
            }
        } else if (status === "removed") {
            array.push(`Property ${currentKey} was removed`);
        } else {

            if (typeof(comparedFile[key]["property"]) === "object") {
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

const getComparedObjectWithSigns = (file1, file2) => {
    const comparedFile = getComparedObject(file1, file2)
    return comparedFile;
}


const getComparedObject = (file1, file2) => {

    //Почему если свойство равно null, программа ломается?

    const keys1 = file1 === undefined? [] : Object.keys(file1);
    const keys2 = file2 === undefined? [] : Object.keys(file2);

    const keys = getAllKeys(keys1, keys2).sort();

    const comparedFile = {}
    
    for (let key of keys) {
        comparedFile[key] = {};

        if (file1[key] !== undefined && file2[key] !== undefined) {
            if (typeof(file1[key]) === "object" && typeof(file2[key]) === "object") {
                comparedFile[key]["status"] = getIfObjectWasChanged(file1[key], file2[key])? "changedInsides" : "unchanged";
                comparedFile[key]["property"] = getComparedObject(file1[key], file2[key]);

            } else if (typeof(file1[key]) !== "object" && typeof(file2[key]) !== "object") {

                comparedFile[key]["status"] = file1[key] === file2[key]? "unchanged" : "changed";
                comparedFile[key]["property"] = file2[key];
                comparedFile[key]["oldProperty"] = file1[key] === file2[key]? undefined : file1[key];

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
            if (typeof(file1[key]) === "object" && typeof(file2[key]) === "object") {
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