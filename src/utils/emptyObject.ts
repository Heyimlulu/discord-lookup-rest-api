export const removeEmptyFields = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj
            .map(v => (v && typeof v === 'object') ? removeEmptyFields(v) : v)
            .filter(v => !(v == null));
    } else if (typeof obj === 'object') {
        return Object.entries(obj)
            .reduce((acc, [key, value]) => {
                if (value == null) return acc; // Skip null and undefined
                if (typeof value === 'object') {
                    value = removeEmptyFields(value);
                }
                acc[key] = value;
                return acc;
            }, {} as any);
    }
    return obj;
}