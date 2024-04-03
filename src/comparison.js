export const showComparation = (file1, file2) => {
    const comparedFile = getComparedObjectWithSigns(file1, file2);
    console.log(getComparedFileAsString(comparedFile));
    // return getComparedFileAsString(comparedFile);
}


const getComparedFileAsString = (comparedFile, tabulation = "") => {
    const array = Object.keys(comparedFile).map((key) => {
        if (typeof(comparedFile[key][1]) !== "object") { 
            return `${tabulation}${comparedFile[key][0]} "${key}": "${comparedFile[key][1]}"`;
        } else {
            return `${tabulation}${comparedFile[key][0]} "${key}":\n${getComparedFileAsString(comparedFile[key][1], tabulation + "    ")}`;
        }
    })

    return array.join("\n");
}


const getComparedObjectWithSigns = (file1, file2) => {

    // const comparedFile = firstLoop(file2);
    const comparedFile = thirdLoop(file1, file2)
    return comparedFile;
}


const firstLoop = (file2) => {

    const keys2 = Object.keys(file2);

    const comparedFile = {};

    for (let key of keys2) {

        comparedFile[key] = [];
        comparedFile[key][0] = "*";
        comparedFile[key][1] = {};

        if (typeof(file2[key]) !== "object") {
            comparedFile[key][1] = file2[key];
        } else {
            comparedFile[key][1] = firstLoop(file2[key]);
        }
    }
    return comparedFile;
} 


const thirdLoop = (file1, file2) => {

    const keys1 = file1 === undefined? [] : Object.keys(file1);
    const keys2 = file2 === undefined? [] : Object.keys(file2);

    const keys = getAllKeys(keys1, keys2).sort();

    const comparedFile = {}
    
    for (let key of keys) {
        comparedFile[key] = [];
        if (file1[key] !== undefined && file2[key] !== undefined) {
            if (typeof(file1[key]) === "object" && typeof(file2[key]) === "object") {
                comparedFile[key][0] = " ";
                comparedFile[key][1] = thirdLoop(file1[key], file2[key]);
            } else if (typeof(file1[key]) === "object" && typeof(file2[key]) !== "object") {
                comparedFile[key][0] = "+";
                comparedFile[key][1] = file2[key];
            } else if (typeof(file1[key]) !== "object" && typeof(file2[key]) === "object") {
                comparedFile[key][0] = "+";
                comparedFile[key][1] = file2[key];
            } else {
                if (file1[key] === file2[key]) {
                    comparedFile[key][0] = " ";
                    comparedFile[key][1] = file2[key];
                } else {
                    comparedFile[key][0] = "+";
                    comparedFile[key][1] = file2[key];
                }
            }
        } else if (file1[key] !== undefined && file2[key] === undefined) {
            if (typeof(file1[key]) === "object") {
                comparedFile[key][0] = "-";
                comparedFile[key][1] = thirdLoop(file1[key], {}); 
            } else {
                comparedFile[key][0] = "-";
                comparedFile[key][1] = file1[key]; 
            }
        } else {
            comparedFile[key] = [];
            comparedFile[key][0] = "*";
            comparedFile[key][1] = {};
    
            if (typeof(file2[key]) !== "object") {
                comparedFile[key][1] = file2[key];
            } else {
                comparedFile[key][1] = thirdLoop({}, file2[key]);
            }
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