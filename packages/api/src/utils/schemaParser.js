import { isPlainObject, isArray, keys } from 'lodash';
import { mock, Random } from 'mockjs';

/**
 * @name 切割对象key
 * @param {*} rule 
 * @param {*} times 
 * @returns 
 */

function splitKey(key) {
    const keyResult = key.split('|');
    let times = keyResult[1] || '1';
    const splitTimes = times.split('-');
    if (splitTimes.length > 1) {
        times = Random.integer(Math.min(splitTimes[0], splitTimes[1]), Math.max(splitTimes[0], splitTimes[1]));
    }
    return {
        keyName: keyResult[0],
        times,
    }
}

function dd(times, callback) {
    if (+times === 1) {
        return callback
    }
    return Array.from({ length: times }).map(() => callback);
}

function loopSchemaNode(jsonSchema, times = 1) {
    // 数组处理
    if (isPlainObject(jsonSchema)) {
        return dd(times, keys(jsonSchema).reduce((obj, key) => {
            // 拆分key
            const { keyName, times } = splitKey(key);
            obj[keyName] = loopSchemaNode(jsonSchema[key], times)
            return obj;
        }, {}))
        // 单节点处理
    } else if (isArray(jsonSchema)) {
        return [loopSchemaNode(jsonSchema[0])]
    } else {
        return dd(times, jsonSchema);
    }
}

function mockData(struct) {
    return Object.keys(struct).reduce((obj, key) => {
        return {
            ...obj,
            [key]: mockField(struct[key])
        }
    }, {})
}

function mockField(field) {
    if (isArray(field)) {
        return field.map(fieldItem => mockField(fieldItem))
    }

    if (isPlainObject(field)) {
        return mockData(field)
    }
    return mockJsField(field);
}

function mockJsField(field) {
    switch(true) {
        case /^@/.test(field):
            // return mock(field.replace('#', '@'));
            return mock(field);
        default: return field;
    }
}

function schemaParser(schema) {
    const schemaStruct = loopSchemaNode(schema);
    if (isArray(schemaStruct)) {
        return [mockData(schemaStruct[0])]
    }
    return mockData(schemaStruct);
}

export default schemaParser;