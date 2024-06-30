import _ from 'lodash';
import { getStylishedOutput } from "./outputs/stylishedOutput.js";
import { getPlainOutput } from './outputs/plainOutput.js';
import { getJsonOutput } from './outputs/jsonOutput.js';


export const showComparation = (file1, file2, format) => {
    const comparedFile = getComparedObject(file1, file2);
    
    switch (format) {
        case "stylish":
            return getStylishedOutput(comparedFile);
        case "plain":
            return getPlainOutput(comparedFile);
        case "JSON":
            return getJsonOutput(comparedFile);
        default:
            throw "There is no such format";
    }
}


const getComparedObject = (file1, file2) => {

    const keys1 = file1 === ""? [] : Object.keys(file1);
    const keys2 = file2 === ""? [] : Object.keys(file2);

    const keys = [...new Set([...keys1, ...keys2].sort())];

    return keys.reduce((newObject, key) => {
        if (!_.has(file1, key)) {
            return {...newObject, [key]: {"status": "added", "property": getObjectOrPrimitive(file2[key])}};
        }
        if (!_.has(file2, key)) {
            return {...newObject, [key]: {"status": "removed", "property": getObjectOrPrimitive(file1[key])}};
        }
        if (_.isEqual(file1[key], file2[key])) {
            return {...newObject, [key]: {"status": "unchanged", "property": getObjectOrPrimitive(file2[key])}};
        }
        if (_.isPlainObject(file1[key]) ^ _.isPlainObject(file2[key])) {
            return {...newObject, [key]: {"status": "changed", "property": getObjectOrPrimitive(file2[key]), "oldProperty": file1[key]}};
        }
        if (_.isPlainObject(file1[key])) {
            return {...newObject, [key]: {"status": "changedInsides", "property": getComparedObject(file1[key], file2[key])}};
        }
        return {...newObject, [key]: {"status": "changed", "property": file2[key], "oldProperty": file1[key]}};
    }, {})
}

const getCargo = (file) => {
    const keys = file === ""? [] : Object.keys(file);
    return keys.reduce((newObject, key)=>{
        if (_.isPlainObject(file[key])) {
            return {...newObject, [key]: {"status": "cargo", "property": getCargo(file[key])}};
        }
        return {...newObject, [key]: {"status": "cargo", "property": file[key]}}
    }, {})
}

const getObjectOrPrimitive = (file) => {
    return _.isPlainObject(file)? getCargo(file) : file;
}