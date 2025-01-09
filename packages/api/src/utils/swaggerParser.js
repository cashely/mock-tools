/**
 * @name 解析swagger文档字符串
 * @param {} swagger 
 */
import df from 'd-forest';
import path from 'node:path';
import { get, find, set, pick, cloneDeep } from 'lodash';

function swaggerParser(swaggerSchema) {
    let { paths, components } = swaggerSchema;
    // transformComponents(components);
    const documents = [];
    Object.entries(paths).forEach(([path, pathValue]) => {
        Object.entries(pathValue).forEach(([method, methodValue]) => {
            // console.log(method, path, methodValue)
            // 有可能这里会是一个数组引用
            const [isArray, refPath] = getContentFromResponses(methodValue.responses)
            let content = get(components, refParserToDot(refPath));

            // 遍历每一个节点替换$ref的引用
            df.forEachNode(content, (node, e, p) => {
                if (node['$ref']) {
                    set(content, p, get(components, refParserToDot(node['$ref'])))
                }
            })

            content = transformComponents(content)

            content = contentToMock(content)

            const document = {
                path,
                method,
                description: methodValue.description,
                content: isArray ? JSON.stringify([transformComponents(content)], null, '\t') : JSON.stringify(transformComponents(content), null, '\t'),
            }
            documents.push(document)
        })
    })

    return documents;
}

/**
 * @name 解析ref字符串为点表示法
 * @param {*} refString 
 */
function refParserToDot(refString) {
    if (!refString) {
        return null
    }
    return refString.replace('#/components/', '').split(path.sep).join('.');
}

/**
 * @name 从responses中解析出content的schema的ref
 * @param {*} responses 
 * @returns 
 */
function getContentFromResponses(responses) {
    const responseKeys = Object.keys(responses);
    if (!find(responseKeys, (key) => ['200', 'default'].includes(key))) {
        return []
    }

    if (responses['200'] && responses['200'].content['application/json']) {
        // console.log(get(responses, `200.content.application/json.schema.$ref`))
        // 如果顶层内容就是数组的情况
        if (get(responses, `200.content.application/json.schema.type`) === 'array') {
            return [1, get(responses, `200.content.application/json.schema.items.$ref`)]
        }
        return [0, get(responses, `200.content.application/json.schema.$ref`)]
    }

    if (responses['default'] && responses['default'].content) {
        // console.log(get(responses, `default.content.application/json.schema.$ref`))
        return [0, get(responses, 'default.content.application/json.schema.$ref')]
    }

    return [];
}

/**
 * @name 将components中的$ref解析为对象
 * @param {*} components 
 * @returns 
 */
function transformComponents(components) {
    const _tempComponent = cloneDeep(components)
    df.forEachNode(_tempComponent, (node, e, p) => {
        if (node['$ref']) {
            set(_tempComponent, p, get(_tempComponent, refParserToDot(node['$ref'])))
        }
        // 只取有效字段
        set(_tempComponent, p, pick(node, ['type', 'properties', 'example', 'items', 'enum', 'format', 'description']))
    })
    return _tempComponent;
}

/**
 * @name 将content中的字段转换为对象key:value的形式
 * @param {*} content 
 * @returns 
 */
function contentToMock(content) {
    if (!content) return null;
    return Object.keys(content.properties).reduce((obj, key) => {
        let value = null;
        if (content.properties[key].properties) {
            value = contentToMock(content.properties[key])
        } else {
            value = content.properties[key]
        }
        return {
            ...obj,
            // [key]: value
            ...mockField(key, value)
        }
    }, {})
}

/**
 * @name 将字段转换为mock字段
 * @param {string} key
 * @param {*} obj 
 * @returns 
 */
function mockField(key, obj) {
    if (obj.example) {
        return { [key]: obj.example }
    }
    switch (obj.type) {
        case 'integer':
            return { [key]: '@integer' }
        case 'string':
            if (obj.enum) {
                return { [key]: `@pick(${JSON.stringify(obj.enum)})` };
            }
            return { [key]: '@string' }

        case 'array':
            if (obj.items.type !== 'object') {
                return mockField(`${key}|5`, obj.items)
            } else {
                return contentToMock(obj.items)
            }
        default:
            return null
    }
}

export default swaggerParser;