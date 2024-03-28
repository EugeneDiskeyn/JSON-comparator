export const showComparation = (file1, file2) => {
    if (file1 && file2) {
        const comparedObject = getSortedFile(getComparedObjectWithSigns(file1, file2));
        return getComparedFileAsString(comparedObject);
    }
}

const getComparedObjectWithSigns = (file1, file2) => {
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    let comparedObject = {};

    for (let key2 of keys2) {
        comparedObject[key2] = [];
        comparedObject[key2][0] = "*";
        comparedObject[key2][1] = file2[key2];
    }
    
    for (let key1 of keys1) {
        const key2 = keys2.find((key2) => {
            if (key1 === key2) {
                return key2;
            } else {
                return false;
            }
        })

        comparedObject[key1] = [];

        if (key2 && file1[key1] === file2[key2]) {
            comparedObject[key1][0] = " ";
            delete file2[key1];
        } else if (key2) {
            comparedObject[key1][0] = "+";
            delete file2[key1];
        } else {
            comparedObject[key1][0] = "-";
        }
        comparedObject[key1][1] = file1[key1];
    }

    return comparedObject;
}

const getSortedFile = (file) => {
    const sortedKeys = Object.keys(file).sort();
    let sortedFile = {};

    for (let key of sortedKeys) {
        sortedFile[key] = file[key];
    }
    
    return sortedFile;
}

const getComparedFileAsString = (comparedObject) => {
    const array = Object.keys(comparedObject).map((element) => {
        return`${comparedObject[element][0]} "${element}": "${comparedObject[element][1]}"`;
    })

    return array.join("\n");
}