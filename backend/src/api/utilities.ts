

export function removeUnderscoreFieldsDeep(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map((item) => removeUnderscoreFieldsDeep(item));
    } else if (typeof obj === 'object') {
        if (obj instanceof Date) {
            return obj;
        }
        const newObj: any = {};
        for (const key in obj) {
            if (key.startsWith('_')) {
                continue;
            }
            newObj[key] = removeUnderscoreFieldsDeep(obj[key]);
        }
        return newObj;
    } else {
        return obj;
    }
}