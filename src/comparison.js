import pkg from 'lodash';
const { isPlainObject } = pkg;
import { getStylishedOutput } from "./outputs/stylishedOutput.js";
import { getPlainOutput } from './outputs/plainOutput.js';
import { getJsonOutput } from './outputs/jsonOutput.js';


export const showComparation = (file1, file2, format) => {
    const comparedFile = getComparedObject(file1, file2);
    
    switch (format) {
        case "plain":
            return getPlainOutput(comparedFile);
        case "JSON":
            return getJsonOutput(comparedFile);
        default:
            return getStylishedOutput(comparedFile);
    }
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
                comparedFile[key]["oldProperty"] = file1[key];
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

    let flag = false;

    for (let key of keys) {
        if (file1[key] !== undefined && file2[key] !== undefined) {
            if (isPlainObject(file1[key]) && isPlainObject(file2[key])) {
                flag = getIfObjectWasChanged(file1[key], file2[key]);
            } else {
                if (file1[key] !== file2[key]) {
                    return true;
                }
            }
        } else if (file1[key] === undefined ^ file2[key] === undefined) {
            return true;
        }
    }
    return flag;
}