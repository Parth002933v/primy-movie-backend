"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstKeyValuePairUtils = exports.getFirstKeyValuePairUtils2 = exports.getFirstKeyValueUtils = void 0;
function getFirstKeyValueUtils(obj) {
    const keys = Object.keys(obj);
    if (keys.length > 0) {
        return obj[keys[0]];
    }
    else {
        return "The object is empty";
    }
}
exports.getFirstKeyValueUtils = getFirstKeyValueUtils;
function getFirstKeyValuePairUtils2(obj) {
    const keys = Object.values(obj);
    if (keys.length > 0) {
        return obj[keys[0]];
    }
    else {
        return "The object is empty";
    }
}
exports.getFirstKeyValuePairUtils2 = getFirstKeyValuePairUtils2;
function getFirstKeyValuePairUtils(obj) {
    const keys = Object.keys(obj);
    if (keys.length > 0) {
        const key = keys[0];
        const value = obj[key];
        return { key, value };
    }
    else {
        return null;
    }
}
exports.getFirstKeyValuePairUtils = getFirstKeyValuePairUtils;
