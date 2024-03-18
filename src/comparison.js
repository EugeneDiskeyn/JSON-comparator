export const showComparation = (file1, file2) => {

    getSortedFile(file1);

    const sortedFile1 = getSortedFile(file1);
    const sortedFile2 = getSortedFile(file2);

    const status1 = getStatus(sortedFile1, sortedFile2);
    const status2 = getStatus(sortedFile2, sortedFile1);
    
    console.log(getComparedFileAsString(sortedFile1, status1), "\n");
    console.log(getComparedFileAsString(sortedFile2, status2));
}

const getStatus = (file1, file2) => {
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const status = [];

    for (let key1 of keys1) {

        const key2 = keys2.find((key2) => {
            if (key1 === key2) {
                return key2;
            } else {
                return false;
            }
        })

        if (key2 && file1[key1] === file2[key2]) {
            status.push(" ");
        } else if (key2) {
            status.push("+");
        } else {
            status.push("-");
        }
    }
    return status;
}

const getComparedFileAsString = (file, status) => {
    const array = [];

    Object.keys(file).map((element, index) => {
        array.push(`${status[index]} "${element}": "${file[element]}"`);
    })

    return array.join("\n");
}

const getSortedFile = (file) => {
    const sortedKeys = Object.keys(file).sort();
    let sortedFile = {};

    for (let key of sortedKeys) {
        sortedFile[key] = file[key];
    }
    
    return sortedFile;
}